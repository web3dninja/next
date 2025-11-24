'use client';

import { useState } from 'react';
import { Product } from '@/lib/data/products';
import { ProductItem } from '@/components/products/product-item';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { CategoryTree } from './category-tree';
import { Category } from '@/lib/data';

interface ProductsListProps {
  products: Product[];
  categories: Category[];
}

export function ProductsList({ products, categories }: ProductsListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex gap-6">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-4">
          <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Categories
          </h3>
          <CategoryTree categories={categories} />
        </div>
      </aside>

      <div className="flex-1">
        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search products..." />

        <div className="grid-list">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>

        <EmptyState show={filteredProducts.length === 0}>No products found</EmptyState>
      </div>
    </div>
  );
}
