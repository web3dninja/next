import { getProductById } from '@/lib/data';
import { BackButton } from '@/components/ui/back-button';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="container">
        <BackButton href="/products" label="Back to Products" />
      </div>

      <div className="content">
        <div className="mx-auto max-w-4xl">
          <div className="flex-start flex flex-wrap gap-8">
            <div className="mx-auto w-80 sm:w-64">
              <div className="relative overflow-hidden rounded-lg pb-[100%]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="100%"
                />
              </div>

              <Button asChild size="xl" className="mt-4 w-full">
                <Link href={product.link} target="_blank" rel="noopener noreferrer">
                  Buy on Amazon
                </Link>
              </Button>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{product.brand}</p>
                <h1 className="text-3xl font-bold text-black dark:text-white">{product.name}</h1>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-black dark:text-white">
                  ${product.price}
                </span>
                <Badge variant="default">{product.category}</Badge>
              </div>

              <p className="whitespace-pre-line text-zinc-600 dark:text-zinc-300">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
