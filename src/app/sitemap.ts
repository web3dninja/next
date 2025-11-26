import { MetadataRoute } from 'next';
import { findAllProducts } from '@/lib/db/product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not set');
  }

  const products = await findAllProducts();

  const productUrls = products
    .filter(product => product.slug)
    .map(product => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: product.redditStats?.updatedAt || new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productUrls,
  ];
}
