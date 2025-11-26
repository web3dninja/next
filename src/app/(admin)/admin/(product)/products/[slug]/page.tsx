import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findProductsByCategoryIds } from '@/lib/db';
import { findCategoryBySlug, findAllCategories } from '@/lib/db';
import { getDescendantCategoryIds } from '@/helpers/product.helper';
import { ProductsList } from '@/components/pages';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await findAllCategories();

  return categories.map(category => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const category = await findCategoryBySlug(slug);
  if (!category) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${category.name} - Products`,
    description: `Browse our collection of ${category.name} products with Reddit community reviews.`,
    openGraph: {
      title: `${category.name} - Products`,
      description: `Browse our collection of ${category.name} products with Reddit community reviews.`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const [category, categories] = await Promise.all([findCategoryBySlug(slug), findAllCategories()]);

  if (!category) {
    notFound();
  }

  const categoryIds = getDescendantCategoryIds(categories, category.id);

  const products = await findProductsByCategoryIds(categoryIds);

  return (
    <>
      <div className="content-header container">
        <h1>{category.name}</h1>
        <div className="flex-1" />
      </div>

      <div className="content container">
        <ProductsList
          products={products}
          categories={categories}
          categoryHrefBase="/admin/products"
        />
      </div>
    </>
  );
}
