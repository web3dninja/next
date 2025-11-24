import { CategoriesList } from './components/categories-list';
import { getCategoriesWithProductCount } from '@/lib/data';
import { BackButton } from '@/components/ui/back-button';

export default async function CategoriesPage() {
  const categories = await getCategoriesWithProductCount();

  return (
    <>
      <div className="content-header">
        <BackButton href="/admin" label="Back to Admin" />
        <h1>Categories</h1>
      </div>

      <div className="content">
        <CategoriesList categories={categories} />
      </div>
    </>
  );
}

