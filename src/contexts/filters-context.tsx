'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useFilters, UseFiltersConfig, UseFiltersResult } from '@/hooks/use-filters';

export interface FiltersContextValue<TData = any> extends UseFiltersResult<TData> {
  filteredData: TData[];
}

const FiltersContext = createContext<FiltersContextValue | undefined>(undefined);

interface FiltersProviderProps<TData> {
  config: UseFiltersConfig<TData>;
  data: TData[];
  children: ReactNode;
}

export function FiltersProvider<TData>({ data, config, children }: FiltersProviderProps<TData>) {
  const filtersResult = useFilters(data, config);

  const contextValue: FiltersContextValue<TData> = {
    ...filtersResult,
    filteredData: filtersResult.data,
  };

  return <FiltersContext.Provider value={contextValue}>{children}</FiltersContext.Provider>;
}

export function useFiltersContext<TData>() {
  const context = useContext(FiltersContext) as FiltersContextValue<TData> | undefined;
  if (context === undefined) {
    throw new Error('useFiltersContext must be used within a FiltersProvider');
  }
  return context;
}
