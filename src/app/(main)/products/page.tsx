import { getProducts } from '@/lib/data';
import { BackButton } from '@/components/ui/back-button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  ItemFooter,
} from '@/components/ui/item';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <div className="container">
        <BackButton href="/" label="Home" />
      </div>

      <div className="content">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Products</h1>

      <ItemGroup className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {products.map(product => (
          <Item
            key={product.id}
            variant="muted"
            className="flex-col flex-nowrap items-start"
            asChild
          >
            <Link href={`/products/${product.id}`}>
              <ItemMedia variant="image" className="h-48 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{product.name}</ItemTitle>
                <ItemDescription>{product.description}</ItemDescription>
              </ItemContent>
              <ItemFooter>
                <span className="font-semibold text-black dark:text-white">${product.price}</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{product.category}</span>
              </ItemFooter>
            </Link>
          </Item>
        ))}
      </ItemGroup>

        {products.length === 0 && (
          <p className="text-center text-zinc-500 dark:text-zinc-400">No products found</p>
        )}
      </div>
    </>
  );
}
