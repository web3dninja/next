'use client';

import { Product, ProductWithAmazonData } from '@/types/product';
import { CategoryWithCount } from '@/types/category';
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
import { priceRangeFilter, brandsFilter, PRODUCT_CONFIGS } from '@/configs/product-filters';
import { Filters, useFilters } from '@/modules/filters';
import { Separator } from '@/components/ui/separator';
import { useProductMetadata } from '@/hooks/use-product-metadata';
import { getProductsWithAmazonData } from '@/helpers/product';
import { buildCategoryTree } from '@/helpers/category';

interface ProductsListProps {
  products: Product[];
  categories: CategoryWithCount[];
  categoryHrefBase: string;
}

export function ProductsList({ products, categories, categoryHrefBase }: ProductsListProps) {
  const productsWithAmazonData = getProductsWithAmazonData(products);
  const categoriesTree = buildCategoryTree(categories);
  const { allBrands, priceRange } = useProductMetadata(productsWithAmazonData);

  const filteredProducts = useFilters<ProductWithAmazonData>(
    productsWithAmazonData,
    PRODUCT_CONFIGS,
  );

  return (
    <>
      <div className="content-header container">
        <Filters config={PRODUCT_CONFIGS}>
          <CategoryTree tree={categoriesTree} />

          <div className="flex-1" />
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

                <Filters.Range param={priceRangeFilter.param} range={priceRange} label="Price" />

                <Separator />

                <Filters.Checkbox param={brandsFilter.param} list={allBrands} label="Brands" />
              </Filters.Content>

              <SheetFooter>
                <Filters.Reset />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Filters>
      </div>

      <div className="grid-list">
        {filteredProducts.map((product: ProductWithAmazonData) => (
          <ProductItem key={product.id} product={product} categoryHrefBase={categoryHrefBase} />
        ))}
      </div>

      <EmptyState show={filteredProducts.length === 0}>No products found</EmptyState>
    </>
  );
}
