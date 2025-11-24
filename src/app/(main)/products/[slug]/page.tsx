import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductsByCategory } from '@/lib/data';
import { getCategoryBySlug, getCategories } from '@/lib/data/category';
import { BackButton } from '@/components/ui/back-button';
import { ProductsList } from '../components/products-list';
import { EmptyState } from '@/components/ui/empty-state';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map(category => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);
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

  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  if (!category) {
    notFound();
  }

  // Get all descendant category IDs
  const getDescendantIds = (categoryId: number): number[] => {
    const descendants: number[] = [categoryId];
    const children = categories.filter(c => c.parentId === categoryId);
    for (const child of children) {
      descendants.push(...getDescendantIds(child.id));
    }
    return descendants;
  };

  const categoryIds = getDescendantIds(category.id);

  // Get products from this category and all subcategories
  const allProducts = await Promise.all(
    categoryIds.map(id => getProductsByCategory(id))
  );
  const products = allProducts.flat();

  return (
    <>
      <div className="content-header">
        <BackButton href="/products" label="All Products" />
        <h1>{category.name}</h1>
        <div className="flex-1" />
      </div>

      <div className="content">
        <ProductsList products={products} categories={categories} />

        <EmptyState show={products.length === 0}>
          No products found in {category.name}
        </EmptyState>
      </div>
    </>
  );
}
