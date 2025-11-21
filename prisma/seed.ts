import "dotenv/config";
import { execSync } from "child_process";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

async function main() {
  console.log("🌱 Seeding database (all)...\n");

  // Run users seed
  console.log("📝 Running users seed...");
  try {
    execSync("tsx prisma/seed-users.ts", { stdio: "inherit" });
  } catch (error) {
    console.error("❌ Users seed failed");
  }

  // Run posts seed
  console.log("\n📝 Running posts seed...");
  try {
    execSync("tsx prisma/seed-posts.ts", { stdio: "inherit" });
  } catch (error) {
    console.error("❌ Posts seed failed");
  }

  console.log("\n✨ All seeding completed!");
}

main().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});
