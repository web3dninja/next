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

export const searchFilter = createSearchFilter('search', PRODUCT_FUSE_OPTIONS);

export const brandsFilter = createArrayFilter('brands', 'brand');

export const priceRangeFilter = createRangeFilter('priceRange', 'price');

export const priceSort = createSortConfig('price', 'price', 'Price', SortDirectionEnum.ASC);

export const popularitySort = createSortConfig('popularity', 'redditStats.mentions', 'Popularity');

export const productSearchConfig = searchFilter;

export const productFiltersConfig = [brandsFilter, priceRangeFilter];

export const productSortConfig = [priceSort, popularitySort];

export const productUrlParsers = {
  [productSearchConfig.param]: productSearchConfig.parse,
  [brandsFilter.param]: brandsFilter.parse,
  [priceRangeFilter.param]: priceRangeFilter.parse,
  sort: parseAsString,
};

export const PRODUCT_CONFIGS = {
  search: productSearchConfig,
  filters: productFiltersConfig,
  sort: productSortConfig,
  urlParsers: productUrlParsers,
};
