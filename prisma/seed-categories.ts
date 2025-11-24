import 'dotenv/config';

import prisma from '../src/lib/prisma';

async function seedCategories() {
  console.log('🌱 Seeding categories...');

  // Create category tree
  const electronics = await prisma.category.create({
    data: { name: 'Electronics', slug: 'electronics' },
  });

  const kitchen = await prisma.category.create({
    data: { name: 'Kitchen Electronics', slug: 'kitchen-electronics', parentId: electronics.id },
  });

  const airFryers = await prisma.category.create({
    data: { name: 'Air Fryers', slug: 'air-fryers', parentId: kitchen.id },
  });

  console.log('✅ Categories created:', {
    electronics: electronics.id,
    kitchen: kitchen.id,
    airFryers: airFryers.id,
  });

  // Update all products to Air Fryers category
  const result = await prisma.product.updateMany({
    data: { categoryId: airFryers.id },
  });

  console.log(`✅ Updated ${result.count} products with categoryId: ${airFryers.id}`);
}

seedCategories()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
