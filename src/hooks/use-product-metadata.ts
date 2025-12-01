import { useMemo } from 'react';
import { ProductWithAmazonData } from '@/types/product';
import type { Range } from '@/modules/filters';
import { getAllBrands, getPriceRange } from '@/helpers/product';

export interface ProductMetadata {
  allBrands: string[];
  priceRange: Range;
}

export function useProductMetadata(products: ProductWithAmazonData[]): ProductMetadata {
  const allBrands = useMemo(() => getAllBrands(products), [products]);

  const priceRange = useMemo(() => getPriceRange(products), [products]);

  return {
    allBrands,
    priceRange,
  };
}
