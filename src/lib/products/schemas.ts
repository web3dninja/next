import { z } from 'zod';
import { PRODUCT_CONFIG } from './config';

export const productSchema = z.object({
  name: z.string().min(PRODUCT_CONFIG.VALIDATION.NAME_MIN_LENGTH, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  brand: z.string().min(PRODUCT_CONFIG.VALIDATION.BRAND_MIN_LENGTH, 'Brand is required'),
  description: z
    .string()
    .min(PRODUCT_CONFIG.VALIDATION.DESCRIPTION_MIN_LENGTH, 'Description is required'),
  price: z.string().min(PRODUCT_CONFIG.VALIDATION.PRICE_MIN_LENGTH, 'Price is required'),
  link: z.url('Invalid URL').min(1, 'Link is required'),
  image: z.url('Invalid image URL').min(1, 'Image URL is required'),
  categoryId: z.number().min(1, 'Category is required'),
  redditKeywords: z
    .array(z.string().min(1))
    .min(PRODUCT_CONFIG.VALIDATION.MIN_REDDIT_KEYWORDS, 'At least one Reddit keyword is required'),
});

export const productCreateSchema = productSchema;
export const productUpdateSchema = productSchema;

export type ProductFormData = z.infer<typeof productSchema>;
