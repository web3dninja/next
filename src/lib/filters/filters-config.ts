/**
 * Окремі фільтри - кожен відповідає за одну річ (Single Responsibility)
 */

import Fuse from 'fuse.js';
import sift from 'sift';
import { max, min, sort } from 'radash';
import { parseAsString, parseAsArrayOf, parseAsInteger } from 'nuqs';
import { Product } from '@/types/product';

// ============= SEARCH FILTER =============
const FUSE_OPTIONS = {
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

export const searchFilter = {
  key: 'search',
  fn: (products: Product[], value: string) => {
    if (!value || value.length < 2) {
      return products;
    }

    const fuse = new Fuse(products, FUSE_OPTIONS);
    const results = fuse.search(value);
    return results.map(result => result.item);
  },
  parse: parseAsString.withDefault(''),
} as const;

// ============= BRANDS FILTER =============
export const brandsFilter = {
  key: 'brands',
  fn: (products: Product[], value: string[]) => {
    if (!value || value.length === 0) {
      return products;
    }

    const query = { brand: { $in: value } };
    const filter = sift(query);
    return products.filter(filter);
  },
  parse: parseAsArrayOf(parseAsString).withDefault([]),
} as const;

// ============= PRICE RANGE FILTER =============
export const priceRangeFilter = {
  key: 'priceRange',
  fn: (products: Product[], range: [number, number]) => {
    console.log(range);

    const filterMax = products.filter(sift({ price: { $lte: range[1] } }));

    const filteredItems = filterMax.filter(sift({ price: { $gte: range[0] } }));

    return filteredItems;
  },
  parse: parseAsArrayOf(parseAsInteger).withDefault([]),
} as const;

// ============= MIN RATING FILTER =============
export const minRatingFilter = {
  key: 'minRating',
  fn: (products: Product[], value: number | null) => {
    if (value === null || value === undefined) {
      return products;
    }

    const query = { 'redditStats.rank': { $gte: value } };
    const filter = sift(query);
    return products.filter(filter);
  },
  parse: parseAsInteger,
} as const;

// ============= SORT CONFIG =============
export const priceSort = {
  key: 'price' as const,
  label: 'Price',
  fn: (products: Product[], direction: 'asc' | 'desc') =>
    sort(products, p => parseFloat(p.price), direction === 'desc'),
} as const;

export const popularitySort = {
  key: 'popularity' as const,
  label: 'Popularity',
  fn: (products: Product[], direction: 'asc' | 'desc') =>
    sort(products, p => p.redditStats.mentions, direction === 'desc'),
} as const;

// ============= ЗБІРКА В ОБ'ЄКТИ =============
export const sortConfig = {
  price: priceSort,
  popularity: popularitySort,
} as const;

export const filtersConfig = {
  search: searchFilter,
  brands: brandsFilter,
  priceRange: priceRangeFilter,
  minRating: minRatingFilter,
} as const;

export type SortField = keyof typeof sortConfig;
export type SortDirection = 'asc' | 'desc';
export type SortOption = { field: SortField; direction: SortDirection };

export type {
  SortField as SortFieldType,
  SortDirection as SortDirectionType,
  SortOption as SortOptionType,
};
