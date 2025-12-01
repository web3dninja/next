import { ProductWithAmazonData } from '@/types/product';
import {
  createSearchFilter,
  createArrayFilter,
  createRangeFilter,
  createSortConfig,
  SortDirectionEnum,
} from '@/modules/filters';
import { parseAsString } from 'nuqs';
import type { IFuseOptions } from 'fuse.js';

export const PRODUCT_FUSE_OPTIONS: IFuseOptions<ProductWithAmazonData> = {
  keys: [
    { name: 'amazonData.title', weight: 0.7 },
    { name: 'amazonData.brand', weight: 0.2 },
    { name: 'amazonData.description', weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

export const searchFilter = createSearchFilter<ProductWithAmazonData>(
  'search',
  PRODUCT_FUSE_OPTIONS,
);

export const brandsFilter = createArrayFilter<ProductWithAmazonData>('brands', 'amazonData.brand');

export const priceRangeFilter = createRangeFilter<ProductWithAmazonData>(
  'priceRange',
  'amazonData.price',
);

export const priceSort = createSortConfig<ProductWithAmazonData>(
  'price',
  'amazonData.price',
  'Price',
  SortDirectionEnum.ASC,
);

export const popularitySort = createSortConfig<ProductWithAmazonData>(
  'popularity',
  'redditStats.mentions',
  'Popularity',
);

export const productFilters = [brandsFilter, priceRangeFilter];

export const productSort = [priceSort, popularitySort];

export const productUrlParsers = {
  [searchFilter.param]: searchFilter.parse,
  [brandsFilter.param]: brandsFilter.parse,
  [priceRangeFilter.param]: priceRangeFilter.parse,
  sort: parseAsString,
};

export const PRODUCT_CONFIGS = {
  search: searchFilter,
  filters: productFilters,
  sort: productSort,
  urlParsers: productUrlParsers,
};
