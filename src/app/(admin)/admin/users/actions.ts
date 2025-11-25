'use server';

import { revalidatePath } from 'next/cache';
import { deleteUserById, User } from '@/lib/data/users';

export async function deleteUserAction(id: number): Promise<User | null> {
  if (!id) {
    throw new Error('ID is required');
  }

  const user = await deleteUserById(id);

  if (!user) {
    throw new Error('User not found');
  }

  revalidatePath('/users');

  return user;
}
