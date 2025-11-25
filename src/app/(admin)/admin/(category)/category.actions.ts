'use server';

import { revalidatePath } from 'next/cache';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryBySlug,
  Category,
} from '@/lib/data/category';

export type CategoryCreateInput = Omit<Category, 'id' | 'parent' | 'children'>;

export async function getCategoriesAction(): Promise<Category[]> {
  return await getCategories();
}

export async function getCategoryBySlugAction(slug: string): Promise<Category | null> {
  return await getCategoryBySlug(slug);
}

export async function createCategoryAction(data: CategoryCreateInput): Promise<Category | null> {
  if (!data.name || !data.slug) {
    throw new Error('Name and slug are required');
  }

  const newCategory = await createCategory(data);

  if (!newCategory) {
    throw new Error('Failed to create category');
  }

  revalidatePath('/admin/categories');
  revalidatePath('/products');

  return newCategory;
}

export async function updateCategoryAction(
  id: number,
  data: CategoryCreateInput,
): Promise<Category | null> {
  if (!id) {
    throw new Error('ID is required');
  }

  const updatedCategory = await updateCategory(id, data);

  if (!updatedCategory) {
    throw new Error('Failed to update category');
  }

  revalidatePath('/admin/categories');
  revalidatePath(`/admin/categories/${id}`);
  revalidatePath('/products');

  return updatedCategory;
}

export async function deleteCategoryAction(id: number): Promise<Category | null> {
  if (!id) {
    throw new Error('ID is required');
  }

  return await deleteCategory(id);

  revalidatePath('/admin/categories');
  revalidatePath('/products');
}
