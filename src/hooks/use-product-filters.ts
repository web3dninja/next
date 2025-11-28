/**
 * Хук для фільтрації продуктів - обгортка над generic useFilters
 * Містить всю специфічну логіку для продуктів
 */

import { parseAsString } from 'nuqs';
import { Product } from '@/types/product';
import { filtersConfig, sortConfig } from '@/lib/filters/filters-config';
import { useFilters, UseFiltersResult } from './use-filters';

const urlParsers = {
  search: filtersConfig.search.parse,
  brands: filtersConfig.brands.parse,
  priceRange: filtersConfig.priceRange.parse,
  minRating: filtersConfig.minRating.parse,
  sortField: parseAsString,
  sortDirection: parseAsString,
};

export interface ProductFilters {
  search: string;
  brands: string[];
  priceRange: (number | null)[];
  minRating: number | null;
  sortField: string | null;
  sortDirection: string | null;
}

export interface UseProductFiltersResult
  extends Omit<UseFiltersResult<Product, ProductFilters>, 'data'> {
  products: Product[];
  config: typeof filtersConfig;
}

export function useProductFilters(allProducts: Product[]): UseProductFiltersResult {
  const result = useFilters<Product, ProductFilters>(allProducts, {
    filtersConfig: filtersConfig,
    sortConfig,
    urlParsers,
  });

  return {
    ...result,
    products: result.data,
    config: filtersConfig,
  };
}
