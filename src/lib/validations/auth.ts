import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from '@/lib/schemas/auth';
import { findUserByEmail, findUserByUsername } from '@/lib/db/user';

export async function validateLogin(data: unknown): Promise<LoginFormData> {
  return loginSchema.parseAsync(data);
}

export async function validateRegister(data: unknown): Promise<RegisterFormData> {
  const validated = await registerSchema.parseAsync(data);

  const existingUserByEmail = await findUserByEmail(validated.email);
  if (existingUserByEmail) {
    throw new Error('User with this email already exists');
  }

  const existingUserByUsername = await findUserByUsername(validated.username);
  if (existingUserByUsername) {
    throw new Error('User with this username already exists');
  }

  return validated;
}
