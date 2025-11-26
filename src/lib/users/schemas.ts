import { z } from 'zod';
import { USER_CONFIG } from './config';

export const userSchema = z.object({
  username: z.string().min(USER_CONFIG.VALIDATION.USERNAME_MIN_LENGTH, 'Username is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['USER', 'MODERATOR', 'ADMIN']),
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
  password: z
    .string()
    .min(USER_CONFIG.VALIDATION.PASSWORD_MIN_LENGTH)
    .optional()
    .or(z.literal('')),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type UserFormData = z.infer<typeof userSchema>;
export type UserCreateFormData = z.infer<typeof userCreateSchema>;
export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
