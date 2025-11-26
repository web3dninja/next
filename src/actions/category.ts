'use server';

import { revalidatePath } from 'next/cache';
import {
  createCategoryInDb,
  updateCategoryInDb,
  deleteCategoryFromDb,
  findAllCategories,
  findCategoryBySlug,
} from '@/lib/db';
import { validateCategoryCreate, validateCategoryUpdate } from '@/lib/validations';
import { CATEGORY_CONFIG } from '@/configs/category';
import type { Category } from '@/types/category';

export async function getCategoriesAction(): Promise<Category[]> {
  return await findAllCategories();
}

export async function getCategoryBySlugAction(slug: string): Promise<Category | null> {
  return await findCategoryBySlug(slug);
}

export async function createCategoryAction(data: unknown): Promise<Category | null> {
  const validated = await validateCategoryCreate(data);

  const newCategory = await createCategoryInDb(validated);

  if (!newCategory) {
    throw new Error('Failed to create category');
  }

  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.PUBLIC_PRODUCTS);

  return newCategory;
}

export async function updateCategoryAction(id: number, data: unknown): Promise<Category | null> {
  if (!id) {
    throw new Error('ID is required');
  }

  const validated = await validateCategoryUpdate(data);

  const updatedCategory = await updateCategoryInDb(id, validated);

  if (!updatedCategory) {
    throw new Error('Failed to update category');
  }

  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.getAdminDetail(id));
  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.PUBLIC_PRODUCTS);

  return updatedCategory;
}

export async function deleteCategoryAction(id: number): Promise<Category | null> {
  if (!id) {
    throw new Error('ID is required');
  }

  const deletedCategory = await deleteCategoryFromDb(id);

  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(CATEGORY_CONFIG.REVALIDATION_PATHS.PUBLIC_PRODUCTS);

  return deletedCategory;
}
