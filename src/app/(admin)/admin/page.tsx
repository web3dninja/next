import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import Link from 'next/link';

export default async function AdminPage() {
  return (
    <div className="content container">
      <div className="w-full text-center sm:text-left">
        <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl dark:text-white">
          Welcome to the admin dashboard! 🚀
        </h1>
        <p className="mb-2 text-lg text-zinc-600 dark:text-zinc-400">
          Admin dashboard for managing users
        </p>
      </div>

      <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Item variant="outline" asChild>
          <Link href="admin/users">
            <ItemMedia variant="image">👥</ItemMedia>
            <ItemContent>
              <ItemTitle>Users</ItemTitle>
              <ItemDescription>Full CRUD functionality for managing users</ItemDescription>
            </ItemContent>
          </Link>
        </Item>

        <Item variant="outline" asChild>
          <Link href="admin/products">
            <ItemMedia variant="image">🛠️</ItemMedia>
            <ItemContent>
              <ItemTitle>Products</ItemTitle>
              <ItemDescription>Full CRUD functionality for managing products</ItemDescription>
            </ItemContent>
          </Link>
        </Item>

        <Item variant="outline" asChild>
          <Link href="admin/categories">
            <ItemMedia variant="image">📁</ItemMedia>
            <ItemContent>
              <ItemTitle>Categories</ItemTitle>
              <ItemDescription>Manage product categories and hierarchy</ItemDescription>
            </ItemContent>
          </Link>
        </Item>
      </div>
    </div>
  );
}
