import { IFuseOptions } from 'fuse.js';
import { SortDirectionEnum } from './enums';

export type SortDirection = SortDirectionEnum.ASC | SortDirectionEnum.DESC;

export type FilterFn = (data: any[], path: string, value: any) => any[];

export type SortFn = (data: any[], path: string, direction: SortDirection) => any[];

export type SearchFn = (data: any[], options: IFuseOptions<any>, value: string) => any[];

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
