"use server";

import { revalidatePath } from "next/cache";
import { addUser, updateUser, deleteUser } from "@/lib/data";


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
