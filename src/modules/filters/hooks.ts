import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';
import { SearchConfig, FiltersRecord, SortsRecord, UrlFilters } from './types';
import { applyFilters, applySearch, applySort } from './utils';

export interface UseFiltersConfig {
  searchConfig?: SearchConfig;
  filtersConfig: FiltersRecord;
  sortConfig: SortsRecord;
  urlParsers: UrlFilters;
}

export function useFilters<T>(allData: T[], config: UseFiltersConfig): T[] {
  const { searchConfig, filtersConfig, sortConfig, urlParsers } = config;
  const [urlFilters] = useQueryStates(urlParsers, {
    history: 'push',
    shallow: true,
  });

  const filteredData = useMemo(() => {
    let result = allData;

    if (searchConfig) {
      result = applySearch(result, searchConfig, urlFilters);
    }

    result = applyFilters(result, filtersConfig, urlFilters);

    if (sortConfig) {
      result = applySort(result, sortConfig, urlFilters);
    }

    return result;
  }, [allData, searchConfig, filtersConfig, sortConfig, urlFilters]);

  return filteredData;
}
