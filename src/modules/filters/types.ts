import { IFuseOptions } from 'fuse.js';
import { SortDirectionEnum } from './enums';

export type SortDirection = SortDirectionEnum.ASC | SortDirectionEnum.DESC;

export type FilterFn = (data: any[], path: string, value: any) => any[];

export type SortFn = (data: any[], path: string, direction: SortDirection) => any[];

export type SearchFn = (data: any[], options: IFuseOptions<any>, value: string) => any[];

export interface FilterConfig {
  key: string;
  path: string;
  fn: FilterFn;
  parse: any;
}

export interface SearchConfig {
  key: string;
  options?: IFuseOptions<any>;
  fn: SearchFn;
  parse: any;
}

export interface SortConfig {
  key: string;
  path: string;
  label: string;
  fn: SortFn;
  defaultDirection: SortDirection;
}

export type PriceRange = [number, number];

export type UrlFilters = Record<string, any>;
export type FiltersRecord = Record<string, FilterConfig>;
export type SortsRecord = Record<string, SortConfig>;
