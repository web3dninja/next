'use client';

import { Item } from '@/components/ui/item';
import { ItemMedia } from '@/components/ui/item';
import type { Product } from '@/types/product';
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
  const amazonData = product.amazonData;
  if (!amazonData) {
    return null;
  }

  return (
    <Item key={product.id} variant="default" className="flex-col flex-nowrap items-start" asChild>
      <Link href={`${categoryHrefBase.slice(0, -1)}/${product.amazonProductId}`}>
        <ItemMedia variant="image" className="relative w-full pb-[90%]">
          <Image
            src={amazonData.image}
            alt={amazonData.title}
            fill
            className="shadow-inset"
            sizes="100%"
            objectFit="contain"
          />
          <div className="bg-background/70 absolute right-0 bottom-0 left-0 flex justify-between p-2">
            <span className="text-price">${amazonData.price}</span>
            {product.category && <Badge variant="default">{product.category?.name}</Badge>}
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{amazonData.title}</ItemTitle>
          <ItemDescription>{amazonData.description}</ItemDescription>
        </ItemContent>
        <ItemFooter className="mt-auto w-full basis-auto flex-col items-start gap-2">
          {product.redditStats && <RedditStatsDisplay stats={product.redditStats} />}
        </ItemFooter>
      </Link>
    </Item>
  );
}
