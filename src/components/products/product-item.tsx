'use client';

import { Item } from '../ui/item';
import { ItemMedia } from '../ui/item';
import { Product } from '@/lib/data/products';
import Link from 'next/link';
import { ItemContent, ItemDescription, ItemFooter, ItemTitle } from '../ui/item';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { RedditStatsDisplay } from './reddit-stats';

export function ProductItem({ product, isAdmin = false }: { product: Product; isAdmin?: boolean }) {
  return (
    <Item key={product.id} variant="outline" className="flex-col flex-nowrap items-start" asChild>
      <Link href={isAdmin ? `/admin/product/${product.slug}` : `/product/${product.slug}`}>
        <ItemMedia variant="image" className="relative w-full pb-[100%]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="100%"
          />
          {product.category && (
            <Badge variant="default" className="absolute right-2 bottom-2">
              {product.category?.name}
            </Badge>
          )}
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-2 min-h-10">{product.name}</ItemTitle>
          <ItemDescription>{product.description}</ItemDescription>
          <span className="font-semibold text-black dark:text-white">${product.price}</span>
        </ItemContent>
        <ItemFooter className="mt-auto w-full basis-auto flex-col items-start gap-2">
          {product.redditStats && <RedditStatsDisplay stats={product.redditStats} />}
        </ItemFooter>
      </Link>
    </Item>
  );
}
