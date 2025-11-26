'use server';

import { revalidatePath } from 'next/cache';
import { createProduct, updateProductById, deleteProductById } from '@/lib/db';
import { validateProductCreate, validateProductUpdate } from '@/lib/validations';
import { PRODUCT_CONFIG } from '@/configs/product';
import type { Product } from '@/types/product';
import { ProductFormData } from '@/lib/schemas';

export async function createProductAction(data: ProductFormData): Promise<Product | null> {
  const validated = await validateProductCreate(data);

  const newProduct = await createProduct(validated);

  if (!newProduct) {
    throw new Error('Failed to create product');
  }

  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.PUBLIC_LIST);

  return newProduct;
}

export async function updateProductAction(
  id: number,
  data: ProductFormData,
): Promise<Product | null> {
  if (!id) {
    throw new Error('ID is required');
  }

  const validated = await validateProductUpdate(data);

  const updatedProduct = await updateProductById(id, validated);

  if (!updatedProduct) {
    throw new Error('Failed to update product');
  }

  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.getAdminDetail(id));
  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.PUBLIC_LIST);
  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.getPublicDetail(id));

  return updatedProduct;
}

export async function deleteProductAction(id: number): Promise<Product | null> {
  if (!id) {
    throw new Error('ID is required');
  }

  const deletedProduct = await deleteProductById(id);

  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.PUBLIC_LIST);

  return deletedProduct;
}
