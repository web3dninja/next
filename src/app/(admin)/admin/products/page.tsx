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
      <div className="content-header">
        <BackButton href="/admin" label="Admin" />
        <h1>Products</h1>
        <div className="flex-1" />
        <Link href="/admin/products/create">
          <Button variant="outline" size="sm">
            <PlusIcon className="mr-2 size-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="content">
        <ProductsList products={products} />
      </div>
    </>
  );
}
