import { BackButton } from '@/components/ui/back-button';
import { findAllCategories } from '@/lib/db/category';
import { CreateProductForm } from '../../components/create';

export default async function CreateProductPage() {
  const categories = await findAllCategories();

  return (
    <>
      <div className="content-header container">
        <BackButton href="/admin/products" label="Products" />
        <h1>Create Product</h1>
      </div>

      <div className="content container">
        <div className="mx-auto space-y-4">
          <CreateProductForm categories={categories} />
        </div>
      </div>
    </>
  );
}
