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

  // Перевірка конфігурації Amazon API
  const hasAmazonConfig = !!(
    process.env.AMAZON_ACCESS_KEY &&
    process.env.AMAZON_SECRET_KEY &&
    process.env.AMAZON_PARTNER_TAG &&
    process.env.AMAZON_MARKETPLACE &&
    process.env.AMAZON_REGION
  );

  if (!hasAmazonConfig) {
    console.warn(
      'Amazon API configuration is missing. Products will not have amazonData. Required env vars: AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, AMAZON_PARTNER_TAG, AMAZON_MARKETPLACE, AMAZON_REGION',
    );
    return products;
  }

  const amazonDataMap = new Map<string, Awaited<ReturnType<typeof getAmazonProductData>>>();

  const promises = productsWithAmazonId.map(async product => {
    if (!product.amazonProductId) return;
    try {
      const data = await getAmazonProductData(product.amazonProductId);
      if (data) {
        amazonDataMap.set(product.amazonProductId, data);
      } else {
        console.warn(
          `No Amazon data returned for product ${product.id} (ASIN: ${product.amazonProductId})`,
        );
      }
    } catch (error) {
      console.error(
        `Error fetching Amazon data for product ${product.id} (ASIN: ${product.amazonProductId}):`,
        error,
      );
    }
  });

  await Promise.all(promises);

  const enriched = products.map(product => {
    if (!product.amazonProductId) return product;
    const amazonData = amazonDataMap.get(product.amazonProductId);
    return enrichProductWithAmazonData(product, amazonData || null);
  });

  const withData = enriched.filter(p => p.amazonData);
  const withoutData = enriched.filter(p => !p.amazonData && p.amazonProductId);

  if (withoutData.length > 0) {
    console.warn(
      `${withoutData.length} products without Amazon data:`,
      withoutData.map(p => ({ id: p.id, asin: p.amazonProductId })),
    );
  }

  return enriched;
}
