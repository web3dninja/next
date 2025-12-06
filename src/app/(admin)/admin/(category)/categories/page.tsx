import { Categories } from '../components/categories';
import { findCategoriesWithProductCount } from '@/lib/db';

export default async function CategoriesPage() {
  const categories = await findCategoriesWithProductCount();

  return <Categories categories={categories} />;
}
