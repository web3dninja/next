// Products data and functions

import prisma from '@/lib/prisma';

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
  redditStats?: RedditStats | null;
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

// Data access functions
export async function getProducts(): Promise<Product[]> {
  return await prisma.product.findMany();
}

export async function getProductById(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({
    where: { id },
  });
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return await prisma.product.findMany({
    where: { category },
  });
}

// Mutation functions
export async function addProduct(product: Omit<Product, 'id' | 'redditStats'>): Promise<Product> {
  const newProduct = await prisma.product.create({
    data: {
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      link: product.link,
      image: product.image,
      category: product.category,
      redditKeyword: product.redditKeyword,
    },
    include: { redditStats: true },
  });

  if (product.redditKeyword) {
    await prisma.redditStats.create({
      data: { keyword: product.redditKeyword },
    });
  }

  return newProduct;
}

export async function updateProduct(
  id: number,
  data: Partial<Omit<Product, 'id' | 'redditStats'>>,
): Promise<Product | null> {
  try {
    return await prisma.product.update({
      where: { id },
      data,
    });
  } catch (error) {
    return null;
  }
}

export async function deleteProduct(id: number): Promise<Product | null> {
  try {
    return await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    return null;
  }
}

// Reddit Stats functions
export async function createRedditStats(keyword: string): Promise<RedditStats> {
  return await prisma.redditStats.create({
    data: { keyword },
  });
}

export async function getRedditStatsByKeyword(keyword: string): Promise<RedditStats | null> {
  return await prisma.redditStats.findUnique({
    where: { keyword },
  });
}

export async function updateRedditStats(
  keyword: string,
  data: Partial<Omit<RedditStats, 'id' | 'keyword'>>,
): Promise<RedditStats | null> {
  try {
    return await prisma.redditStats.update({
      where: { keyword },
      data,
    });
  } catch (error) {
    return null;
  }
}

// Upsert - створює або оновлює статистику
export async function upsertRedditStats(
  keyword: string,
  data: Omit<RedditStats, 'id' | 'keyword' | 'updatedAt'>,
): Promise<RedditStats> {
  return await prisma.redditStats.upsert({
    where: { keyword },
    update: data,
    create: { keyword, ...data },
  });
}

// Отримати продукт з включеною статистикою
export async function getProductWithStats(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({
    where: { id },
    include: { redditStats: true },
  });
}

// Отримати всі продукти з статистикою
export async function getProductsWithStats(): Promise<Product[]> {
  return await prisma.product.findMany({
    include: { redditStats: true },
  });
}
