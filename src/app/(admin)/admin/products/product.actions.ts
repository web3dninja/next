'use server';

import { revalidatePath } from 'next/cache';
import { addProduct, updateProduct, deleteProduct, getProductById, Product } from '@/lib/data';

export async function getProductAction(id: number) {
  return await getProductById(id);
}

export async function createProductAction(product: Omit<Product, 'id'>) {
  if (!product.name || !product.brand || !product.price) {
    throw new Error('Name, brand, and price are required');
  }

  const data = await addProduct(product);

  revalidatePath('/admin/products');
  revalidatePath('/products');

  return data;
}

export async function updateProductAction(id: number, data: Omit<Product, 'id'>) {
  if (!id) {
    throw new Error('ID is required');
  }

  const product = await updateProduct(id, data);

  if (!product) {
    throw new Error('Product not found');
  }

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${id}`);
  revalidatePath('/products');
  revalidatePath(`/products/${id}`);

  return product;
}

export async function deleteProductAction(id: number) {
  if (!id) {
    throw new Error('ID is required');
  }

  const product = await deleteProduct(id);

  if (!product) {
    throw new Error('Product not found');
  }

  revalidatePath('/admin/products');
  revalidatePath('/products');

  return product;
}
