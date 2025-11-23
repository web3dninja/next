'use client';

import { useQuery } from '@tanstack/react-query';
import { BackButton } from '@/components/ui/back-button';
import { ProductForm } from '../components/product-form';
import { getProductAction } from '../product.actions';
import DeleteProductButton from '../components/delete-product-button';
import { use } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UpdateProductPage({ params }: PageProps) {
  const { id } = use(params);
  const productId = parseInt(id);

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductAction(productId),
  });

  if (productLoading) {
    return (
      <>
        <div className="container">
          <BackButton href="/admin/products" label="Back to Products" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <div className="container">
          <BackButton href="/admin/products" label="Back to Products" />
        </div>
        <div className="content">
          <p className="text-zinc-500 dark:text-zinc-400">Product not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container flex items-center justify-between gap-4">
        <BackButton href="/admin/products" label="Back to Products" />
        <DeleteProductButton productId={productId} />
      </div>

      <div className="content">
        <ProductForm mode="update" product={product} />
      </div>
    </>
  );
}
