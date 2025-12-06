import { z } from 'zod';

export const productSchema = z.object({
  categoryId: z.number().min(1, 'Category is required'),
  redditKeyword: z.string().min(1, 'Reddit keyword is required'),
  amazonProductId: z.string().min(1, 'Amazon Product ID is required'),
  link: z.url('Link must be a valid URL'),
});

export const productCreateSchema = productSchema;
export const productUpdateSchema = productSchema;

export type ProductFormData = z.infer<typeof productSchema>;

export const DEFAULT_PRODUCT_FORM_DATA: ProductFormData = {
  categoryId: 0,
  redditKeyword: '',
  amazonProductId: '',
  link: '',
};
