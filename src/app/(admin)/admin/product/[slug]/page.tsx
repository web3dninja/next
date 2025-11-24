import { BackButton } from '@/components/ui/back-button';
import { ProductForm } from '../../products/components/product-form';
import DeleteProductButton from '../../products/components/delete-product-button';
import { Metadata } from 'next';
import { getProductBySlug } from '@/lib/data';
import { getCategories } from '@/lib/data/category';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
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

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="content-header justify-between">
        <BackButton href="/admin/products" label="Back to Products" />
        <DeleteProductButton productId={product.id} />
      </div>

      <div className="content">
        <ProductForm mode="update" product={product} categories={categories} />
      </div>
    </>
  );
}
