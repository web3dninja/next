/**
 * Generic хук для фільтрації будь-яких даних з синхронізацією URL
 * Повністю незалежний від типу даних та конкретних фільтрів
 */

import { useMemo, useCallback } from 'react';
import { useQueryStates } from 'nuqs';

export interface UseFiltersConfig<T> {
  filtersConfig: Record<string, { fn: (data: T[], value: any) => T[]; parse: any }>;
  sortConfig?: Record<string, { fn: (data: T[], direction: any) => T[] }>;
  urlParsers: Record<string, any>;
}

export interface UseFiltersResult<T, F> {
  filters: F;
  data: T[];
  total: number;
  onFilterChange: (key: string, value: any) => void;
  reset: () => void;
  hasActiveFilters: boolean;
}

/**
 * Generic хук для фільтрації даних
 */
export function useFilters<T, F extends Record<string, any>>(
  allData: T[],
  config: UseFiltersConfig<T>,
): UseFiltersResult<T, F> {
  const { filtersConfig, sortConfig, urlParsers } = config;

  // URL state management
  const [urlFilters, setUrlFilters] = useQueryStates(urlParsers, {
    history: 'push',
    shallow: true,
  });

  // Застосовуємо фільтри
  const filteredData = useMemo(() => {
    let result = allData;

    // Застосовуємо всі фільтри
    Object.entries(filtersConfig).forEach(([key, filterConfig]) => {
      const value = (urlFilters as any)[key];
      result = (filterConfig as any).fn(result, value);
    });

    // Застосовуємо сортування (якщо вказано в URL)
    if (sortConfig) {
      const sortField = (urlFilters as any).sortField;
      const sortDirection = (urlFilters as any).sortDirection;

      // Сортуємо тільки якщо є і поле, і напрямок
      if (sortField && sortDirection) {
        const sortFn = sortConfig[sortField]?.fn;
        if (sortFn) {
          result = sortFn(result, sortDirection);
        }
      }
    }

    return result;
  }, [allData, urlFilters, filtersConfig, sortConfig]);

  const onFilterChange = useCallback(
    (key: string, value: any) => {
      setUrlFilters({ [key]: value } as any);
    },
    [setUrlFilters],
  );

  const reset = useCallback(() => {
    const resetValues = Object.entries(filtersConfig).reduce(
      (acc, [key, config]) => {
        const parser = (config as any).parse as any;
        acc[key] = parser._default ?? null;
        return acc;
      },
      {} as Record<string, any>,
    );

    setUrlFilters(resetValues);
  }, [setUrlFilters, filtersConfig]);

  const hasActiveFilters = useMemo(() => {
    const hasFilters = Object.entries(filtersConfig).some(([key, config]) => {
      const value = (urlFilters as any)[key];
      const parser = (config as any).parse as any;
      const defaultValue = parser._default;

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return value !== defaultValue;
    });

    // Перевіряємо чи є сортування
    const hasSorting = (urlFilters as any).sortField || (urlFilters as any).sortDirection;

    return hasFilters || Boolean(hasSorting);
  }, [urlFilters, filtersConfig]);

  return {
    filters: urlFilters as F,
    data: filteredData,
    total: filteredData.length,
    onFilterChange,
    reset,
    hasActiveFilters,
  };
}
