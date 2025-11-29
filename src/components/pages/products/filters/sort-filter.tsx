'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SortDirectionEnum } from '@/enums/fiters';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { useFiltersContext } from '@/contexts/filters-context';

import { parseSortValue, formatSortValue } from '@/utils/filter';

export interface SortConfig<TData> {
  [key: string]: {
    label: string;
    fn: (data: TData[], direction: SortDirectionEnum) => TData[];
  };
}

export interface SortFilterProps<TData> {
  sortConfig: SortConfig<TData>;
  currentSortField: string | null;
  currentSortDirection: string | null;
}

export const SortFilter = ({ onSortChange }: { onSortChange: (sortValue: string) => void }) => {
  const {
    filters,
    config: { sortConfig },
  } = useFiltersContext();

  const currentSort = parseSortValue(filters.sort);

  const handleSortClick = (field: string) => {
    const config = sortConfig[field];
    const isSameField = currentSort.field === field;
    const currentDirection = currentSort.direction;

    if (isSameField) {
      const newDirection =
        currentDirection === SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC;
      onSortChange(formatSortValue(field, newDirection));
    } else {
      onSortChange(formatSortValue(field, config.defaultDirection));
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">Sort By</Label>
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
};
