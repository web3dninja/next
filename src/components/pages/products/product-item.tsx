'use client';

import { Item } from '@/components/ui/item';
import { ItemMedia } from '@/components/ui/item';
import { Product } from '@/lib/data/products';
import Link from 'next/link';
import { ItemContent, ItemDescription, ItemFooter, ItemTitle } from '@/components/ui/item';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { RedditStatsDisplay } from './reddit-stats';

export function ProductItem({
  product,
  categoryHrefBase,
}: {
  product: Product;
  categoryHrefBase: string;
}) {
  return (
    <Item key={product.id} variant="default" className="flex-col flex-nowrap items-start" asChild>
      <Link href={`${categoryHrefBase.slice(0, -1)}/${product.slug}`}>
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
