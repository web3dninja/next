'use client';

import { Item } from '../ui/item';
import { ItemMedia } from '../ui/item';
import { Product } from '@/lib/data/products';
import Link from 'next/link';
import { ItemContent, ItemDescription, ItemFooter, ItemTitle } from '../ui/item';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function ProductItem({ product }: { product: Product }) {
  const pathname = usePathname();

  return (
    <Item key={product.id} variant="muted" className="flex-col flex-nowrap items-start" asChild>
      <Link href={`${pathname}/${product.id}`}>
        <ItemMedia variant="image" className="relative w-full pb-[100%]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="100%"
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
  );
}
