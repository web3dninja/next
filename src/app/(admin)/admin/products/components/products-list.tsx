'use client';

import { useState } from 'react';
import { Product } from '@/lib/data/products';
import { ProductItem } from '@/components/pages/products';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { CategoryTree } from '@/components/features/category-tree';
import { useRouter } from 'next/navigation';
import { Category } from '@/lib/data/category';

interface ProductsListProps {
  products: Product[];
  categories: Category[];
}

export function ProductsList({ products, categories }: ProductsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelect = (slug: string) => {
    router.push(`/admin/products/${slug}`);
  };

  return (
    <>
      <div className="content-header">
        <CategoryTree categories={categories} onSelect={handleSelect} />
        <div className="flex-1" />
        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search products..." />
      </div>

      <div className="grid-list">
        {products.map(product => (
          <ProductItem key={product.id} product={product} isAdmin />
        ))}
      </div>

      <EmptyState show={filteredProducts.length === 0}>No products found</EmptyState>
    </>
  );
}
