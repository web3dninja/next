import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';
import { applyFilters, applySearch, applySort } from './utils';
import type { UseFiltersConfig } from './types';

export function useFilters<TData>(allData: TData[], config: UseFiltersConfig): TData[] {
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
  }, [allData, config, urlFilters]);

  return filteredData;
}
