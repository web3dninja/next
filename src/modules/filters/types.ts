import { IFuseOptions } from 'fuse.js';
import { SortDirectionEnum } from './enums';

export type SortDirection = SortDirectionEnum.ASC | SortDirectionEnum.DESC;

export type FilterFn = <TData>(data: TData[], path: string, value: any) => TData[];

export type SortFn = <TData>(data: TData[], path: string, direction: SortDirection) => TData[];

export type SearchFn = <TData>(
  data: TData[],
  options: IFuseOptions<TData>,
  value: string,
) => TData[];

export interface FilterConfig {
  param: string;
  path: string;
  fn: FilterFn;
  parse: any;
}

export interface SearchConfig {
  param: string;
  options: IFuseOptions<any>;
  fn: SearchFn;
  parse: any;
}

export interface SortConfig {
  param: string;
  path: string;
  label: string;
  fn: SortFn;
  defaultDirection: SortDirection;
}
export interface UseFiltersConfig {
  search: SearchConfig;
  filters: FilterConfig[];
  sort: SortConfig[];
  urlParsers: UrlFilters;
}

export type Range = [number, number];

export type UrlFilters = Record<string, any>;
