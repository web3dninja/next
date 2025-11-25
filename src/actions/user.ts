'use server';

import { hashPassword, verifyPassword } from '@/lib/auth/utils';
import { createSession, getCurrentUser, destroySession } from '@/lib/auth/session';
import { validateRegistrationData, validateLoginData } from '@/lib/auth/validation';
import { createUser, type CreateUserInput, type User } from '@/lib/data/users';

export async function getCurrentUserAction(): Promise<User | null> {
  return await getCurrentUser();
}

export async function registerUserAction(data: CreateUserInput) {
  await validateRegistrationData(data);

  const hashedPassword = await hashPassword(data.password);

  const user = await createUser({
    username: data.username,
    email: data.email,
    password: hashedPassword,
    role: data.role,
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

export async function loginAction(data: { email: string; password: string }) {
  const user = await validateLoginData(data);

  const isValid = await verifyPassword(data.password, user.password);

  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  await createSession(user);
}

export async function logoutAction() {
  await destroySession();
}
