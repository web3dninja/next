import 'dotenv/config';
import prisma from '../src/lib/prisma';

async function addCategories() {
  console.log('Adding new categories...');

  // Get Electronics parent category
  const electronics = await prisma.category.findUnique({
    where: { slug: 'electronics' },
  });

  if (!electronics) {
    console.error('Electronics category not found!');
    return;
  }

  // Create Coffee Makers category
  const coffeeMakers = await prisma.category.upsert({
    where: { slug: 'coffee-makers' },
    update: {},
    create: {
      name: 'Coffee Makers',
      slug: 'coffee-makers',
      parentId: electronics.id,
    },
  });

  // Create Home Speakers category
  const homeSpeakers = await prisma.category.upsert({
    where: { slug: 'home-speakers' },
    update: {},
    create: {
      name: 'Home Speakers',
      slug: 'home-speakers',
      parentId: electronics.id,
    },
  });

  console.log('✅ Categories created:', {
    coffeeMakers: coffeeMakers.id,
    homeSpeakers: homeSpeakers.id,
  });

  // Update products with appropriate categories
  // Coffee makers
  const coffeeMakerProducts = await prisma.product.updateMany({
    where: {
      OR: [
        { name: { contains: 'Coffee', mode: 'insensitive' } },
        { name: { contains: 'Keurig', mode: 'insensitive' } },
      ],
    },
    data: { categoryId: coffeeMakers.id },
  });

  console.log(`✅ Updated ${coffeeMakerProducts.count} coffee maker products`);

  // Home speakers
  const homeSpeakerProducts = await prisma.product.updateMany({
    where: {
      OR: [
        { name: { contains: 'Speaker', mode: 'insensitive' } },
        { brand: { contains: 'Marshall', mode: 'insensitive' } },
      ],
    },
    data: { categoryId: homeSpeakers.id },
  });

  console.log(`✅ Updated ${homeSpeakerProducts.count} home speaker products`);

  console.log('Done!');
}

addCategories()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
