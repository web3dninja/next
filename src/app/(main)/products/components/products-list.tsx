'use client';

import { useState } from 'react';
import { Product } from '@/lib/data/products';
import { ProductItem } from '@/components/products/product-item';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';

interface ProductsListProps {
  products: Product[];
}

export function ProductsList({ products }: ProductsListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search products..." />

      <div className="grid-list">
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      <EmptyState show={filteredProducts.length === 0}>No products found</EmptyState>
    </>
  );
}
