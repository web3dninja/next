import { useMemo, useCallback } from 'react';
import { useQueryStates } from 'nuqs';
import { SearchConfig, FiltersRecord, SortsRecord, UrlFilters } from '@/types/filters';
import {
  applyFilters,
  applySearch,
  getDefaultFilterValues,
  applySort,
  getActiveFiltersCount,
} from '@/utils/filter';

export interface UseFiltersConfig<T> {
  searchConfig?: SearchConfig<T>;
  filtersConfig: FiltersRecord<T>;
  sortConfig: SortsRecord<T>;
  urlParsers: UrlFilters;
}

export interface UseFiltersResult<T> {
  filters: UrlFilters;
  data: T[];
  allData: T[];
  total: number;
  onFilterChange: <K extends keyof UrlFilters>(key: K, value: UrlFilters[K]) => void;
  reset: () => void;
  hasActiveFilters: boolean;
  activeFiltersCount: number;
  config: UseFiltersConfig<T>;
}

export function useFilters<T>(allData: T[], config: UseFiltersConfig<T>): UseFiltersResult<T> {
  const { searchConfig, filtersConfig, sortConfig, urlParsers } = config;
  const [urlFilters, setUrlFilters] = useQueryStates(urlParsers, {
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
  }, [allData, searchConfig, filtersConfig, urlFilters, sortConfig]);

  const onFilterChange = useCallback(
    <K extends keyof UrlFilters>(key: K, value: UrlFilters[K]) => {
      setUrlFilters({ [key as string]: value });
    },
    [setUrlFilters],
  );

  const reset = useCallback(() => {
    const resetValues = getDefaultFilterValues(config);
    setUrlFilters(resetValues);
  }, [setUrlFilters, config]);

  const activeFiltersCount = useMemo(() => {
    return getActiveFiltersCount(filtersConfig, searchConfig, urlFilters);
  }, [filtersConfig, searchConfig, urlFilters]);

  return {
    filters: urlFilters,
    data: filteredData,
    allData,
    total: filteredData.length,
    onFilterChange,
    reset,
    hasActiveFilters: activeFiltersCount > 0,
    activeFiltersCount,
    config,
  };
}
