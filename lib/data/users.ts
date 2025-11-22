// Users data and functions

import prisma from "@/lib/prisma";

export type Role = "USER" | "ADMIN";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}



// Data access functions
export async function getUsers(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users;
}

export async function getUser(id: number): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function addUser(user: Omit<User, "id" | "role"> & { role?: Role }): Promise<User> {
  const newUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      role: user.role ?? "USER",
    },
  });
  return newUser as User;
}

export async function updateUser(id: number, data: Partial<Omit<User, "id">>): Promise<User | null> {
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
