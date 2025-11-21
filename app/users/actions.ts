"use server";

import { revalidatePath } from "next/cache";
import { addUser, updateUser, deleteUser } from "@/lib/data";


export async function createUserAction(data: { name: string; email: string }) {
  if (!data.name || !data.email) {
    throw new Error("Name and email are required");
  }

  const user = await addUser(data);
  revalidatePath("/users");

  return user;
}

export async function updateUserAction(
  id: number,
  data: { name: string; email: string }
) {
  if (!id) {
    throw new Error("ID is required");
  }

  if (!data.name || !data.email) {
    throw new Error("Name and email are required");
  }

  const user = await updateUser(id, data);

  if (!user) {
    throw new Error("User not found");
  }

  revalidatePath("/users");
  revalidatePath(`/users/${id}`);

  return user;
}


export async function deleteUserAction(id: number) {
  if (!id) {
    throw new Error("ID is required");
  }

  const user = await deleteUser(id);

  if (!user) {
    throw new Error("User not found");
  }

  revalidatePath("/users");

  return user;
}
