'use client';

import { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import { useQueryStates } from 'nuqs';
import { UseFiltersConfig, UrlFilters } from './types';
import { getDefaultFilterValues, getActiveFiltersCount } from './utils';

export interface FiltersContextValue {
  filters: UrlFilters;
  onFilterChange: <K extends keyof UrlFilters>(key: K, value: UrlFilters[K]) => void;
  reset: () => void;
  hasActiveFilters: boolean;
  activeFiltersCount: number;
  config: UseFiltersConfig;
}

const FiltersContext = createContext<FiltersContextValue | undefined>(undefined);

interface FiltersProviderProps {
  config: UseFiltersConfig;
  children: ReactNode;
}

export function FiltersProvider({ config, children }: FiltersProviderProps) {
  const { urlParsers } = config;
  const [urlFilters, setUrlFilters] = useQueryStates(urlParsers, {
    history: 'push',
    shallow: true,
  });

  const onFilterChange = useCallback(
    (key: keyof UrlFilters, value: UrlFilters[keyof UrlFilters]) => {
      setUrlFilters({ ...urlFilters, [key]: value });
    },
    [setUrlFilters, urlFilters],
  );

  const reset = useCallback(() => {
    const resetValues = getDefaultFilterValues(config);
    setUrlFilters(resetValues);
  }, [setUrlFilters, config]);

  const activeFiltersCount = useMemo(() => {
    return getActiveFiltersCount(urlFilters, config);
  }, [urlFilters, config]);

  return (
    <FiltersContext.Provider
      value={{
        filters: urlFilters,
        reset: reset,
        onFilterChange: onFilterChange,
        hasActiveFilters: activeFiltersCount > 0,
        activeFiltersCount: activeFiltersCount,
        config: config,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useFiltersContext() {
  const context = useContext(FiltersContext) as FiltersContextValue | undefined;
  if (context === undefined) {
    throw new Error('useFiltersContext must be used within a FiltersProvider');
  }
  return context;
}
