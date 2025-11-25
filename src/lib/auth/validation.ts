import { getUserByEmail, getUserByUsername } from '@/lib/data/users';
import { AUTH_CONFIG } from './config';

export async function validateRegistrationData(data: {
  username: string;
  email: string;
  password: string;
}) {
  if (!data.username || !data.email || !data.password) {
    throw new Error('All fields are required');
  }

  if (data.password.length < AUTH_CONFIG.PASSWORD_MIN_LENGTH) {
    throw new Error(`Password must be at least ${AUTH_CONFIG.PASSWORD_MIN_LENGTH} characters`);
  }

  const existingUserByEmail = await getUserByEmail(data.email);
  if (existingUserByEmail) {
    throw new Error('User with this email already exists');
  }

  const existingUserByUsername = await getUserByUsername(data.username);
  if (existingUserByUsername) {
    throw new Error('User with this username already exists');
  }
}

export async function validateLoginData(data: { email: string; password: string }) {
  if (!data.email || !data.password) {
    throw new Error('Email and password are required');
  }

  const user = await getUserByEmail(data.email, true);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  return user;
}
