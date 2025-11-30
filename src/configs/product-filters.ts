import { Product } from '@/types/product';
import {
  createSearchFilter,
  createArrayFilter,
  createRangeFilter,
  createSortConfig,
  SortDirectionEnum,
} from '@/modules/filters';
import { parseAsString } from 'nuqs';
import type { IFuseOptions } from 'fuse.js';

export const PRODUCT_FUSE_OPTIONS: IFuseOptions<Product> = {
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'brand', weight: 0.2 },
    { name: 'description', weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

export const searchFilter = createSearchFilter<Product>('search', PRODUCT_FUSE_OPTIONS);

export const brandsFilter = createArrayFilter<Product>('brands', 'brand');

export const priceRangeFilter = createRangeFilter<Product>('priceRange', 'price');

export const priceSort = createSortConfig<Product>(
  'price',
  'price',
  'Price',
  SortDirectionEnum.ASC,
);

export const popularitySort = createSortConfig<Product>(
  'popularity',
  'redditStats.mentions',
  'Popularity',
);

export const productSearchConfig = searchFilter;

export const productFiltersConfig = {
  brands: brandsFilter,
  priceRange: priceRangeFilter,
};

export const productSortConfig = {
  price: priceSort,
  popularity: popularitySort,
};

export const productUrlParsers = {
  search: productSearchConfig.parse,
  brands: productFiltersConfig.brands.parse,
  priceRange: productFiltersConfig.priceRange.parse,
  sort: parseAsString,
};
