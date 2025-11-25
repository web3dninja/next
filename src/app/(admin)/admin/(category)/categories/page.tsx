import { CategoriesList } from '../components/categories-list';
import { getCategoriesWithProductCount } from '@/lib/data';
import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default async function CategoriesPage() {
  const categories = await getCategoriesWithProductCount();

  return (
    <>
      <div className="content-header container">
        <BackButton href="/admin" label="Admin" />
        <h1>Categories</h1>
        <div className="flex-1" />
        <Button variant="outline" size="lg" asChild>
          <Link href="/admin/categories/create">
            <PlusIcon className="mr-2 size-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <div className="content container">
        <CategoriesList categories={categories} />
      </div>
    </>
  );
}
