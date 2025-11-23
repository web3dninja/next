'use client';

import { Item } from '../ui/item';
import { ItemMedia } from '../ui/item';
import { Product } from '@/lib/data/products';
import Link from 'next/link';
import { ItemContent, ItemDescription, ItemFooter, ItemTitle } from '../ui/item';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { RedditStatsDisplay } from './reddit-stats';

export function ProductItem({ product }: { product: Product }) {
  const pathname = usePathname();

  return (
    <Item key={product.id} variant="outline" className="flex-col flex-nowrap items-start" asChild>
      <Link href={`${pathname}/${product.id}`}>
        <ItemMedia variant="image" className="relative w-full pb-[100%]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="100%"
          />
          <Badge variant="default" className="absolute right-2 bottom-2">
            {product.category}
          </Badge>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{product.name}</ItemTitle>
          <ItemDescription>{product.description}</ItemDescription>
          <span className="font-semibold text-black dark:text-white">${product.price}</span>
        </ItemContent>
        <ItemFooter className="w-full flex-col items-start gap-2">
          {product.redditStats && <RedditStatsDisplay stats={product.redditStats} />}
        </ItemFooter>
      </Link>
    </Item>
  );
}
