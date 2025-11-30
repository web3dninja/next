export { SortDirectionEnum } from './enums';

export type {
  FilterConfig,
  SearchConfig,
  SortConfig,
  FiltersConfig,
  SortsConfig,
  PriceRange,
  UrlFilters,
  FiltersRecord,
  SortsRecord,
  FilterFn,
  SortFn,
  SearchFn,
} from './types';

export {
  filterBySearch,
  filterByArray,
  rangeFilter,
  sortBy,
  getDefaultFilterValues,
  getActiveFiltersCount,
  applySearch,
  applyFilters,
  parseSortValue,
  formatSortValue,
  applySort,
} from './utils';

export { useFilters } from './hooks';
export type { UseFiltersConfig, UseFiltersResult } from './hooks';

export { FiltersProvider, useFiltersContext } from './context';
export type { FiltersContextValue } from './context';

export {
  createSearchFilter,
  createArrayFilter,
  createRangeFilter,
  createSortConfig,
} from './config';

export { Filters } from './components';
export type {
  FiltersProps,
  RangeProps,
  CheckboxProps,
  FilterLabelProps,
  FiltersTriggerProps,
} from './components';
