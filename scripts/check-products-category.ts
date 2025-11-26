import prisma from '@/utils/prisma';

async function checkProductsCategory() {
  const productsWithoutCategory = await prisma.product.findMany({
    where: {
      categoryId: null,
    },
  });

  console.log(`Found ${productsWithoutCategory.length} products without categoryId`);

  if (productsWithoutCategory.length > 0) {
    console.log('\nProducts without category:');
    productsWithoutCategory.forEach(product => {
      console.log(`  - ID: ${product.id}, Name: ${product.name}`);
    });
  }
}

checkProductsCategory()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
