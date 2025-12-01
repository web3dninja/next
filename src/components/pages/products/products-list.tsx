'use client';

import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import { CategoryTree } from '@/components/features/category-tree';
import { EmptyState } from '@/components/ui/empty-state';
import { ProductItem } from './product-item';
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from '@/components/ui/sheet';
import { FilterIcon } from 'lucide-react';
import {
  productSearchConfig,
  productFiltersConfig,
  productSortConfig,
  productUrlParsers,
} from '@/configs/product-filters';
import { Filters, useFilters } from '@/modules/filters';
import { Separator } from '@/components/ui/separator';
import { useProductMetadata } from '@/hooks/use-product-metadata';

interface ProductsListProps {
  products: Product[];
  categories: Category[];
  categoryHrefBase: string;
}

export function ProductsList({ products, categories, categoryHrefBase }: ProductsListProps) {
  const { allBrands, priceRange } = useProductMetadata(products);
  const router = useRouter();

  const handleSelect = (slug: string) => {
    router.push(`${categoryHrefBase}/${slug}`);
  };

  const filteredProducts = useFilters(products, {
    searchConfig: productSearchConfig,
    filtersConfig: productFiltersConfig,
    sortConfig: productSortConfig,
    urlParsers: productUrlParsers,
  });

  return (
    <>
      <div className="content-header container">
        <CategoryTree categories={categories} onSelect={handleSelect} />
        <div className="flex-1" />

        <Filters
          config={{
            searchConfig: productSearchConfig,
            filtersConfig: productFiltersConfig,
            sortConfig: productSortConfig,
            urlParsers: productUrlParsers,
          }}
        >
          <Filters.Search />

          <Sheet>
            <SheetTrigger asChild>
              <Filters.Trigger>
                <FilterIcon className="mr-2 size-4" />
                Filters
              </Filters.Trigger>
            </SheetTrigger>

            <SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]">
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle>Filters & Sort</SheetTitle>
                </div>
                <SheetDescription>
                  Powered by Fuse.js (search), Sift (filters), Radash (sort)
                </SheetDescription>
              </SheetHeader>

              <Filters.Content>
                <Filters.Sort label="Sort By" />

                <Separator />

                <Filters.Range
                  config={productFiltersConfig.priceRange}
                  range={priceRange}
                  label="Price"
                />

                <Separator />

                <Filters.Checkbox
                  config={productFiltersConfig.brands}
                  list={allBrands}
                  label="Brands"
                />
              </Filters.Content>

              <SheetFooter>
                <Filters.Reset />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Filters>
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
