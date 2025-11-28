/**
 * Hook для отримання метаданих продуктів (brands, price range, etc.)
 * Відповідальність: тільки витягування метаданих з масиву продуктів
 */

import { useMemo } from 'react';
import { Product } from '@/types/product';

export interface ProductMetadata {
  allBrands: string[];
  priceRange: { min: number; max: number };
}

/**
 * Витягує метадані з масиву продуктів
 */
export function useProductMetadata(products: Product[]): ProductMetadata {
  const allBrands = useMemo(() => {
    const brands = products.map(p => p.brand);
    return Array.from(new Set(brands)).sort();
  }, [products]);

  const priceRange = useMemo(() => {
    const prices = products.map(p => parseFloat(p.price)).filter(p => !isNaN(p));

    if (prices.length === 0) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  return {
    allBrands,
    priceRange,
  };
}
