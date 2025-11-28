'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useFilters, UseFiltersConfig } from '@/hooks/use-filters';

export interface FiltersContextValue<TData = any, TFilters = any> {
  filters: TFilters;
  data: TData[];
  filteredData: TData[];
  total: number;
  onFilterChange: (key: string, value: any) => void;
  reset: () => void;
  hasActiveFilters: boolean;
}

const FiltersContext = createContext<FiltersContextValue | undefined>(undefined);

interface FiltersProviderProps<TData> {
  config: UseFiltersConfig<TData>;
  data: TData[];
  children: ReactNode;
}

export function FiltersProvider<TData>({ data, config, children }: FiltersProviderProps<TData>) {
  const filtersResult = useFilters(data, config);

  const contextValue: FiltersContextValue = {
    ...filtersResult,
    filteredData: filtersResult.data,
    data,
  };

  return <FiltersContext.Provider value={contextValue}>{children}</FiltersContext.Provider>;
}

export function useFiltersContext<TData = any, TFilters = any>() {
  const context = useContext(FiltersContext) as FiltersContextValue<TData, TFilters> | undefined;
  if (context === undefined) {
    throw new Error('useFiltersContext must be used within a FiltersProvider');
  }
  return context;
}
