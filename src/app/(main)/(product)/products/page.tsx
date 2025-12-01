import { Metadata } from 'next';
import { findAllProducts } from '@/lib/db';
import { findAllCategories } from '@/lib/db';
import { ProductsList } from '@/components/pages';

export const revalidate = 43200; // 12 hours

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse our collection of top-rated products with Reddit community reviews and sentiment analysis.',
  openGraph: {
    title: 'Products',
    description:
      'Browse our collection of top-rated products with Reddit community reviews and sentiment analysis.',
  },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([findAllProducts(), findAllCategories()]);

  return (
    <>
      <div className="content-header container">
        <h1>Products</h1>
        <div className="flex-1" />
      </div>

      <div className="content container">
        <ProductsList products={products} categories={categories} categoryHrefBase="/products" />
      </div>
    </>
  );
}
