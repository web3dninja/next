// Users data and functions

import prisma from '@/lib/prisma';

export type Role = 'USER' | 'ADMIN';

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
}

// Data access functions
export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function getUser(id: number): Promise<User | null> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(
  id: number,
  data: Partial<Omit<User, 'id'>>,
): Promise<User | null> {
  try {
    return await prisma.user.update({
      where: { id },
      data,
    });
  } catch (error) {
    return null;
  }
}

export async function deleteUser(id: number): Promise<User | null> {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    return null;
  }
}
