'use server';

import { revalidatePath } from 'next/cache';
import { addProduct, updateProduct, deleteProduct, Product, ProductCreateInput } from '@/lib/data';
import { PRODUCT_CONFIG } from '@/lib/products/config';
import { ProductFormData } from '@/lib/products';
import { REDDIT_KEYWORD_DELIMITER } from '@/lib/services/reddit/constants';

export async function createProductAction(data: ProductFormData): Promise<Product | null> {
  const newProduct = await addProduct({
    ...data,
    redditKeyword: data.redditKeywords.join(REDDIT_KEYWORD_DELIMITER),
  });

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
  const updatedProduct = await updateProduct(id, {
    ...data,
    redditKeyword: data.redditKeywords.join(REDDIT_KEYWORD_DELIMITER),
  });

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

  const deletedProduct = await deleteProduct(id);

  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.PUBLIC_LIST);

  return deletedProduct;
}
