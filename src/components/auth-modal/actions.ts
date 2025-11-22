'use server';

import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { hashPassword, verifyPassword, signToken } from '@/lib/auth';
import { Role } from '@/lib/data/users';

export async function registerAction(data: {
  username: string;
  email: string;
  password: string;
  role: Role;
}) {
  if (!data.username || !data.email || !data.password) {
    return { error: 'All fields are required' };
  }

  if (data.password.length < 6) {
    return { error: 'Password must be at least 6 characters' };
  }

  const existingUserByEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUserByEmail) {
    return { error: 'User with this email already exists' };
  }

  const existingUserByUsername = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (existingUserByUsername) {
    return { error: 'User with this username already exists' };
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });

  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

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
  if (!data.email || !data.password) {
    throw new Error('Email and password are required');
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await verifyPassword(data.password, user.password);

  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  return user;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  return { success: true };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  const { verifyToken } = await import('@/lib/auth');
  const payload = verifyToken(token);

  if (!payload) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  });

  return user;
}
