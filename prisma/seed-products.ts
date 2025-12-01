import 'dotenv/config';

import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { fetchRedditStats } from '../src/lib/services/reddit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

const products = [
  {
    amazonProductId: 'B085LT31HP',
    link: 'https://www.amazon.com/dp/B085LT31HP?&linkCode=ll1&tag=techproductsvl-20&linkId=ce86cbdff0fcc44c3973dc7e4d2119d8&language=en_US&ref_=as_li_ss_tl',
    categoryId: 3,
    redditKeyword: 'nuwave airfryer&nuwave-air&fryer&nuwave nuwave',
  },
];

async function seedProducts() {
  console.log('🌱 Seeding products...');

  for (const product of products) {
    try {
      const normalizedKeyword = product.redditKeyword.toLowerCase().trim();

      let existingStats = await prisma.redditStats.findUnique({
        where: { keyword: normalizedKeyword },
      });

      if (!existingStats) {
        const keywords = normalizedKeyword
          .split('&')
          .filter(Boolean)
          .map(k => k.trim());

        console.log(`Fetching Reddit stats for keywords: ${keywords.join(', ')}`);
        const redditData = await fetchRedditStats(keywords);

        existingStats = await prisma.redditStats.create({
          data: {
            keyword: normalizedKeyword,
            mentions: redditData.mentions,
            positiveScore: redditData.positiveScore,
            negativeScore: redditData.negativeScore,
            rank: redditData.rank,
          },
        });

        console.log(
          `📊 Created RedditStats: mentions=${redditData.mentions}, positive=${redditData.positiveScore}%, rank=${redditData.rank}`,
        );
      }

      // Then create product
      const created = await prisma.product.create({
        data: {
          ...product,
          amazonProductId: product.amazonProductId,
          link: product.link,
          redditKeyword: normalizedKeyword,
        },
      });

      console.log(`✅ Created product: ${created.amazonProductId} (${created.link})`);
    } catch (error: any) {
      console.error(`❌ Error creating product ${product.amazonProductId}:`, error.message);
    }
  }

  console.log('🎉 Products seeding completed!');
}

seedProducts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
