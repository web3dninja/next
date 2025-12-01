import { parseAsString, parseAsArrayOf, parseAsInteger } from 'nuqs';
import type { SortDirection } from './types';
import { filterBySearch, filterByArray, rangeFilter, sortBy } from './utils';
import { IFuseOptions } from 'fuse.js';
import { SortDirectionEnum } from './enums';

export const createSearchFilter = <TData>(
  param: string = 'search',
  options: IFuseOptions<TData>,
) => ({
  param,
  options,
  fn: filterBySearch<TData>,
  parse: parseAsString.withDefault(''),
});

export const createArrayFilter = <TData>(param: string, path: string) => ({
  param,
  path,
  fn: filterByArray<TData>,
  parse: parseAsArrayOf(parseAsString).withDefault([]),
});

export const createRangeFilter = <TData>(param: string, path: string) => ({
  param,
  path,
  fn: rangeFilter<TData>,
  parse: parseAsArrayOf(parseAsInteger).withDefault([]),
});

export const createSortConfig = <TData>(
  param: string,
  path: string,
  label: string,
  defaultDirection: SortDirection = SortDirectionEnum.DESC,
) => ({
  param,
  path,
  label,
  fn: sortBy<TData>,
  defaultDirection,
});
