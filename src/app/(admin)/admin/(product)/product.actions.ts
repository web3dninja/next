'use server';

import { revalidatePath } from 'next/cache';
import { addProduct, updateProduct, deleteProduct, Product, ProductCreateInput } from '@/lib/data';

export async function createProductAction(product: ProductCreateInput): Promise<Product | null> {
  if (!product.name || !product.brand || !product.price) {
    throw new Error('Name, brand, and price are required');
  }

  const newProduct = await addProduct(product);

  if (!newProduct) {
    throw new Error('Failed to create product');
  }

  revalidatePath('/admin/products');
  revalidatePath('/products');

  return newProduct;
}

export async function updateProductAction(
  id: number,
  data: ProductCreateInput,
): Promise<Product | null> {
  if (!id) {
    throw new Error('ID is required');
  }

  const { redditStats, id: _, ...productData } = data as Product;

  const updatedProduct = await updateProduct(id, productData);

  if (!updatedProduct) {
    throw new Error('Failed to update product');
  }

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${id}`);
  revalidatePath('/products');
  revalidatePath(`/products/${id}`);

  return updatedProduct;
}

export async function deleteProductAction(id: number) {
  if (!id) {
    throw new Error('ID is required');
  }

  try {
    await deleteProduct(id);
  } catch (error) {
    throw new Error('Failed to delete product');
  }

  revalidatePath('/admin/products');
  revalidatePath('/products');
}
