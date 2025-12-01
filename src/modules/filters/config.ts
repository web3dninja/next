import { parseAsString, parseAsArrayOf, parseAsInteger } from 'nuqs';
import type { FilterConfig, SearchConfig, SortConfig, SortDirection } from './types';
import { filterBySearch, filterByArray, rangeFilter, sortBy } from './utils';
import { IFuseOptions } from 'fuse.js';
import { SortDirectionEnum } from './enums';

export const createSearchFilter = (
  param: string = 'search',
  options: IFuseOptions<any> = {},
): SearchConfig => ({
  param,
  options,
  fn: filterBySearch,
  parse: parseAsString.withDefault(''),
});

export const createArrayFilter = (param: string, path: string): FilterConfig => ({
  param,
  path,
  fn: filterByArray,
  parse: parseAsArrayOf(parseAsString).withDefault([]),
});

export const createRangeFilter = (param: string, path: string): FilterConfig => ({
  param,
  path,
  fn: rangeFilter,
  parse: parseAsArrayOf(parseAsInteger).withDefault([]),
});

export const createSortConfig = (
  param: string,
  path: string,
  label: string,
  defaultDirection: SortDirection = SortDirectionEnum.DESC,
): SortConfig => ({
  param,
  path,
  label,
  fn: sortBy,
  defaultDirection,
});
