import Link from 'next/link';
import { ProductsList } from './components/products-list';
import { getProducts } from '@/lib/data';
import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <>
      <div className="container flex items-center justify-between">
        <BackButton href="/admin" label="Back to Admin" />
        <Link href="/admin/products/create">
          <Button variant="outline" size="sm">
            <PlusIcon className="mr-2 size-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="content">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Products</h1>

        <ProductsList products={products} />
      </div>
    </>
  );
}
