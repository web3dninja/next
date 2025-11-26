import { z } from 'zod';
import { USER_CONFIG } from '@/configs/user';
import { RoleEnum } from '@/types/user';

export const userSchema = z.object({
  username: z.string().min(USER_CONFIG.VALIDATION.USERNAME_MIN_LENGTH, 'Username is required'),
  email: z.email('Invalid email address'),
  role: z.enum(RoleEnum),
});

export const userCreateSchema = userSchema.extend({
  password: z
    .string()
    .min(
      USER_CONFIG.VALIDATION.PASSWORD_MIN_LENGTH,
      `Password must be at least ${USER_CONFIG.VALIDATION.PASSWORD_MIN_LENGTH} characters`,
    ),
});

export const userUpdateSchema = userSchema.extend({
  password: z.string().min(USER_CONFIG.VALIDATION.PASSWORD_MIN_LENGTH).optional().or(z.literal('')),
});

export type UserFormData = z.infer<typeof userSchema>;
export type UserCreateFormData = z.infer<typeof userCreateSchema>;
export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
