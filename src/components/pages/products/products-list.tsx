'use client';

import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import { CategoryTree } from '@/components/features/category-tree';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { ProductItem } from './product-item';
import { ProductFiltersDrawer } from './product-filters-drawer';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterIcon } from 'lucide-react';

interface ProductsListProps {
  products: Product[];
  categories: Category[];
  categoryHrefBase: string;
}

export function ProductsList({ products, categories, categoryHrefBase }: ProductsListProps) {
  const router = useRouter();

  const handleSelect = (slug: string) => {
    router.push(`${categoryHrefBase}/${slug}`);
  };

  return (
    <ProductFiltersDrawer products={products}>
      {(filteredProducts, searchValue, onSearchChange, sheetContent, activeFiltersCount) => (
        <>
          <div className="content-header container">
            <CategoryTree categories={categories} onSelect={handleSelect} />
            <div className="flex-1" />

            <SearchInput
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Search products... (fuzzy)"
            />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="md" className="relative">
                  <FilterIcon className="mr-2 size-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="default" className="ml-2 h-5 px-1.5">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>

              {sheetContent}
            </Sheet>
          </div>

          <div className="grid-list">
            {filteredProducts.map(product => (
              <ProductItem key={product.id} product={product} categoryHrefBase={categoryHrefBase} />
            ))}
          </div>

          <EmptyState show={filteredProducts.length === 0}>No products found</EmptyState>
        </>
      )}
    </ProductFiltersDrawer>
  );
}
