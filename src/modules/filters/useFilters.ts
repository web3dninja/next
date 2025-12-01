import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';
import { SearchConfig, UrlFilters, FilterConfig, SortConfig } from './types';
import { applyFilters, applySearch, applySort } from './utils';

export interface UseFiltersConfig {
  search: SearchConfig;
  filters: FilterConfig[];
  sort: SortConfig[];
  urlParsers: UrlFilters;
}

export function useFilters<T>(allData: T[], config: UseFiltersConfig): T[] {
  const { search, filters, sort, urlParsers } = config;
  const [urlFilters] = useQueryStates(urlParsers, {
    history: 'push',
    shallow: true,
  });

  const filteredData = useMemo(() => {
    let result = allData;

    if (filters) {
      result = applyFilters(result, filters, urlFilters);
    }

    if (sort) {
      result = applySort(result, sort, urlFilters);
    }

    if (search) {
      result = applySearch(result, search, urlFilters);
    }

    return result;
  }, [allData, config]);

  return filteredData;
}
