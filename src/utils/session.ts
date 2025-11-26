import { cookies } from 'next/headers';
import { signToken, verifyToken, type JWTPayload } from './auth';
import { AUTH_CONFIG } from '@/configs/auth';
import { findUserById } from '@/lib/db';
import type { User } from '@/types/user';

export async function createSession(user: User): Promise<void> {
  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set(AUTH_CONFIG.COOKIE_NAME, token, AUTH_CONFIG.COOKIE_OPTIONS);
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_CONFIG.COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export async function getCurrentUser(): Promise<User | null> {
  const payload = await getSession();

  if (!payload) {
    return null;
  }

  const user = await findUserById(payload.userId);
  return user;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_CONFIG.COOKIE_NAME);
}
