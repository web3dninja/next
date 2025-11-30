import { IFuseOptions } from 'fuse.js';
import { SortDirectionEnum } from './enums';

export type SortDirection = SortDirectionEnum.ASC | SortDirectionEnum.DESC;

export type FilterFn<TData, TValue> = (data: TData[], path: string, value: TValue) => TData[];

export type SortFn<TData, TValue> = (data: TData[], path: string, direction: TValue) => TData[];

export type SearchFn<TData> = (
  data: TData[],
  options: IFuseOptions<TData>,
  value: string,
) => TData[];

export interface FilterConfig<TData, TKey, TValue> {
  key: TKey;
  path: string;
  fn: FilterFn<TData, TValue>;
  parse: any;
}

export interface SearchConfig<TData> {
  key: string;
  options: IFuseOptions<TData>;
  fn: SearchFn<TData>;
  parse: any;
}

export interface SortConfig<TData, TKey, TValue> {
  key: TKey;
  path: string;
  label: string;
  fn: SortFn<TData, TValue>;
  defaultDirection: SortDirection;
}

export type FiltersConfig<TData, TKey extends string, TValue> = Record<
  TKey,
  FilterConfig<TData, TKey, TValue>
>;

export type SortsConfig<TData, TKey extends string, TValue> = Record<
  TKey,
  SortConfig<TData, TKey, TValue>
>;

export type PriceRange = [number, number];

export type UrlFilters = Record<string, any>;
export type FiltersRecord<T> = Record<string, FilterConfig<T, string, any>>;
export type SortsRecord<T> = Record<string, SortConfig<T, string, any>>;
