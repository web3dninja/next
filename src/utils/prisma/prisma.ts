import { PrismaClient } from '../../../prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { requireAdmin, requireModeratorOrAdmin, checkAccess } from './permissions';
import { getCurrentUserAction } from '@/actions/user';
import { Role } from '@/types/user';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const basePrisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = basePrisma;

export async function withAdmin<T>(operation: (prisma: PrismaClient) => Promise<T>): Promise<T> {
  const user = await getCurrentUserAction();

  if (!user) {
    throw new Error('Authentication required');
  }

  return await requireAdmin(basePrisma, user.role, operation);
}

export async function withModeratorOrAdmin<T>(
  operation: (prisma: PrismaClient) => Promise<T>,
): Promise<T> {
  const user = await getCurrentUserAction();

  if (!user) {
    throw new Error('Authentication required');
  }

  return await requireModeratorOrAdmin(basePrisma, user.role, operation);
}

export async function withRoles<T>(
  allowedRoles: Role[],
  operation: (prisma: PrismaClient) => Promise<T>,
): Promise<T> {
  const user = await getCurrentUserAction();

  if (!user) {
    throw new Error('Authentication required');
  }

  return await checkAccess(basePrisma, user.role, allowedRoles, operation);
}

export default basePrisma;
