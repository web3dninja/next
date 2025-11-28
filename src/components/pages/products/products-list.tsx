'use client';

import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import { CategoryTree } from '@/components/features/category-tree';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { ProductItem } from './product-item';
import { ProductFilters } from './product-filters';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterIcon } from 'lucide-react';
import { FiltersProvider, useFiltersContext } from '@/contexts/filters-context';
import { filtersConfig, sortConfig } from '@/utils/filters';
import { parseAsString } from 'nuqs';

interface ProductsListProps {
  products: Product[];
  categories: Category[];
  categoryHrefBase: string;
}

function ProductsListContent({
  categories,
  categoryHrefBase,
}: Omit<ProductsListProps, 'products'>) {
  const {
    filteredData: filteredProducts,
    filters,
    onFilterChange,
    hasActiveFilters,
  } = useFiltersContext();
  const router = useRouter();

  const handleSelect = (slug: string) => {
    router.push(`${categoryHrefBase}/${slug}`);
  };

  return (
    <>
      <div className="content-header container">
        <CategoryTree categories={categories} onSelect={handleSelect} />
        <div className="flex-1" />

        <SearchInput
          value={filters.search || ''}
          onChange={value => onFilterChange('search', value)}
          placeholder="Search products... (fuzzy)"
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="md" className="relative">
              <FilterIcon className="mr-2 size-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="default" className="ml-2 h-5 px-1.5">
                  •
                </Badge>
              )}
            </Button>
          </SheetTrigger>

          <ProductFilters />
        </Sheet>
      </div>

      <div className="grid-list">
        {filteredProducts.map((product: Product) => (
          <ProductItem key={product.id} product={product} categoryHrefBase={categoryHrefBase} />
        ))}
      </div>

      <EmptyState show={filteredProducts.length === 0}>No products found</EmptyState>
    </>
  );
}

const urlParsers = {
  search: filtersConfig.search.parse,
  brands: filtersConfig.brands.parse,
  priceRange: filtersConfig.priceRange.parse,
  minRating: filtersConfig.minRating.parse,
  sortField: parseAsString,
  sortDirection: parseAsString,
};

export function ProductsList({ products, categories, categoryHrefBase }: ProductsListProps) {
  const config = {
    filtersConfig,
    sortConfig,
    urlParsers,
  };

  return (
    <FiltersProvider data={products} config={config}>
      <ProductsListContent categories={categories} categoryHrefBase={categoryHrefBase} />
    </FiltersProvider>
  );
}
