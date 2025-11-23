import 'dotenv/config';
import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

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
    name: 'Nuwave Brio 15.5Qt Air Fryer',
    brand: 'Nuwave',
    description: `10-IN-1 FUNCTIONALITY & 100 PRE-PROGRAMMED MENU PRESETS – Brio provides versatile functionality: Air Fry, Rotisserie, Grill, Roast, Reheat, Broil, Defrost, Dehydrate, Bake, Keep Warm, Proof. It is also programmed with 100 pre-programmed menu presets and additional 50 memory slots where you can save and recall your own favorite recipes. Perfect for busy households on the go!
LARGE CAPACITY FOR FAMILY SIZE - Features 4 rack positions and 7 cooking accessories, including Reversible Non-Stick Grill & Griddle, Rotisserie Basket & Skewer, Stainless-Steel Mesh Rack & Mesh Tray, Digital Temperature Probe, Drip Tray. The 15.5Qt large capacity makes cooking delicious meals for the entire family now easy. It’s the perfect combination of large capacity and function versatility.
POWERFUL CONVECTION FAN & SMOKELESS`,
    price: '160.99',
    link: 'https://www.amazon.com/dp/B085LT31HP?&linkCode=ll1&tag=techproductsvl-20&linkId=ce86cbdff0fcc44c3973dc7e4d2119d8&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/81ocyRbwcIL._AC_SL1500_.jpg',
    category: 'Electronics',
    redditKeyword: 'AirFryer',
  },
];

async function seedProducts() {
  console.log('🌱 Seeding products...');

  for (const product of products) {
    try {
      const created = await prisma.product.create({
        data: product,
      });
      console.log(`✅ Created product: ${created.name} (${created.brand}) - $${created.price}`);
    } catch (error: any) {
      console.error(`❌ Error creating product ${product.name}:`, error.message);
    }
  }

  console.log('🎉 Products seeding completed!');
}

seedProducts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
