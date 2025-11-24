import { Metadata } from 'next';
import { getProducts } from '@/lib/data';
import { getCategories } from '@/lib/data/category';
import { ProductsList } from './components/products-list';
import { EmptyState } from '@/components/ui/empty-state';

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
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <>
      <div className="content-header">
        <h1>Products</h1>
        <div className="flex-1" />
      </div>

      <div className="content">
        <ProductsList products={products} categories={categories} />

        <EmptyState show={products.length === 0}>No products found</EmptyState>
      </div>
    </>
  );
}
