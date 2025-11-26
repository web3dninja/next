import { productCreateSchema, productUpdateSchema, type ProductFormData } from '@/lib/schemas';

export async function validateProductCreate(data: unknown): Promise<ProductFormData> {
  return productCreateSchema.parseAsync(data);
}

export async function validateProductUpdate(data: unknown): Promise<ProductFormData> {
  return productUpdateSchema.parseAsync(data);
}

export function normalizeRedditKeyword(keyword: string): string {
  return keyword.toLowerCase().trim();
}
