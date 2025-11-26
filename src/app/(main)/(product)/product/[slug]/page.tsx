import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findAllProducts, findProductBySlug } from '@/lib/db/product';
import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { RedditStatsDisplay } from '@/components/pages/products';
import { Item, ItemContent, ItemDescription, ItemMedia } from '@/components/ui/item';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await findAllProducts();

  return products
    .filter(p => p.slug)
    .map(product => ({
      slug: product.slug!,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await findProductBySlug(slug);
  if (!product) {
    return {
      title: 'Not Found',
    };
  }

  const description = product.description.slice(0, 160);

  return {
    title: `${product.name} by ${product.brand}`,
    description,
    openGraph: {
      title: `${product.name} by ${product.brand}`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await findProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="container">
        <BackButton href="/products" label="Products" />
      </div>

      <div className="content container">
        <Item
          variant="default"
          className="flex-start mx-auto flex max-w-4xl flex-wrap items-start gap-8"
        >
          <div className="mx-auto w-80 sm:w-64">
            <ItemMedia className="relative overflow-hidden rounded-lg pb-[100%]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="100%"
              />
            </ItemMedia>

            {product.redditStats && (
              <RedditStatsDisplay stats={product.redditStats} className="mt-4" />
            )}
          </div>
          <ItemContent className="flex-1 gap-4">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{product.brand}</p>
              <h1 className="text-3xl font-bold text-black dark:text-white">{product.name}</h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-price text-2xl">${product.price}</span>
              {product.category && <Badge variant="default">{product.category.name}</Badge>}
            </div>

            <ItemDescription className="text-sm text-zinc-600 dark:text-zinc-300">
              {product.description}
            </ItemDescription>

            <Button asChild size="xl" className="mt-4 w-70">
              <Link href={product.link} target="_blank" rel="noopener noreferrer">
                Buy on Amazon
              </Link>
            </Button>
          </ItemContent>
        </Item>
      </div>
    </>
  );
}
