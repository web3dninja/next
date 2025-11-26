import { PrismaClient } from '../../../prisma/generated/client';
import { Role, RoleEnum } from '@/types/user';

export async function checkAccess<T>(
  prisma: PrismaClient,
  userRole: Role,
  allowedRoles: Role[],
  operation: (prisma: PrismaClient) => Promise<T>,
): Promise<T> {
  if (!allowedRoles.includes(userRole)) {
    throw new Error(
      `Access denied: This action requires one of these roles: ${allowedRoles.join(', ')}. Your role: ${userRole}`,
    );
  }

  return await operation(prisma);
}

export async function requireAdmin<T>(
  prisma: PrismaClient,
  userRole: Role,
  operation: (prisma: PrismaClient) => Promise<T>,
): Promise<T> {
  return checkAccess(prisma, userRole, [RoleEnum.ADMIN], operation);
}

export async function requireModeratorOrAdmin<T>(
  prisma: PrismaClient,
  userRole: Role,
  operation: (prisma: PrismaClient) => Promise<T>,
): Promise<T> {
  return checkAccess(prisma, userRole, [RoleEnum.MODERATOR, RoleEnum.ADMIN], operation);
}
