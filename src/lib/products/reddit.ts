import basePrisma from '@/lib/prisma';
import { fetchRedditStats } from '@/lib/services/reddit';
import { REDDIT_KEYWORD_DELIMITER } from '@/lib/services/reddit/constants';
import { normalizeRedditKeyword } from './validation';

type PrismaClient = typeof basePrisma;

export async function ensureRedditStats(
  prisma: PrismaClient,
  keyword: string,
): Promise<void> {
  const normalizedKeyword = normalizeRedditKeyword(keyword);

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
}

export async function cleanupOrphanRedditStats(keyword: string): Promise<void> {
  const productsWithKeyword = await basePrisma.product.count({
    where: { redditKeyword: keyword },
  });

  if (productsWithKeyword === 0) {
    try {
      await basePrisma.redditStats.delete({
        where: { keyword },
      });
    } catch {
      // Ignore deletion errors for orphan stats
    }
  }
}

export async function updateRedditKeyword(
  prisma: PrismaClient,
  oldKeyword: string | undefined,
  newKeyword: string,
): Promise<void> {
  const normalizedNewKeyword = normalizeRedditKeyword(newKeyword);

  if (oldKeyword && normalizedNewKeyword && oldKeyword !== normalizedNewKeyword) {
    await ensureRedditStats(prisma, normalizedNewKeyword);
    await cleanupOrphanRedditStats(oldKeyword);
  }
}
