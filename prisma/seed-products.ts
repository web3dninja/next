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
POWERFUL CONVECTION FAN & SMOKELESS – Brio is an air fryer oven with a powerful 5-inch convection fan. It’s top mounted and promotes unrivaled cyclonic convection circulation for fast, even, extra-crispy cooking while remaining smokeless, saving you precious time in the kitchen.
MAKE PRECISE ADJUSTMENTS ON-THE-FLY & DIGITAL CONTROLS - Set cook temperatures from 50°F to 425°F adjustable in precise 5°F increments. Control time and temperature any time in the cooking process that never turns off while cooking, unlike the primitive methods that regulate temperature by turning the heater on and off. Want a hotter temperature or need to cook it longer? Simply adjust on-the-fly any time. Brio’s intuitive digital controls are easy to operate.
DELICIOUS ROTISSERIE & GRILL – Self-basting rotation browns the whole chicken sealing in the flavors while unwanted fats drip away. You can also tumble fry vegetables or French fries to perfection. Get inspired & create your own masterpieces.`,
    price: '160.99',
    link: 'https://www.amazon.com/dp/B085LT31HP?&linkCode=ll1&tag=techproductsvl-20&linkId=ce86cbdff0fcc44c3973dc7e4d2119d8&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/81ocyRbwcIL._AC_SL1500_.jpg',
    category: 'Electronics',
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
