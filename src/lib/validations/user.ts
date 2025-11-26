import {
  userCreateSchema,
  userUpdateSchema,
  type UserCreateFormData,
  type UserUpdateFormData,
} from '@/lib/schemas';
import { findUserByEmail, findUserByUsername } from '@/lib/db';

export async function validateUserCreate(data: unknown): Promise<UserCreateFormData> {
  const validated = await userCreateSchema.parseAsync(data);

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

export async function validateUserUpdate(
  data: unknown,
  currentUserId?: number,
): Promise<UserUpdateFormData> {
  const validated = await userUpdateSchema.parseAsync(data);

  if (validated.email) {
    const existingUserByEmail = await findUserByEmail(validated.email);
    if (existingUserByEmail && existingUserByEmail.id !== currentUserId) {
      throw new Error('User with this email already exists');
    }
  }

  if (validated.username) {
    const existingUserByUsername = await findUserByUsername(validated.username);
    if (existingUserByUsername && existingUserByUsername.id !== currentUserId) {
      throw new Error('User with this username already exists');
    }
  }

  return validated;
}
