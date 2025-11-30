/**
 * Hook для отримання метаданих продуктів (brands, price range, etc.)
 * Відповідальність: тільки витягування метаданих з масиву продуктів
 */

import { useMemo } from 'react';
import { Product } from '@/types/product';
import { PriceRange } from '@/types/filters';

export interface ProductMetadata {
  allBrands: string[];
  priceRange: PriceRange;
}

export function useProductMetadata(products: Product[]): ProductMetadata {
  const allBrands = useMemo(() => {
    const brands = products.map(p => p.brand);
    return Array.from(new Set(brands)).sort();
  }, [products]);

  const priceRange: PriceRange = useMemo(() => {
    const prices = products.map(p => p.price).filter(p => !isNaN(p));

    if (prices.length === 0) {
      return [0, 0];
    }

    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);

  return {
    allBrands,
    priceRange,
  };
}
