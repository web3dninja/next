import type { Product } from '@/types/product';
import { getAmazonProductData } from '@/lib/services/amazon';
import { enrichProductWithAmazonData } from '@/lib/services/amazon/helpers';

export async function enrichProductWithAmazon(product: Product): Promise<Product> {
  if (!product.amazonProductId) {
    return product;
  }

  try {
    const amazonData = await getAmazonProductData(product.amazonProductId);
    return enrichProductWithAmazonData(product, amazonData);
  } catch (error) {
    console.error(`Error enriching product ${product.id} with Amazon data:`, error);
    return product;
  }
}

export async function enrichProductsWithAmazon(products: Product[]): Promise<Product[]> {
  const productsWithAmazonId = products.filter(p => p.amazonProductId);

  if (productsWithAmazonId.length === 0) {
    return products;
  }

  const amazonDataMap = new Map<string, Awaited<ReturnType<typeof getAmazonProductData>>>();

  const promises = productsWithAmazonId.map(async product => {
    if (!product.amazonProductId) return;
    try {
      const data = await getAmazonProductData(product.amazonProductId);
      if (data) {
        amazonDataMap.set(product.amazonProductId, data);
      }
    } catch (error) {
      console.error(`Error fetching Amazon data for product ${product.id}:`, error);
    }
  });

  await Promise.all(promises);

  return products.map(product => {
    if (!product.amazonProductId) return product;
    const amazonData = amazonDataMap.get(product.amazonProductId);
    return enrichProductWithAmazonData(product, amazonData || null);
  });
}
