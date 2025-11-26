import { BackButton } from '@/components/ui/back-button';
import { CategoryForm } from '../../components/category-form';
import DeleteCategoryButton from '../../components/delete-category-button';
import { Metadata } from 'next';
import { findCategoryBySlug, findAllCategories } from '@/lib/db/category';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
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
    title: `Edit ${category.name}`,
  };
}

export default async function UpdateCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const [category, categories] = await Promise.all([findCategoryBySlug(slug), findAllCategories()]);

  if (!category) {
    notFound();
  }

  return (
    <>
      <div className="content-header container justify-between">
        <BackButton href="/admin/categories" label="Categories" />
        <DeleteCategoryButton categoryId={category.id} />
      </div>

      <div className="content container">
        <CategoryForm mode="update" category={category} categories={categories} />
      </div>
    </>
  );
}
