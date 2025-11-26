import basePrisma, { withAdmin } from '@/lib/prisma';
import type { User, UserWithPassword, CreateUserInput } from '@/types/user.type';
import type { UserCreateFormData, UserUpdateFormData } from './schemas';

export async function findAllUsers(): Promise<User[]> {
  return await basePrisma.user.findMany({ omit: { password: true } });
}

export async function findUserById(id: number): Promise<User | null> {
  return await basePrisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });
}

export async function findUserByEmail(
  email: string,
  withPassword: true,
): Promise<UserWithPassword | null>;
export async function findUserByEmail(email: string, withPassword?: false): Promise<User | null>;
export async function findUserByEmail(
  email: string,
  withPassword: boolean = false,
): Promise<User | UserWithPassword | null> {
  return await basePrisma.user.findUnique({
    where: { email },
    omit: { password: !withPassword },
  });
}

export async function findUserByUsername(username: string): Promise<User | null> {
  return await basePrisma.user.findUnique({
    where: { username },
    omit: { password: true },
  });
}

export async function createUser(data: UserCreateFormData): Promise<User> {
  return await withAdmin(async prisma => {
    return await prisma.user.create({
      data,
      omit: { password: true },
    });
  });
}

export async function updateUserById(id: number, data: Partial<UserUpdateFormData>): Promise<User> {
  return await withAdmin(async prisma => {
    const updateData = { ...data };
    if (!updateData.password) {
      delete updateData.password;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      omit: { password: true },
    });

    return updatedUser;
  });
}

export async function deleteUserById(id: number): Promise<User> {
  return await withAdmin(async prisma => {
    return await prisma.user.delete({
      where: { id },
      omit: { password: true },
    });
  });
}
