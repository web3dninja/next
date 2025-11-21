import "dotenv/config";
import { PrismaClient } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

const initialUsers = [
  { name: "John Smith", email: "john.smith@example.com" },
  { name: "Sarah Johnson", email: "sarah.johnson@example.com" },
  { name: "Michael Brown", email: "michael.brown@example.com" },
  { name: "Emily Davis", email: "emily.davis@example.com" },
  { name: "David Wilson", email: "david.wilson@example.com" },
];

async function main() {
  console.log("🌱 Seeding users...");

  for (const user of initialUsers) {
    try {
      const created = await prisma.user.create({
        data: user,
      });
      console.log(`✅ Created user: ${created.name} (${created.email})`);
    } catch (error: any) {
      if (error.code === "P2002") {
        console.log(`⏭️  User already exists: ${user.email}`);
      } else {
        console.error(`❌ Error creating user ${user.email}:`, error.message);
      }
    }
  }

  console.log("✨ Users seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

