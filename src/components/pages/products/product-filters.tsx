'use client';

import { Button } from '@/components/ui/button';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { XIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useFiltersContext } from '@/contexts/filters-context';
import { sortConfig } from '@/utils/filters';
import { useProductMetadata } from '@/hooks/use-product-metadata';
import { Brands } from './brands';

export function ProductFilters() {
  const { filters, onFilterChange, reset, hasActiveFilters, data } = useFiltersContext();
  const { allBrands, priceRange } = useProductMetadata(data);

  return (
    <SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]">
      <SheetHeader>
        <div className="flex items-center justify-between">
          <SheetTitle>Filters & Sort</SheetTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={reset}>
              <XIcon className="mr-1 size-4" />
              Reset All
            </Button>
          )}
        </div>
        <SheetDescription>
          Powered by Fuse.js (search), Sift (filters), Radash (sort)
        </SheetDescription>
      </SheetHeader>

      <div className="mt-6 flex flex-col gap-4 px-3">
        {/* Sort By */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Sort By</Label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(sortConfig).map(([field, config]) => {
              const isActive = filters.sortField === field;
              const direction = isActive ? filters.sortDirection : 'asc';

              return (
                <Button
                  key={field}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const isSameField = filters.sortField === field;
                    if (isSameField) {
                      const newDirection = filters.sortDirection === 'asc' ? 'desc' : 'asc';
                      onFilterChange('sortDirection', newDirection);
                    } else {
                      onFilterChange('sortField', field);
                      onFilterChange('sortDirection', 'asc');
                    }
                  }}
                  className="gap-1"
                >
                  {config.label}
                  {isActive &&
                    (direction === 'asc' ? (
                      <ArrowUpIcon className="size-3" />
                    ) : (
                      <ArrowDownIcon className="size-3" />
                    ))}
                </Button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Price Range</Label>
            <span className="text-muted-foreground text-sm">
              ${filters.priceRange?.[0] ?? priceRange.min} - $
              {filters.priceRange?.[1] ?? priceRange.max}
            </span>
          </div>

          <div className="space-y-2">
            <Slider
              min={priceRange.min}
              max={priceRange.max}
              step={10}
              minStepsBetweenThumbs={1}
              value={[
                filters.priceRange?.[0] !== null && filters.priceRange?.[0] !== undefined
                  ? filters.priceRange[0]
                  : priceRange.min,
                filters.priceRange?.[1] !== null && filters.priceRange?.[1] !== undefined
                  ? filters.priceRange[1]
                  : priceRange.max,
              ]}
              onValueChange={(values: number[]) => {
                onFilterChange('priceRange', [values[0], values[1]]);
              }}
              className="w-full"
            />
          </div>
        </div>

        <Separator />

        {/* Brands */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Brands</Label>
          </div>

          <div className="max-h-[300px] space-y-2 overflow-y-auto pr-2">
            <Brands allBrands={allBrands} onFilterChange={onFilterChange} filters={filters} />
          </div>
        </div>
      </div>
    </SheetContent>
  );
}
