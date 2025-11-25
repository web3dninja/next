import { z } from 'zod';
import { AUTH_CONFIG } from './config';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(AUTH_CONFIG.USERNAME_MIN_LENGTH, `Username must be at least ${AUTH_CONFIG.USERNAME_MIN_LENGTH} characters`)
      .regex(/^\S+$/, 'Username must be a single word without spaces'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(AUTH_CONFIG.PASSWORD_MIN_LENGTH, `Password must be at least ${AUTH_CONFIG.PASSWORD_MIN_LENGTH} characters`),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
