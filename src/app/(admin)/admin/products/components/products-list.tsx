'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import DeleteProductButton from './delete-product-button';
import { Product } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
  ItemFooter,
  ItemMedia,
} from '@/components/ui/item';

interface ProductsListProps {
  products: Product[];
}

export function ProductsList({ products }: ProductsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const pathname = usePathname();

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 w-full rounded-lg border border-zinc-300 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />

      <ItemGroup className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {products.map(product => (
          <Item
            key={product.id}
            variant="muted"
            className="flex-col flex-nowrap items-start"
            asChild
          >
            <Link href={`/admin/products/${product.id}`}>
              <ItemMedia variant="image" className="h-48 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{product.name}</ItemTitle>
                <ItemDescription>{product.description}</ItemDescription>
              </ItemContent>
              <ItemFooter>
                <span className="font-semibold text-black dark:text-white">${product.price}</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{product.category}</span>
              </ItemFooter>
            </Link>
          </Item>
        ))}
      </ItemGroup>

      {filteredProducts.length === 0 && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">No products found</p>
      )}
    </div>
  );
}
