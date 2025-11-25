import { BackButton } from '@/components/ui/back-button';
import { CategoryForm } from '../../components/category-form';
import { getCategories } from '@/lib/data/category';

export default async function CreateCategoryPage() {
  const categories = await getCategories();

  return (
    <>
      <div className="content-header container">
        <BackButton href="/admin/categories" label="Categories" />
        <h1>Create Category</h1>
      </div>

      <div className="content container">
        <CategoryForm mode="create" categories={categories} />
      </div>
    </>
  );
}
