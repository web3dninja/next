import { parseAsString, parseAsArrayOf, parseAsInteger } from 'nuqs';
import type { FilterConfig, PriceRange, SearchConfig, SortConfig, SortDirection } from './types';
import { filterBySearch, filterByArray, rangeFilter, sortBy } from './utils';
import { IFuseOptions } from 'fuse.js';
import { SortDirectionEnum } from './enums';

export const createSearchFilter = (
  key: string = 'search',
  options: IFuseOptions<any> = {},
): SearchConfig => ({
  key,
  options,
  fn: filterBySearch,
  parse: parseAsString.withDefault(''),
});

export const createArrayFilter = <T>(key: string, path: string): FilterConfig => ({
  key,
  path,
  fn: filterByArray,
  parse: parseAsArrayOf(parseAsString).withDefault([]),
});

export const createRangeFilter = <T>(key: string, path: string): FilterConfig => ({
  key,
  path,
  fn: rangeFilter,
  parse: parseAsArrayOf(parseAsInteger).withDefault([]),
});

export const createSortConfig = <T>(
  key: string,
  path: string,
  label: string,
  defaultDirection: SortDirection = SortDirectionEnum.DESC,
): SortConfig => ({
  key,
  path,
  label,
  fn: sortBy,
  defaultDirection,
});
