import { parseAsString, parseAsArrayOf, parseAsInteger } from 'nuqs';
import type { FilterConfig, SearchConfig, SortConfig, SortDirection } from '@/types/filters';
import { filterBySearch, filterByArray, rangeFilter, sortBy } from '@/utils/filter';
import { IFuseOptions } from 'fuse.js';
import { SortDirectionEnum } from '@/enums/fiters';

export const createSearchFilter = <T>(
  key: string = 'search',
  options: IFuseOptions<T> = {},
): SearchConfig<T> => ({
  key,
  options,
  fn: filterBySearch,
  parse: parseAsString.withDefault(''),
});

export const createArrayFilter = <T>(
  key: string,
  path: string,
): FilterConfig<T, string, string[]> => ({
  key,
  path,
  fn: filterByArray,
  parse: parseAsArrayOf(parseAsString).withDefault([]),
});

export const createRangeFilter = <T>(
  key: string,
  path: string,
): FilterConfig<T, string, [number, number] | null> => ({
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
): SortConfig<T, string, string> => ({
  key,
  path,
  label,
  fn: sortBy,
  defaultDirection,
});
