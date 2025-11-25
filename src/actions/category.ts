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
import { CATEGORY_CONFIG } from '@/lib/categories/config';
import type { CategoryFormData } from '@/lib/categories/schemas';

export type CategoryCreateInput = Omit<Category, 'id' | 'parent' | 'children'>;

export async function getCategoriesAction(): Promise<Category[]> {
  return await getCategories();
}

export async function getCategoryBySlugAction(slug: string): Promise<Category | null> {
  return await getCategoryBySlug(slug);
}

export async function createCategoryAction(data: CategoryFormData): Promise<Category | null> {
  const newCategory = await createCategory(data);

  if (!newCategory) {
    throw new Error('Failed to create category');
  }

  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.PUBLIC_PRODUCTS);

  return newCategory;
}

export async function updateCategoryAction(
  id: number,
  data: CategoryFormData,
): Promise<Category | null> {
  const updatedCategory = await updateCategory(id, data);

  if (!updatedCategory) {
    throw new Error('Failed to update category');
  }

  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.getAdminDetail(id));
  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.PUBLIC_PRODUCTS);

  return updatedCategory;
}

export async function deleteCategoryAction(id: number): Promise<Category | null> {
  const deletedCategory = await deleteCategory(id);

  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.PUBLIC_PRODUCTS);

  return deletedCategory;
}
