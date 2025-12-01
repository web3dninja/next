import Fuse, { IFuseOptions } from 'fuse.js';
import sift from 'sift';
import { get, sort } from 'radash';
import { SortDirectionEnum } from './enums';
import { SearchConfig, UrlFilters, SortDirection, FilterConfig, SortConfig, Range } from './types';
import { UseFiltersConfig } from './useFilters';

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

export function rangeFilter<TData>(data: TData[], key: string, range: Range) {
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

export function getDefaultFilterValues(config: UseFiltersConfig) {
  const defaults: UrlFilters = {};

  if (config.filters) {
    config.filters.forEach(filterConfig => {
      const parser = filterConfig.parse;

      defaults[filterConfig.param] = parser.defaultValue;
    });
  }

  if (config.search) {
    defaults[config.search.param] = config.search.parse.defaultValue;
  }

  if (config.sort) {
    defaults.sort = null;
  }

  return defaults;
}

export function getActiveFiltersCount(urlFilters: UrlFilters, config: UseFiltersConfig): number {
  const defaults = getDefaultFilterValues(config);
  let count = 0;

  if (config.search) {
    const currentValue = urlFilters[config.search.param];
    const defaultValue = defaults[config.search.param];
    if (currentValue && currentValue !== defaultValue) {
      count++;
    }
  }

  if (config.filters) {
    config.filters.forEach(filterConfig => {
      const currentValue = urlFilters[filterConfig.param];
      const defaultValue = defaults[filterConfig.param];

      if (Array.isArray(currentValue) && Array.isArray(defaultValue)) {
        if (
          currentValue.length !== defaultValue.length ||
          !currentValue.every((val, i) => val === defaultValue[i])
        ) {
          count++;
        }
      } else if (currentValue !== defaultValue) {
        count++;
      }
    });
  }

  if (config.sort && urlFilters.sort) {
    count++;
  }

  return count;
}

export function applySearch<T>(data: T[], searchConfig: SearchConfig, urlFilters: UrlFilters): T[] {
  const searchValue = urlFilters[searchConfig.param];
  return searchConfig.fn(data, searchConfig.options || {}, searchValue) as T[];
}

export function applyFilters<T>(
  data: T[],
  filtersConfig: FilterConfig[],
  urlFilters: UrlFilters,
): T[] {
  let result = data;

  filtersConfig.forEach(filterConfig => {
    const value = urlFilters[filterConfig.param];
    result = filterConfig.fn(result, filterConfig.path, value) as T[];
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

export function applySort<T>(data: T[], sortConfig: SortConfig[], urlFilters: UrlFilters): T[] {
  const sortValue = urlFilters.sort;
  const { field, direction } = parseSortValue(sortValue);

  if (!field || !direction) {
    return data;
  }

  const config = sortConfig.find(config => config.param === field);
  if (!config) {
    return data;
  }

  return config.fn(data, config.path, direction);
}
