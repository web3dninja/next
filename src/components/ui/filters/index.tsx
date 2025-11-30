'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { SheetContent } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpIcon, ArrowDownIcon, XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SortDirectionEnum } from '@/enums/fiters';
import { parseSortValue, formatSortValue } from '@/utils/filter';
import { useFiltersContext, FiltersProvider } from '@/contexts/filters-context';
import type { FilterConfig, PriceRange } from '@/types/filters';
import type { UseFiltersConfig } from '@/hooks/use-filters';
import { SearchInput } from '@/components/ui/search-input';

interface FiltersProps<TData> {
  data: TData[];
  config: UseFiltersConfig<TData>;
  onFiltersChange?: (filteredData: TData[]) => void;
  children: React.ReactNode;
  className?: string;
}

function FiltersRoot<TData>({ data, config, onFiltersChange, children }: FiltersProps<TData>) {
  return (
    <FiltersProvider data={data} config={config}>
      <FiltersContentWrapper onFiltersChange={onFiltersChange}>{children}</FiltersContentWrapper>
    </FiltersProvider>
  );
}

function FiltersContentWrapper<TData>({
  children,
  onFiltersChange,
}: {
  children: React.ReactNode;
  onFiltersChange?: (filteredData: TData[]) => void;
}) {
  const { filteredData } = useFiltersContext<TData>();

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filteredData);
    }
  }, [filteredData, onFiltersChange]);

  return <>{children}</>;
}

function FiltersContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('mt-6 flex flex-col gap-4 px-3', className)}>{children}</div>;
}

interface FilterLabelProps {
  label: string;
  children?: React.ReactNode;
  className?: string;
}

function FilterLabel({ label, children, className }: FilterLabelProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <Label className="text-base font-semibold">{label}</Label>
      {children}
    </div>
  );
}

function FiltersReset() {
  const { hasActiveFilters, reset } = useFiltersContext();

  if (!hasActiveFilters) return null;

  return (
    <Button variant="secondary" size="sm" onClick={reset}>
      <XIcon className="mr-1 size-4" />
      Reset All
    </Button>
  );
}

interface FiltersTriggerProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

function FiltersTrigger({ children, className, ...props }: FiltersTriggerProps) {
  const { hasActiveFilters, activeFiltersCount } = useFiltersContext();

  return (
    <Button variant="outline" size="md" className={cn('relative', className)} {...props}>
      {children}
      {hasActiveFilters && (
        <Badge variant="default" className="ml-2 h-5 px-1.5">
          {activeFiltersCount}
        </Badge>
      )}
    </Button>
  );
}

interface RangeProps<TData> extends React.ComponentProps<typeof Slider> {
  config: FilterConfig<TData, string, PriceRange>;
  range: PriceRange;
  label: string;
  className?: string;
}

function Range<TData>({ config, range, label, className, ...props }: RangeProps<TData>) {
  const { filters, onFilterChange } = useFiltersContext();
  const { key } = config;

  const currentRange = filters[key].length > 0 ? filters[key] : range;

  return (
    <div className={cn('space-y-4', className)}>
      <FilterLabel label={label}>
        <span className="text-muted-foreground text-sm">
          {currentRange[0]} - {currentRange[1]}
        </span>
      </FilterLabel>

      <div>
        <Slider
          {...props}
          min={range[0]}
          max={range[1]}
          value={currentRange}
          onValueChange={values => onFilterChange(key, values)}
        />
      </div>
    </div>
  );
}

interface CheckboxProps<TData> {
  config: FilterConfig<TData, string, string[]>;
  list: string[];
  label: string;
  className?: string;
}

function CheckboxFilter<TData>({ config, list, label, className }: CheckboxProps<TData>) {
  const { filters, onFilterChange } = useFiltersContext();
  const { key } = config;

  const currentValue = filters[key];
  const filterKey = config.key;

  return (
    <div className={cn('space-y-4', className)}>
      <FilterLabel label={label} />

      <ToggleGroup
        type="multiple"
        orientation="vertical"
        value={currentValue}
        onValueChange={values => onFilterChange(filterKey, values)}
        spacing={0.5}
        className="w-full flex-col items-stretch"
      >
        {list.map(value => (
          <ToggleGroupItem
            key={value}
            value={value}
            className="justify-start gap-2 rounded-none"
            asChild
          >
            <div>
              <Checkbox checked={currentValue.includes(value)} />
              {value}
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

function Sort({ label, className }: { label: string; className?: string }) {
  const {
    filters,
    onFilterChange,
    config: { sortConfig },
  } = useFiltersContext();

  const currentValue = (filters.sort as string) || null;
  const currentSort = parseSortValue(currentValue);

  const handleSortClick = (field: string) => {
    const config = sortConfig[field];
    if (!config) return;

    const isSameField = currentSort.field === field;
    const currentDirection = currentSort.direction;

    if (isSameField) {
      const newDirection =
        currentDirection === SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC;
      onFilterChange('sort', formatSortValue(field, newDirection));
    } else {
      onFilterChange(
        'sort',
        formatSortValue(field, config.defaultDirection || SortDirectionEnum.DESC),
      );
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <FilterLabel label={label} />
      <div className="flex flex-wrap gap-2">
        {sortConfig &&
          Object.entries(sortConfig).map(([field, config]) => {
            const isActive = currentSort.field === field;
            const direction = isActive
              ? currentSort.direction || config.defaultDirection
              : config.defaultDirection;

            return (
              <Button
                key={field}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSortClick(field)}
                className="gap-1"
              >
                {config.label}
                {direction === SortDirectionEnum.ASC ? (
                  <ArrowDownIcon className="size-3" />
                ) : (
                  <ArrowUpIcon className="size-3" />
                )}
              </Button>
            );
          })}
      </div>
    </div>
  );
}

function Search({ ...props }: React.ComponentProps<typeof Input>) {
  const {
    filters,
    onFilterChange,
    config: { searchConfig },
  } = useFiltersContext();

  if (!searchConfig) return null;

  const { key } = searchConfig;
  const currentValue = (filters[key] as string) || '';

  return (
    <SearchInput
      value={currentValue}
      onChange={e => onFilterChange(key, e.target.value)}
      placeholder="Search..."
      {...props}
    />
  );
}

// ==================== Exports ====================

export const Filters = Object.assign(FiltersRoot, {
  Content: FiltersContent,
  Label: FilterLabel,
  Search,
  Sort,
  Range,
  Checkbox: CheckboxFilter,
  Reset: FiltersReset,
  Trigger: FiltersTrigger,
});

export type { FiltersProps, RangeProps, CheckboxProps, FilterLabelProps, FiltersTriggerProps };
