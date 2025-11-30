import Fuse, { IFuseOptions } from 'fuse.js';
import sift from 'sift';
import { get, sort } from 'radash';
import { SortDirectionEnum } from './enums';
import { FiltersRecord, SearchConfig, UrlFilters, SortsRecord, SortDirection } from './types';
import { UseFiltersConfig } from './hooks';

export function filterBySearch<TData>(data: TData[], options: IFuseOptions<TData>, value: string) {
  if (!value || value.length < 2) {
    return data;
  }

  const fuse = new Fuse(data, options);
  const results = fuse.search(value);
  return results.map(result => result.item);
}

export function filterByArray<TData>(data: TData[], key: string, values: string[]) {
  if (!values || values.length === 0) {
    return data;
  }

  const query = { [key]: { $in: values } };
  const filter = sift(query);
  return data.filter(filter);
}

export function rangeFilter<TData>(data: TData[], key: string, range: [number, number] | null) {
  if (!range || !Array.isArray(range) || range[0] == null || range[1] == null) {
    return data;
  }

  const query = {
    [key]: {
      $gte: range[0],
      $lte: range[1],
    },
  };

  const filter = sift(query);
  return data.filter(filter);
}

export function sortBy<TData>(data: TData[], key: string, direction: SortDirection) {
  return sort(data, item => get(item, key), direction === SortDirectionEnum.DESC);
}

export function getDefaultFilterValues<T>(config: UseFiltersConfig<T>) {
  const defaults: UrlFilters = {};

  Object.entries(config.filtersConfig).forEach(([key, config]) => {
    const parser = config.parse;

    defaults[key] = parser.defaultValue;
  });

  if (config.searchConfig) {
    defaults[config.searchConfig.key] = config.searchConfig.parse.defaultValue;
  }

  if (config.sortConfig) {
    defaults.sort = null;
  }

  return defaults;
}

export function getActiveFiltersCount<T>(
  filtersConfig: FiltersRecord<T>,
  searchConfig: SearchConfig<T> | undefined,
  urlFilters: UrlFilters,
) {
  let count = 0;

  if (searchConfig && urlFilters[searchConfig.key]) {
    count++;
  }

  Object.entries(filtersConfig).forEach(([key, config]) => {
    const value = urlFilters[key];
    const defaultValue = config.parse.defaultValue;

    if (value !== defaultValue) {
      count++;
    }
  });

  if (urlFilters.sort) {
    count++;
  }

  return count;
}

export function applySearch<T>(data: T[], searchConfig: SearchConfig<T>, urlFilters: UrlFilters) {
  const searchValue = urlFilters[searchConfig.key];
  return searchConfig.fn(data, searchConfig.options, searchValue);
}

export function applyFilters<T>(
  data: T[],
  filtersConfig: FiltersRecord<T>,
  urlFilters: UrlFilters,
) {
  let result = data;

  Object.entries(filtersConfig).forEach(([key, filterConfig]) => {
    const value = urlFilters[key];
    result = filterConfig.fn(result, filterConfig.path, value);
  });

  return result;
}

export function parseSortValue(sortValue: string | null): {
  field: string | null;
  direction: SortDirection | null;
} {
  if (!sortValue) {
    return { field: null, direction: null };
  }

  const parts = sortValue.split('-');
  if (parts.length !== 2) {
    return { field: null, direction: null };
  }

  return { field: parts[0], direction: parts[1] as SortDirection };
}

export function formatSortValue(field: string, direction: SortDirection): string {
  return `${field}-${direction}`;
}

export function applySort<T>(data: T[], sortConfig: SortsRecord<T>, urlFilters: UrlFilters) {
  const sortValue = urlFilters.sort;
  const { field, direction } = parseSortValue(sortValue);

  if (!field || !direction) {
    return data;
  }

  const config = sortConfig[field];
  if (!config) {
    return data;
  }

  return config.fn(data, config.path, direction);
}
