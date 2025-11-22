// Categories data and functions

import prisma from '@/lib/prisma';

export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  parentId: number | null;
  children?: Category[];
}

// Data access functions
export async function getCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: true,
    },
  });
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      children: true,
    },
  });
  return category;
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      children: true,
    },
  });
  return category;
}

export async function getAllCategories(): Promise<Category[]> {
  return await prisma.category.findMany({
    include: {
      children: true,
    },
  });
}

// Mutation functions
export async function createCategory(data: {
  slug: string;
  name: string;
  description?: string;
  parentId?: number;
}): Promise<Category> {
  return await prisma.category.create({
    data: {
      slug: data.slug,
      name: data.name,
      description: data.description ?? null,
      parentId: data.parentId ?? null,
    },
    include: {
      children: true,
    },
  });
}

export async function updateCategory(
  id: number,
  data: Partial<{ slug: string; name: string; description: string; parentId: number | null }>,
): Promise<Category | null> {
  try {
    return await prisma.category.update({
      where: { id },
      data,
      include: {
        children: true,
      },
    });
  } catch (error) {
    return null;
  }
}

export async function deleteCategory(id: number): Promise<Category | null> {
  try {
    return await prisma.category.delete({
      where: { id },
      include: {
        children: true,
      },
    });
  } catch (error) {
    return null;
  }
}

// Legacy function for compatibility
export async function getCategory(slug: string): Promise<Category | null> {
  return getCategoryBySlug(slug);
}
