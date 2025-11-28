'use client';

import { Button } from '@/components/ui/button';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { XIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useProductFilters } from '@/hooks/use-product-filters';
import { useProductMetadata } from '@/hooks/use-product-metadata';
import { sortConfig } from '@/lib/filters/filters-config';

interface ProductFiltersDrawerProps {
  products: Product[];
  children?: (
    filteredProducts: Product[],
    searchValue: string,
    onSearchChange: (value: string) => void,
    sheetContent: React.ReactNode,
    activeFiltersCount: number,
    hasActiveFilters: boolean,
    reset: () => void,
  ) => React.ReactNode;
}

export function ProductFiltersDrawer({ products, children }: ProductFiltersDrawerProps) {
  // Generic хук для фільтрації
  const {
    filters,
    products: filteredProducts,
    onFilterChange,
    reset,
    hasActiveFilters,
  } = useProductFilters(products);

  // Хук для метаданих продуктів
  const { allBrands, priceRange } = useProductMetadata(products);

  const activeFiltersCount =
    (filters.brands?.length || 0) +
    (filters.priceRange && (filters.priceRange[0] !== null || filters.priceRange[1] !== null)
      ? 1
      : 0);

  const sheetContent = (
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

      <div className="mt-6 space-y-6">
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
            {(filters.brands?.length || 0) > 0 && (
              <Badge variant="secondary">{filters.brands?.length} selected</Badge>
            )}
          </div>

          <div className="max-h-[300px] space-y-2 overflow-y-auto pr-2">
            {allBrands.map(brand => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands?.includes(brand)}
                  onCheckedChange={() => {
                    const currentBrands = filters.brands || [];
                    const newBrands = currentBrands.includes(brand)
                      ? currentBrands.filter(b => b !== brand)
                      : [...currentBrands, brand];
                    onFilterChange('brands', newBrands);
                  }}
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className="flex-1 cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SheetContent>
  );

  return (
    <>
      {children?.(
        filteredProducts,
        filters.search || '',
        (value: string) => onFilterChange('search', value),
        sheetContent,
        activeFiltersCount,
        hasActiveFilters,
        reset,
      )}
    </>
  );
}
