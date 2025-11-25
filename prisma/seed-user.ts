import 'dotenv/config';
import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hashPassword } from '../src/components/auth-modal/auth.util';
import { UserCreateInput } from './generated/models';
import { RoleEnum } from '@/types/user.type';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  throw new Error(
    'ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables',
  );
}

const createAdminUser: UserCreateInput = {
  username: process.env.ADMIN_USERNAME,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: 'ADMIN',
};

// const createAdminUser: UserCreateInput = {
//   username: 'modarator',
//   email: 'modarator@example.com',
//   password: 'password',
//   role: RoleEnum.MODERATOR,
// };

async function seedAdminUser() {
  console.log('🌱 Seeding users...');

  try {
    const hashedPassword = await hashPassword(createAdminUser.password);
    const created = await prisma.user.create({
      data: { ...createAdminUser, password: hashedPassword },
    });
    console.log(`✅ Created user: ${created.username} (${created.email}) - Role: ${created.role}`);
  } catch (error: any) {
    console.error(`❌ Error creating user ${createAdminUser.email}:`, error.message);
  }
}

seedAdminUser();
