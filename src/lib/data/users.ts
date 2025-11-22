// Users data and functions

import prisma from '@/lib/prisma';
import type { User, UserWithPassword, CreateUserInput } from '@/types/user.type';
import { RoleEnum } from '@/types/user.type';

export type { User, UserWithPassword, CreateUserInput };
export { RoleEnum };

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany({ omit: { password: true } });
}

export async function getUserById(id: number): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });
}

export async function getUserByEmail(
  email: string,
  withPassword: true,
): Promise<UserWithPassword | null>;
export async function getUserByEmail(email: string, withPassword?: false): Promise<User | null>;
export async function getUserByEmail(
  email: string,
  withPassword: boolean = false,
): Promise<User | UserWithPassword | null> {
  return await prisma.user.findUnique({
    where: { email },
    omit: { password: !withPassword },
  });
}

export async function getUserByUsername(username: string): Promise<User | UserWithPassword | null> {
  return await prisma.user.findUnique({
    where: { username },
    omit: { password: true },
  });
}

export async function deleteUserById(id: number): Promise<User | null> {
  return await prisma.user.delete({
    where: { id },
    omit: { password: true },
  });
}

export async function createUser(data: Omit<User, 'id'> & { password: string }): Promise<User> {
  return await prisma.user.create({
    data,
    omit: { password: true },
  });
}
