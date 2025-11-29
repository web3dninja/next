'use client';

import { SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useFiltersContext } from '@/contexts/filters-context';
import { useProductMetadata } from '@/hooks/use-product-metadata';
import { FilterHeader, SortFilter, PriceRangeFilter, BrandsFilter } from './filters';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { Product } from '@/types';

export function ProductFilters() {
  const {
    filters,
    onFilterChange,
    reset,
    hasActiveFilters,
    allData,
    config: { filtersConfig },
  } = useFiltersContext<Product>();
  const { allBrands, priceRange } = useProductMetadata(allData);

  return (
    <SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]">
      <FilterHeader />

      <div className="mt-6 flex flex-col gap-4 px-3">
        <SortFilter
          onSortChange={sortValue => {
            onFilterChange('sort', sortValue);
          }}
        />

        <Separator />

        <PriceRangeFilter
          priceRange={priceRange}
          currentRange={filters.priceRange}
          onPriceChange={range => onFilterChange(filtersConfig.priceRange.key, range)}
        />

        <Separator />

        <BrandsFilter
          allBrands={allBrands}
          selectedBrands={filters.brands || []}
          onBrandsChange={brands => onFilterChange(filtersConfig.brands.key, brands)}
        />
      </div>

      {hasActiveFilters && (
        <SheetFooter>
          <Button variant="secondary" size="sm" onClick={reset}>
            <XIcon className="mr-1 size-4" />
            Reset All
          </Button>
        </SheetFooter>
      )}
    </SheetContent>
  );
}
