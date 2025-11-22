// Products data and functions

import prisma from '@/lib/prisma';

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: string;
  link: string;
  image: string;
  category: string;
}

// Data access functions
export async function getProducts(): Promise<Product[]> {
  return await prisma.product.findMany();
}

export async function getProductById(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({
    where: { id },
  });
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return await prisma.product.findMany({
    where: { category },
  });
}

// Mutation functions
export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const newProduct = await prisma.product.create({
    data: product,
  });
  return newProduct;
}

export async function updateProduct(
  id: number,
  data: Partial<Omit<Product, 'id'>>,
): Promise<Product | null> {
  try {
    return await prisma.product.update({
      where: { id },
      data,
    });
  } catch (error) {
    return null;
  }
}

export async function deleteProduct(id: number): Promise<Product | null> {
  try {
    return await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    return null;
  }
}
