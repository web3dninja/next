import { BackButton } from '@/components/ui/back-button';
import { ProductForm } from '../components/product-form';
import { getCategories } from '@/lib/data/category';

export default async function CreateProductPage() {
  const categories = await getCategories();

  return (
    <>
      <div className="content-header">
        <BackButton href="/admin/products" label="Products" />
        <h1>Create Product</h1>
      </div>

      <div className="content">
        <div className="mx-auto space-y-4">
          <ProductForm mode="create" categories={categories} />
        </div>
      </div>
    </>
  );
}
