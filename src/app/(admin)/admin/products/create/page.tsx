'use client';

import { BackButton } from '@/components/ui/back-button';
import { ProductForm } from '../components/product-form';

export default function CreateProductPage() {
  return (
    <>
      <div className="container flex gap-4">
        <BackButton href="/admin/products" label="Back to Products" />
        <h1>Create Product</h1>
      </div>

      <div className="content">
        <div className="mx-auto space-y-4">
          <ProductForm mode="create" />
        </div>
      </div>
    </>
  );
}
