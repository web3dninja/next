/**
 * Filters Module
 *
 * Повнофункціональний модуль для фільтрації, пошуку та сортування даних.
 * Можна легко скопіювати в інший проект.
 *
 * Залежності:
 * - react, react-dom
 * - nuqs (для URL state management)
 * - fuse.js (для fuzzy search)
 * - sift (для фільтрації)
 * - radash (для сортування)
 * - lucide-react (для іконок)
 * - class-variance-authority, clsx, tailwind-merge (для стилів)
 *
 * UI компоненти (потрібні з вашого UI library):
 * - Button, Badge, Label, Input, Slider, ToggleGroup, Checkbox
 * - Sheet (для модального вікна фільтрів)
 */

// Енуми
export { SortDirectionEnum } from './enums';
export type { SortDirection } from './enums';

// Типи
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

// Утиліти
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

// Хуки
export { useFilters } from './hooks';
export type { UseFiltersConfig, UseFiltersResult } from './hooks';

// Контекст
export { FiltersProvider, useFiltersContext } from './context';
export type { FiltersContextValue } from './context';

// Конфігурація
export {
  createSearchFilter,
  createArrayFilter,
  createRangeFilter,
  createSortConfig,
} from './config';

// Компоненти
export { Filters } from './components';
export type {
  FiltersProps,
  RangeProps,
  CheckboxProps,
  FilterLabelProps,
  FiltersTriggerProps,
} from './components';
