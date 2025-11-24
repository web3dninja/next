'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/data/products';
import { Category } from '@/lib/data/category';
import { CategoryTree } from '@/components/features/category-tree';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { ProductItem } from './product-item';

interface ProductsListProps {
  products: Product[];
  categories: Category[];
  categoryHrefBase: string;
  isAdmin?: boolean;
}

const sanitizeBasePath = (basePath: string): string =>
  basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

export function ProductsList({
  products,
  categories,
  categoryHrefBase,
  isAdmin = false,
}: ProductsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const normalizedBase = sanitizeBasePath(categoryHrefBase);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products;
    }

    const term = searchTerm.toLowerCase();
    return products.filter(
      product =>
        product.name.toLowerCase().includes(term) || product.brand.toLowerCase().includes(term),
    );
  }, [products, searchTerm]);

  const handleSelect = (slug: string) => {
    router.push(`${normalizedBase}/${slug}`);
  };

  return (
    <>
      <div className="content-header">
        <CategoryTree categories={categories} onSelect={handleSelect} />
        <div className="flex-1" />
        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search products..." />
      </div>

      <div className="grid-list">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} isAdmin={isAdmin} />
        ))}
      </div>

      <EmptyState show={filteredProducts.length === 0}>No products found</EmptyState>
    </>
  );
}
