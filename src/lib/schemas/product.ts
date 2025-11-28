import { z } from 'zod';
import { PRODUCT_CONFIG } from '@/configs/product';

export const productSchema = z.object({
  name: z.string().min(PRODUCT_CONFIG.VALIDATION.NAME_MIN_LENGTH, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  brand: z.string().min(PRODUCT_CONFIG.VALIDATION.BRAND_MIN_LENGTH, 'Brand is required'),
  description: z
    .string()
    .min(PRODUCT_CONFIG.VALIDATION.DESCRIPTION_MIN_LENGTH, 'Description is required'),
  price: z.number().positive('Price must be a positive number'),
  link: z.url('Invalid URL').min(1, 'Link is required'),
  image: z.url('Invalid image URL').min(1, 'Image URL is required'),
  categoryId: z.number().min(1, 'Category is required'),
  redditKeyword: z.string().min(1, 'Reddit keyword is required'),
});

export const productCreateSchema = productSchema;
export const productUpdateSchema = productSchema;

export type ProductFormData = z.infer<typeof productSchema>;

export const DEFAULT_PRODUCT_FORM_DATA: ProductFormData = {
  name: '',
  slug: '',
  brand: '',
  description: '',
  price: 0,
  link: '',
  image: '',
  categoryId: 1,
  redditKeyword: '',
};
