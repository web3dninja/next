import { z } from 'zod';
import { CATEGORY_CONFIG } from '@/configs/category';

export const categorySchema = z.object({
  name: z.string().min(CATEGORY_CONFIG.VALIDATION.NAME_MIN_LENGTH, 'Name is required'),
  slug: z.string().min(CATEGORY_CONFIG.VALIDATION.SLUG_MIN_LENGTH, 'Slug is required'),
  icon: z.string().nullable(),
  parentId: z.number().nullable(),
});

export const categoryCreateSchema = categorySchema;
export const categoryUpdateSchema = categorySchema;

export type CategoryFormData = z.infer<typeof categorySchema>;
