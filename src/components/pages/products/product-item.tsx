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
        <ItemMedia variant="image" className="relative w-full pb-[90%]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="shadow-inset"
            sizes="100%"
          />
          <div className="bg-background/70 absolute right-0 bottom-0 left-0 flex justify-between p-2">
            <span className="text-price">${product.price}</span>
            {product.category && <Badge variant="default">{product.category?.name}</Badge>}
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{product.name}</ItemTitle>
          <ItemDescription>{product.description}</ItemDescription>
        </ItemContent>
        <ItemFooter className="mt-auto w-full basis-auto flex-col items-start gap-2">
          {product.redditStats && <RedditStatsDisplay stats={product.redditStats} />}
        </ItemFooter>
      </Link>
    </Item>
  );
}
