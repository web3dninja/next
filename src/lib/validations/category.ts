import { categoryCreateSchema, categoryUpdateSchema, type CategoryFormData } from '@/lib/schemas';

export async function validateCategoryCreate(data: unknown): Promise<CategoryFormData> {
  return categoryCreateSchema.parseAsync(data);
}

export async function validateCategoryUpdate(data: unknown): Promise<CategoryFormData> {
  return categoryUpdateSchema.parseAsync(data);
}
