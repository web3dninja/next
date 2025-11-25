import basePrisma, { withAdmin } from '@/lib/prisma';
import { fetchRedditStats } from '@/lib/services/reddit';
import { Category } from './category';
import { REDDIT_KEYWORD_DELIMITER } from '@/lib/services/reddit/constants';

export interface Product {
  id: number;
  name: string;
  slug: string | null;
  brand: string;
  description: string;
  price: string;
  link: string;
  image: string;
  categoryId: number | null;
  category: Category | null;
  redditKeyword: string;
  redditStats: RedditStats | null;
}

export type ProductCreateInput = Omit<Product, 'id' | 'redditStats' | 'category'>;

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
  return await basePrisma.product.findMany({
    include: { redditStats: true, category: true },
  });
}

export async function getProductById(id: number): Promise<Product | null> {
  return await basePrisma.product.findUnique({
    where: { id },
    include: { redditStats: true, category: true },
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await basePrisma.product.findUnique({
    where: { slug },
    include: { redditStats: true, category: true },
  });
}

export async function getProductsByCategoryIds(categoryIds: number[]): Promise<Product[]> {
  return await basePrisma.product.findMany({
    where: { categoryId: { in: categoryIds } },
    include: { redditStats: true, category: true },
  });
}

export async function addProduct(product: ProductCreateInput): Promise<Product | null> {
  const normalizedKeyword = product.redditKeyword.toLowerCase().trim();

  return await withAdmin(async prisma => {
    const existingStats = await basePrisma.redditStats.findUnique({
      where: { keyword: normalizedKeyword },
    });

    if (!existingStats) {
      const keywords = normalizedKeyword.split(REDDIT_KEYWORD_DELIMITER).filter(Boolean);
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
        slug: product.slug,
        brand: product.brand,
        description: product.description,
        price: product.price,
        link: product.link,
        image: product.image,
        categoryId: product.categoryId,
        redditKeyword: normalizedKeyword,
      },
      include: { redditStats: true, category: true },
    });

    return newProduct;
  });
}

export async function updateProduct(id: number, data: ProductCreateInput): Promise<Product> {
  return await withAdmin(async prisma => {
    const currentProduct = await basePrisma.product.findUnique({
      where: { id },
    });

    const oldKeyword = currentProduct?.redditKeyword;
    const normalizedKeyword = data.redditKeyword.toLowerCase().trim();
    const newKeyword = normalizedKeyword;

    if (oldKeyword && newKeyword && oldKeyword !== newKeyword) {
      const existingStats = await basePrisma.redditStats.findUnique({
        where: { keyword: newKeyword },
      });

      if (!existingStats) {
        const keywords = newKeyword
          .split(REDDIT_KEYWORD_DELIMITER)
          .map(keyword => keyword.trim())
          .filter(Boolean);
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
        name: data.name,
        brand: data.brand,
        description: data.description,
        price: data.price,
        link: data.link,
        slug: data.slug,
        image: data.image,
        categoryId: data.categoryId,
        redditKeyword: normalizedKeyword,
      },
    });

    if (oldKeyword && newKeyword && oldKeyword !== newKeyword) {
      await cleanupOrphanRedditStats(oldKeyword);
    }

    const updatedProduct = await basePrisma.product.findUnique({
      where: { id },
      include: { redditStats: true, category: true },
    });

    if (!updatedProduct) {
      throw new Error(`Product with id ${id} not found after update`);
    }

    return updatedProduct;
  });
}

export async function deleteProduct(id: number): Promise<Product> {
  return await withAdmin(async prisma => {
    const product = await basePrisma.product.findUnique({
      where: { id },
    });

    const deletedProduct = await prisma.product.delete({
      where: { id },
      include: { redditStats: true, category: true },
    });

    if (product?.redditKeyword) {
      await cleanupOrphanRedditStats(product.redditKeyword);
    }

    return deletedProduct;
  });
}

async function cleanupOrphanRedditStats(keyword: string): Promise<void> {
  const productsWithKeyword = await basePrisma.product.count({
    where: { redditKeyword: keyword },
  });

  if (productsWithKeyword === 0) {
    try {
      await basePrisma.redditStats.delete({
        where: { keyword },
      });
    } catch {}
  }
}
