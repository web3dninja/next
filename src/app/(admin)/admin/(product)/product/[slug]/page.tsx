import { BackButton } from '@/components/ui/back-button';
import { Metadata } from 'next';
import { findAllCategories, findProductByAmazonId } from '@/lib/db';
import { notFound } from 'next/navigation';
import { DeleteButton } from '../../components/delete-button';
import { UpdateProductForm } from '../../components/update';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await findProductByAmazonId(slug);
  const amazonData = product?.amazonData;

  if (!product || !amazonData) {
    return {
      title: 'Not Found',
    };
  }

  const description = amazonData.description.slice(0, 160);
  const title = `${amazonData.title}${amazonData.brand ? ` by ${amazonData.brand}` : ''}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [amazonData.image],
    },
  };
}

export default async function UpdateProductPage({ params }: PageProps) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    findProductByAmazonId(slug),
    findAllCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="content-header justify-between">
        <BackButton href="/admin/products" label="Products" />
        <DeleteButton productId={product.id} />
      </div>

      <div className="content container w-full max-w-xl">
        <UpdateProductForm product={product} categories={categories} />
      </div>
    </>
  );
}
