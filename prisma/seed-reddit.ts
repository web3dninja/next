import 'dotenv/config';

import prisma from '@/utils/prisma';
import { fetchRedditStats, REDDIT_KEYWORD_DELIMITER } from '@/lib/services';

const KEYWORD_GROUPS = [
  {
    keywords: ['xiaomi mi smart band 10'],
  },
];

type SeedResult = {
  keyword: string;
  mentions: number;
  positiveScore: number;
  negativeScore: number;
  rank: number;
};

async function upsertRedditStats(keywords: string[]): Promise<SeedResult | null> {
  const normalizedKeywords = keywords.map(k => k.trim()).filter(Boolean);

  if (normalizedKeywords.length === 0) {
    console.warn('Skipped empty keyword set');
    return null;
  }

  const keywordKey = normalizedKeywords.join(REDDIT_KEYWORD_DELIMITER);
  const redditData = await fetchRedditStats(normalizedKeywords);

  await prisma.redditStats.upsert({
    where: { keyword: keywordKey },
    update: {
      mentions: redditData.mentions,
      positiveScore: redditData.positiveScore,
      negativeScore: redditData.negativeScore,
      rank: redditData.rank,
    },
    create: {
      keyword: keywordKey,
      mentions: redditData.mentions,
      positiveScore: redditData.positiveScore,
      negativeScore: redditData.negativeScore,
      rank: redditData.rank,
    },
  });

  return {
    keyword: keywordKey,
    mentions: redditData.mentions,
    positiveScore: redditData.positiveScore,
    negativeScore: redditData.negativeScore,
    rank: redditData.rank,
  };
}

async function main() {
  console.info('Seeding Reddit stats for keyword groups...');

  for (const group of KEYWORD_GROUPS) {
    console.info(`Fetching stats for ${group.keywords.join(', ')}`);
    try {
      const result = await upsertRedditStats(group.keywords);
      if (result) {
        console.info('Updated', result);
      }
    } catch (error) {
      console.error(`Failed for ${group.keywords.join(', ')}`, error);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await prisma.$disconnect();
}

main().catch(error => {
  console.error(error);
  prisma.$disconnect().finally(() => process.exit(1));
});
