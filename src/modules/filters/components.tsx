'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpIcon, ArrowDownIcon, XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SortDirectionEnum } from './enums';
import { parseSortValue, formatSortValue } from './utils';
import { useFiltersContext, FiltersProvider } from './context';
import type { Range, UseFiltersConfig } from './types';
import { SearchInput } from '@/components/ui/search-input';

interface FiltersProps {
  config: UseFiltersConfig;
  children: React.ReactNode;
  className?: string;
}

function FiltersRoot({ config, children }: FiltersProps) {
  return (
    <FiltersProvider config={config}>
      <FiltersContentWrapper>{children}</FiltersContentWrapper>
    </FiltersProvider>
  );
}

function FiltersContentWrapper({ children }: { children: React.ReactNode }) {
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

interface RangeProps extends React.ComponentProps<typeof Slider> {
  param: string;
  range: Range;
  label: string;
  className?: string;
}

function Range({ param, range, label, className, ...props }: RangeProps) {
  const { filters, onFilterChange } = useFiltersContext();

  const currentRange = filters[param].length > 0 ? filters[param] : range;

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
          onValueChange={values => onFilterChange(param, values)}
        />
      </div>
    </div>
  );
}

interface CheckboxProps {
  param: string;
  list: string[];
  label: string;
  className?: string;
}

function CheckboxFilter({ param, list, label, className }: CheckboxProps) {
  const { filters, onFilterChange } = useFiltersContext();

  const currentValue = filters[param];

  return (
    <div className={cn('space-y-4', className)}>
      <FilterLabel label={label} />

      <ToggleGroup
        type="multiple"
        orientation="vertical"
        value={currentValue}
        onValueChange={values => onFilterChange(param, values)}
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

function Sort({
  param = 'sort',
  label,
  className,
}: {
  param?: string;
  label: string;
  className?: string;
}) {
  const {
    filters,
    onFilterChange,
    config: { sort },
  } = useFiltersContext();

  if (!sort) throw new Error('Sort config is required');

  const currentValue = filters[param];
  const currentSort = parseSortValue(currentValue);

  const handleSortClick = (field: string) => {
    const config = sort.find(config => config.param === field);
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
        {sort.map(config => {
          const field = config.param;
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
    config: { search },
  } = useFiltersContext();

  if (!search) throw new Error('Search config is required');

  const { param } = search;
  const currentValue = filters[param];

  return (
    <SearchInput
      value={currentValue}
      onChange={e => onFilterChange(param, e.target.value)}
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
