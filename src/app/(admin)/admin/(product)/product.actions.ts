'use server';

import { revalidatePath } from 'next/cache';
import { addProduct, updateProduct, deleteProduct, Product, ProductCreateInput } from '@/lib/data';
import { validateProductData, validateProductId } from '@/lib/products/validation';
import { PRODUCT_CONFIG } from '@/lib/products/config';

export async function createProductAction(product: ProductCreateInput): Promise<Product | null> {
  validateProductData(product);

  const newProduct = await addProduct(product);

  if (!newProduct) {
    throw new Error('Failed to create product');
  }

  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.PUBLIC_LIST);

  return newProduct;
}

export async function updateProductAction(
  id: number,
  data: ProductCreateInput,
): Promise<Product | null> {
  validateProductId(id);

  const { redditStats, id: _, ...productData } = data as Product;

  const updatedProduct = await updateProduct(id, productData);

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
  validateProductId(id);

  const deletedProduct = await deleteProduct(id);

  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.ADMIN_LIST);
  revalidatePath(PRODUCT_CONFIG.REVALIDATION_PATHS.PUBLIC_LIST);

  return deletedProduct;
}
