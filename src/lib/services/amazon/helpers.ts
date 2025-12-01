import type { Product } from '@/types/product';
import type { AmazonProductData } from './types';

export function enrichProductWithAmazonData(
  product: Product,
  amazonData?: AmazonProductData | null,
): Product {
  if (!amazonData) {
    return product;
  }

  return {
    ...product,
    amazonData,
  };
}

export async function enrichProductsWithAmazonData(
  products: Product[],
  getAmazonData: (asin: string) => Promise<AmazonProductData | null>,
): Promise<Product[]> {
  const productsWithAmazonId = products.filter(p => p.amazonProductId);

  if (productsWithAmazonId.length === 0) {
    return products;
  }

  const amazonDataMap = new Map<string, AmazonProductData | null>();

  const promises = productsWithAmazonId.map(async product => {
    if (!product.amazonProductId) return;
    const data = await getAmazonData(product.amazonProductId);
    if (data) {
      amazonDataMap.set(product.amazonProductId, data);
    }
  });

  await Promise.all(promises);

  return products.map(product => {
    if (!product.amazonProductId) return product;
    const amazonData = amazonDataMap.get(product.amazonProductId);
    return enrichProductWithAmazonData(product, amazonData || null);
  });
}
