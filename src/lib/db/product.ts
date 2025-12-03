import basePrisma, { withAdmin } from '@/utils/prisma';
import { Product } from '@/types/product';
import type { ProductFormData } from '@/lib/schemas';
import { normalizeRedditKeyword } from '@/lib/validations';
import { ensureRedditStats, cleanupOrphanRedditStats } from './reddit-stats';
import { enrichProductsWithAmazon, enrichProductWithAmazon } from './product-amazon';

const includeRelations = {
  include: { redditStats: true, category: true },
};

export async function findAllProducts(): Promise<Product[]> {
  const products = await basePrisma.product.findMany(includeRelations);
  return await enrichProductsWithAmazon(products);
}

export async function findProductById(id: number): Promise<Product | null> {
  const product = await basePrisma.product.findUnique({
    where: { id },
    ...includeRelations,
  });
  if (!product) return null;
  return await enrichProductWithAmazon(product);
}

export async function findProductByAmazonId(amazonProductId: string): Promise<Product | null> {
  const product = await basePrisma.product.findFirst({
    where: { amazonProductId },
    ...includeRelations,
  });

  if (!product) {
    return null;
  }

  const enrichedProduct = await enrichProductWithAmazon(product);
  return enrichedProduct;
}

export async function findProductsByCategoryIds(categoryIds: number[]): Promise<Product[]> {
  const products = await basePrisma.product.findMany({
    where: { categoryId: { in: categoryIds } },
    ...includeRelations,
  });
  return await enrichProductsWithAmazon(products);
}

export async function createProduct(data: ProductFormData): Promise<Product | null> {
  const normalizedKeyword = normalizeRedditKeyword(data.redditKeyword);

  return await withAdmin(async prisma => {
    await ensureRedditStats(prisma, normalizedKeyword);

    const newProduct = await prisma.product.create({
      data: {
        categoryId: data.categoryId,
        redditKeyword: normalizedKeyword,
        amazonProductId: data.amazonProductId,
        link: data.link,
      },
      ...includeRelations,
    });

    const enrichedProduct = await enrichProductWithAmazon(newProduct);
    return enrichedProduct;
  });
}

export async function updateProductById(id: number, data: ProductFormData): Promise<Product> {
  return await withAdmin(async prisma => {
    const currentProduct = await basePrisma.product.findUnique({
      where: { id },
    });

    const previousKeyword = currentProduct?.redditKeyword;
    const normalizedKeyword = normalizeRedditKeyword(data.redditKeyword);

    await ensureRedditStats(prisma, normalizedKeyword);

    await prisma.product.update({
      where: { id },
      data: {
        categoryId: data.categoryId,
        redditKeyword: normalizedKeyword,
        amazonProductId: data.amazonProductId,
        link: data.link,
      },
    });

    // After updating the product, clean up old reddit stats if no other products use that keyword
    if (previousKeyword && previousKeyword !== normalizedKeyword) {
      await cleanupOrphanRedditStats(previousKeyword);
    }

    const updatedProduct = await basePrisma.product.findUnique({
      where: { id },
      ...includeRelations,
    });

    if (!updatedProduct) {
      throw new Error(`Product with id ${id} not found after update`);
    }

    const enrichedProduct = await enrichProductWithAmazon(updatedProduct);
    return enrichedProduct;
  });
}

export async function deleteProductById(id: number): Promise<Product> {
  return await withAdmin(async prisma => {
    const product = await basePrisma.product.findUnique({
      where: { id },
    });

    const deletedProduct = await prisma.product.delete({
      where: { id },
      ...includeRelations,
    });

    if (product?.redditKeyword) {
      await cleanupOrphanRedditStats(product.redditKeyword);
    }

    return deletedProduct;
  });
}
