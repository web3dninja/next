import { z } from 'zod';
import { PRODUCT_CONFIG } from '@/configs/product';

export const productSchema = z.object({
  categoryId: z.number().min(1, 'Category is required'),
  redditKeyword: z.string().min(1, 'Reddit keyword is required'),
  amazonProductId: z.string().min(1, 'Amazon Product ID is required'),
  link: z.string().url('Link must be a valid URL'),
});

export const productCreateSchema = productSchema;
export const productUpdateSchema = productSchema;

export type ProductFormData = z.infer<typeof productSchema>;

export const DEFAULT_PRODUCT_FORM_DATA: ProductFormData = {
  categoryId: 1,
  redditKeyword: '',
  amazonProductId: '',
  link: 'https://example.com/product',
};
