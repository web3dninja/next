import 'dotenv/config';

import { execSync } from 'child_process';
import { PrismaClient } from '../prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

type Backup = {
  users: any[];
  categories: any[];
  redditStats: any[];
  products: any[];
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const adapter = new PrismaPg({
    connectionString,
  });

  return new PrismaClient({ adapter });
}

async function exportData(prisma: PrismaClient): Promise<Backup> {
  const [users, categories, redditStats, products] = await Promise.all([
    prisma.user.findMany(),
    prisma.category.findMany(),
    prisma.redditStats.findMany(),
    prisma.product.findMany(),
  ]);

  return {
    users,
    categories,
    redditStats,
    products,
  };
}

async function importData(prisma: PrismaClient, backup: Backup) {
  if (backup.users.length) {
    for (const user of backup.users) {
      await prisma.user.create({
        data: user,
      });
    }
  }

  if (backup.redditStats.length) {
    for (const stat of backup.redditStats) {
      await prisma.redditStats.create({
        data: stat,
      });
    }
  }

  if (backup.categories.length) {
    for (const category of backup.categories) {
      await prisma.category.create({
        data: category,
      });
    }
  }

  if (backup.products.length) {
    for (const product of backup.products) {
      await prisma.product.create({
        data: product,
      });
    }
  }
}

async function main() {
  console.log('📦 Exporting existing data from database...');
  const prismaBefore = createPrismaClient();
  const backup = await exportData(prismaBefore);
  await prismaBefore.$disconnect();

  console.log('🧨 Resetting database and applying migrations...');
  execSync('npx prisma migrate reset --force', {
    stdio: 'inherit',
  });

  execSync('npx prisma migrate dev --name init', {
    stdio: 'inherit',
  });

  console.log('📥 Re-importing data into fresh schema...');
  const prismaAfter = createPrismaClient();
  await importData(prismaAfter, backup);
  await prismaAfter.$disconnect();

  console.log('✅ Done: migrations applied and data restored');
}

main().catch(async error => {
  console.error('Error running migrate-with-backup:', error);
  process.exit(1);
});


