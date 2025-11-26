'use server';

import { revalidatePath } from 'next/cache';
import { hashPassword, verifyPassword } from '@/utils/auth';
import { createSession, getCurrentUser, destroySession } from '@/utils/session';
import { createUser, findUserByEmail, deleteUserById } from '@/lib/db';
import { validateRegister, validateLogin } from '@/lib/validations';
import { USER_CONFIG } from '@/configs/user';
import { type User, RoleEnum } from '@/types/user';

export async function getCurrentUserAction(): Promise<User | null> {
  return await getCurrentUser();
}

export async function registerUserAction(data: unknown) {
  const validated = await validateRegister(data);

  const hashedPassword = await hashPassword(validated.password);

  const user = await createUser({
    username: validated.username,
    email: validated.email,
    password: hashedPassword,
    role: RoleEnum.USER,
  });

  await createSession(user);

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
}

export async function loginAction(data: unknown) {
  const validated = await validateLogin(data);

  const user = await findUserByEmail(validated.email, true);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await verifyPassword(validated.password, user.password);

  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  await createSession(user);
}

export async function deleteUserAction(id: number): Promise<User | null> {
  if (!id) {
    throw new Error('ID is required');
  }

  const user = await deleteUserById(id);

  if (!user) {
    throw new Error('User not found');
  }

  revalidatePath(USER_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);

  return user;
}

export async function logoutAction() {
  await destroySession();
}
