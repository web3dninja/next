import prisma from '@/utils/prisma';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function fillProductSlugs() {
  const productsWithoutSlug = await prisma.product.findMany({
    where: {
      slug: null,
    },
  });

  console.log(`Found ${productsWithoutSlug.length} products without slug`);

  for (const product of productsWithoutSlug) {
    let slug = generateSlug(product.name);
    let counter = 1;

    // Check if slug already exists
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${generateSlug(product.name)}-${counter}`;
      counter++;
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { slug },
    });

    console.log(`Updated product ${product.id}: "${product.name}" -> slug: "${slug}"`);
  }

  console.log('Done!');
}

fillProductSlugs()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
