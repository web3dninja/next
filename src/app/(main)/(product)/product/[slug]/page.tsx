import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findAllProducts, findProductByAmazonId } from '@/lib/db';
import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { RedditStatsDisplay } from '@/components/pages/products';
import { Item, ItemContent, ItemDescription, ItemMedia } from '@/components/ui/item';
import { mockAmazonProducts } from '../../products/mock-products';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 43200;

export async function generateStaticParams() {
  const products = await findAllProducts();

  return products
    .filter(p => p.amazonProductId)
    .map(product => ({
      slug: product.amazonProductId!,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await findProductByAmazonId(slug);
  if (!product || !product.amazonData) {
    return {
      title: 'Not Found',
    };
  }

  const amazonData = product.amazonData;
  const description = amazonData.description.slice(0, 160);

  return {
    title: `${amazonData.title}${amazonData.brand ? ` by ${amazonData.brand}` : ''}`,
    description,
    openGraph: {
      title: `${amazonData.title}${amazonData.brand ? ` by ${amazonData.brand}` : ''}`,
      description,
      images: [amazonData.image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  let product = await findProductByAmazonId(slug);

  product = product
    ? {
        ...product,
        amazonData: mockAmazonProducts.find(p => p.asin === slug),
      }
    : null;

  if (!product || !product.amazonData) {
    notFound();
  }

  const amazonData = product.amazonData;

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
                src={amazonData.image}
                alt={amazonData.title}
                fill
                sizes="100%"
                objectFit="contain"
              />
            </ItemMedia>

            <Button asChild size="xl" className="mt-4 w-full">
              <Link href={amazonData.url} target="_blank" rel="noopener noreferrer">
                Buy on Amazon
              </Link>
            </Button>

            {product.redditStats && (
              <RedditStatsDisplay stats={product.redditStats} className="mt-4" />
            )}
          </div>
          <ItemContent className="flex-1 gap-4">
            <div>
              {amazonData.brand && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{amazonData.brand}</p>
              )}
              <h1 className="text-3xl font-bold text-black dark:text-white">{amazonData.title}</h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-price text-2xl">${amazonData.price}</span>
              {product.category && <Badge variant="default">{product.category.name}</Badge>}
            </div>

            <ItemDescription className="line-clamp-none text-sm text-zinc-600 dark:text-zinc-300">
              {amazonData.description}
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>
    </>
  );
}
