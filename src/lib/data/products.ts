import prisma from '@/lib/prisma';
import { fetchRedditStats } from '@/lib/services/reddit';

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: string;
  link: string;
  image: string;
  category: string;
  redditKeyword: string;
  redditStats: RedditStats | null;
}

export interface RedditStats {
  id: number;
  keyword: string;
  mentions: number;
  positiveScore: number;
  negativeScore: number;
  rank: number;
  updatedAt: Date;
}

export async function getProducts(): Promise<Product[]> {
  return await prisma.product.findMany({
    include: { redditStats: true },
  });
}

export async function getProductById(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({
    where: { id },
    include: { redditStats: true },
  });
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return await prisma.product.findMany({
    where: { category },
    include: { redditStats: true },
  });
}

export async function addProduct(
  product: Omit<Product, 'id' | 'redditStats'>,
): Promise<Product | null> {
  const normalizedKeyword = product.redditKeyword.toLowerCase().trim();

  const existingStats = await prisma.redditStats.findUnique({
    where: { keyword: normalizedKeyword },
  });

  if (!existingStats) {
    const keywords = normalizedKeyword.split('-').filter(Boolean);
    const redditData = await fetchRedditStats(keywords);

    await prisma.redditStats.create({
      data: {
        keyword: normalizedKeyword,
        mentions: redditData.mentions,
        positiveScore: redditData.positiveScore,
        negativeScore: redditData.negativeScore,
        rank: redditData.rank,
      },
    });
  }

  const newProduct = await prisma.product.create({
    data: {
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      link: product.link,
      image: product.image,
      category: product.category,
      redditKeyword: normalizedKeyword,
    },
    include: { redditStats: true },
  });

  return newProduct;
}

export async function updateProduct(
  id: number,
  data: Omit<Product, 'id' | 'redditStats'>,
): Promise<Product> {
  const currentProduct = await prisma.product.findUnique({
    where: { id },
  });

  const oldKeyword = currentProduct?.redditKeyword;
  const normalizedKeyword = data.redditKeyword.toLowerCase().trim();
  const newKeyword = normalizedKeyword;

  if (oldKeyword && newKeyword && oldKeyword !== newKeyword) {
    const existingStats = await prisma.redditStats.findUnique({
      where: { keyword: newKeyword },
    });

    if (!existingStats) {
      const keywords = newKeyword.split('-').filter(Boolean);
      const redditData = await fetchRedditStats(keywords);

      await prisma.redditStats.create({
        data: {
          keyword: newKeyword,
          mentions: redditData.mentions,
          positiveScore: redditData.positiveScore,
          negativeScore: redditData.negativeScore,
          rank: redditData.rank,
        },
      });
    }
  }

  await prisma.product.update({
    where: { id },
    data: {
      ...data,
      redditKeyword: normalizedKeyword,
    },
  });

  if (oldKeyword && newKeyword && oldKeyword !== newKeyword) {
    await cleanupOrphanRedditStats(oldKeyword);
  }

  const updatedProduct = await prisma.product.findUnique({
    where: { id },
    include: { redditStats: true },
  });

  if (!updatedProduct) {
    throw new Error(`Product with id ${id} not found after update`);
  }

  return updatedProduct;
}

export async function deleteProduct(id: number): Promise<Product> {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  const deletedProduct = await prisma.product.delete({
    where: { id },
    include: { redditStats: true },
  });

  if (product?.redditKeyword) {
    await cleanupOrphanRedditStats(product.redditKeyword);
  }

  return deletedProduct;
}

async function cleanupOrphanRedditStats(keyword: string): Promise<void> {
  const productsWithKeyword = await prisma.product.count({
    where: { redditKeyword: keyword },
  });

  if (productsWithKeyword === 0) {
    try {
      await prisma.redditStats.delete({
        where: { keyword },
      });
    } catch {}
  }
}
