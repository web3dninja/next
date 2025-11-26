import basePrisma, { withAdmin } from '@/utils/prisma';
import { Product } from '@/types/product';
import type { ProductFormData } from '@/lib/schemas/product';
import { normalizeRedditKeyword } from '@/lib/validations/product';
import { ensureRedditStats, cleanupOrphanRedditStats, updateRedditKeyword } from './reddit-stats';

const includeRelations = {
  include: { redditStats: true, category: true },
};

export async function findAllProducts(): Promise<Product[]> {
  return await basePrisma.product.findMany(includeRelations);
}

export async function findProductById(id: number): Promise<Product | null> {
  return await basePrisma.product.findUnique({
    where: { id },
    ...includeRelations,
  });
}

export async function findProductBySlug(slug: string): Promise<Product | null> {
  return await basePrisma.product.findUnique({
    where: { slug },
    ...includeRelations,
  });
}

export async function findProductsByCategoryIds(categoryIds: number[]): Promise<Product[]> {
  return await basePrisma.product.findMany({
    where: { categoryId: { in: categoryIds } },
    ...includeRelations,
  });
}

export async function createProduct(data: ProductFormData): Promise<Product | null> {
  const normalizedKeyword = normalizeRedditKeyword(data.redditKeyword);

  return await withAdmin(async prisma => {
    await ensureRedditStats(prisma, normalizedKeyword);

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        brand: data.brand,
        description: data.description,
        price: data.price,
        link: data.link,
        image: data.image,
        categoryId: data.categoryId,
        redditKeyword: normalizedKeyword,
      },
      ...includeRelations,
    });

    return newProduct;
  });
}

export async function updateProductById(id: number, data: ProductFormData): Promise<Product> {
  return await withAdmin(async prisma => {
    const currentProduct = await basePrisma.product.findUnique({
      where: { id },
    });

    const normalizedKeyword = normalizeRedditKeyword(data.redditKeyword);

    await updateRedditKeyword(prisma, currentProduct?.redditKeyword, normalizedKeyword);

    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        brand: data.brand,
        description: data.description,
        price: data.price,
        link: data.link,
        image: data.image,
        categoryId: data.categoryId,
        redditKeyword: normalizedKeyword,
      },
    });

    const updatedProduct = await basePrisma.product.findUnique({
      where: { id },
      ...includeRelations,
    });

    if (!updatedProduct) {
      throw new Error(`Product with id ${id} not found after update`);
    }

    return updatedProduct;
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
