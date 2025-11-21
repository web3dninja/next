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

const initialPosts = [
  {
    title: "Introduction to Next.js",
    content: "Next.js is a React framework for production...",
    published: true,
  },
  {
    title: "Server Components",
    content: "Server Components allow you to render components on the server...",
    published: true,
  },
  {
    title: "App Router",
    content: "App Router is a new way of routing in Next.js 13+...",
    published: true,
  },
];

async function main() {
  console.log("🌱 Seeding posts...");

  for (const post of initialPosts) {
    try {
      const created = await prisma.post.create({
        data: post,
      });
      console.log(`✅ Created post: ${created.title} (ID: ${created.id})`);
    } catch (error: any) {
      if (error.code === "P2002") {
        console.log(`⏭️  Post already exists: ${post.title}`);
      } else {
        console.error(`❌ Error creating post ${post.title}:`, error.message);
      }
    }
  }

  console.log("✨ Posts seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

