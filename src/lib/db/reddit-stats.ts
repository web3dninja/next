import basePrisma from '@/utils/prisma';
import { fetchRedditStats } from '@/lib/services/reddit';
import { REDDIT_KEYWORD_DELIMITER } from '@/lib/services/reddit/constants';
import type { UpdateResult, UpdateAllResult } from '@/lib/services/reddit/types';

type PrismaClient = typeof basePrisma;
type RedditStats = {
  id: number;
  keyword: string;
  mentions: number;
  positiveScore: number;
  negativeScore: number;
  rank: number;
  updatedAt: Date;
};

export async function findRedditStatsByKeyword(keyword: string): Promise<RedditStats | null> {
  return await basePrisma.redditStats.findUnique({
    where: { keyword },
  });
}

export async function countProductsByKeyword(keyword: string): Promise<number> {
  return await basePrisma.product.count({
    where: { redditKeyword: keyword },
  });
}

// Command functions
export async function createRedditStats(
  prisma: PrismaClient,
  keyword: string,
): Promise<RedditStats> {
  const keywords = keyword.split(REDDIT_KEYWORD_DELIMITER).filter(Boolean);
  const redditData = await fetchRedditStats(keywords);

  return await prisma.redditStats.create({
    data: {
      keyword,
      mentions: redditData.mentions,
      positiveScore: redditData.positiveScore,
      negativeScore: redditData.negativeScore,
      rank: redditData.rank,
    },
  });
}

export async function deleteRedditStats(prisma: PrismaClient, keyword: string): Promise<void> {
  await prisma.redditStats.delete({
    where: { keyword },
  });
}

export async function ensureRedditStats(prisma: PrismaClient, keyword: string): Promise<void> {
  const existingStats = await findRedditStatsByKeyword(keyword);

  if (!existingStats) {
    await createRedditStats(prisma, keyword);
  }
}

export async function cleanupOrphanRedditStats(keyword: string): Promise<void> {
  const productsCount = await countProductsByKeyword(keyword);

  if (productsCount === 0) {
    try {
      await deleteRedditStats(basePrisma, keyword);
    } catch {}
  }
}

export async function updateRedditKeyword(
  prisma: PrismaClient,
  oldKeyword: string | undefined,
  newKeyword: string,
): Promise<void> {
  const shouldUpdate = oldKeyword && newKeyword && oldKeyword !== newKeyword;

  if (shouldUpdate) {
    await ensureRedditStats(prisma, newKeyword);
    await cleanupOrphanRedditStats(oldKeyword);
  }
}

export async function updateAllRedditStats(): Promise<UpdateAllResult> {
  const stats = await basePrisma.redditStats.findMany({
    where: {
      OR: [
        { mentions: 0 },
        {
          updatedAt: {
            lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      ],
    },
  });

  const results: UpdateResult[] = [];

  for (const stat of stats) {
    try {
      const keywords = stat.keyword
        .split(REDDIT_KEYWORD_DELIMITER)
        .map(keyword => keyword.trim())
        .filter(Boolean);
      const redditData = await fetchRedditStats(keywords);

      await basePrisma.redditStats.update({
        where: { keyword: stat.keyword },
        data: {
          mentions: redditData.mentions,
          positiveScore: redditData.positiveScore,
          negativeScore: redditData.negativeScore,
          rank: redditData.rank,
        },
      });

      results.push({
        keyword: stat.keyword,
        status: 'updated',
        data: redditData,
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      results.push({
        keyword: stat.keyword,
        status: 'error',
        error: String(error),
      });
    }
  }

  return {
    success: true,
    updated: results.filter(r => r.status === 'updated').length,
    errors: results.filter(r => r.status === 'error').length,
    results,
  };
}
