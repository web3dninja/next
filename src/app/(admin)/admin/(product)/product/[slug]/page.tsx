import { BackButton } from '@/components/ui/back-button';
import { Metadata } from 'next';
import { findProductBySlug } from '@/lib/db';
import { findAllCategories } from '@/lib/db';
import { notFound } from 'next/navigation';
import { DeleteButton } from '../../components/delete-button';
import { UpdateProductForm } from '../../components/update';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await findProductBySlug(slug);
  if (!product) {
    return {
      title: 'Not Found',
    };
  }

  const description = product.description.slice(0, 160);

  return {
    title: `${product.name} by ${product.brand}`,
    description,
    openGraph: {
      title: `${product.name} by ${product.brand}`,
      description,
      images: [product.image],
    },
  };
}

export default async function UpdateProductPage({ params }: PageProps) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([findProductBySlug(slug), findAllCategories()]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="content-header justify-between">
        <BackButton href="/admin/products" label="Products" />
        <DeleteButton productId={product.id} />
      </div>

      <div className="content container">
        <UpdateProductForm product={product} categories={categories} />
      </div>
    </>
  );
}
