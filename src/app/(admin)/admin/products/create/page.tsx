'use client';

import { BackButton } from '@/components/ui/back-button';
import { ProductForm } from '../components/product-form';

export default function CreateProductPage() {
  return (
    <>
      <div className="container">
        <BackButton href="/admin/products" label="Back to Products" />
      </div>

      <div className="content">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Create Product</h1>
        <div className="mx-auto space-y-4">
          <ProductForm mode="create" />
        </div>
      </div>
    </>
  );
}
