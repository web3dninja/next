import basePrisma, { withAdmin, withModeratorOrAdmin } from '@/utils/prisma';
import type { Category, CategoryWithCount } from '@/types/category';
import type { CategoryFormData } from '@/lib/schemas';

const includeRelations = {
  include: {
    parent: true,
    children: true,
  },
};

export async function findAllCategories(includeChildren = false): Promise<Category[]> {
  return await basePrisma.category.findMany({
    include: {
      parent: true,
      children: includeChildren,
    },
    orderBy: { name: 'asc' },
  });
}

export async function findCategoryById(id: number): Promise<Category | null> {
  return await basePrisma.category.findUnique({
    where: { id },
    ...includeRelations,
  });
}

export async function findCategoryBySlug(slug: string): Promise<Category | null> {
  return await basePrisma.category.findUnique({
    where: { slug },
    ...includeRelations,
  });
}

export async function findRootCategories(): Promise<Category[]> {
  return await basePrisma.category.findMany({
    where: { parentId: null },
    include: {
      children: true,
    },
    orderBy: { name: 'asc' },
  });
}

export async function findCategoryChildren(parentId: number): Promise<Category[]> {
  return await basePrisma.category.findMany({
    where: { parentId },
    include: {
      children: true,
    },
    orderBy: { name: 'asc' },
  });
}

export async function createCategoryInDb(data: CategoryFormData): Promise<Category> {
  return await withModeratorOrAdmin(async prisma => {
    return await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        icon: data.icon,
        parentId: data.parentId,
      },
      ...includeRelations,
    });
  });
}

export async function updateCategoryInDb(id: number, data: CategoryFormData): Promise<Category> {
  return await withModeratorOrAdmin(async prisma => {
    return await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        icon: data.icon,
        parentId: data.parentId,
      },
      ...includeRelations,
    });
  });
}

export async function deleteCategoryFromDb(id: number): Promise<Category> {
  return await withAdmin(async prisma => {
    return await prisma.category.delete({
      where: { id },
      ...includeRelations,
    });
  });
}

export async function findCategoriesWithProductCount(): Promise<CategoryWithCount[]> {
  return await basePrisma.category.findMany({
    include: {
      parent: true,
      children: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: { name: 'asc' },
  });
}
