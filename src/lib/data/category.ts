import basePrisma, { withAdmin, withModeratorOrAdmin } from '@/lib/prisma';

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  parentId: number | null;
  parent?: Category | null;
  children?: Category[];
}

export interface CategoryWithRelations extends Category {
  parent: Category | null;
  children: Category[];
  _count?: {
    products: number;
  };
}

export async function getCategories(includeChildren = false): Promise<Category[]> {
  return await basePrisma.category.findMany({
    include: {
      parent: true,
      children: includeChildren,
    },
    orderBy: { name: 'asc' },
  });
}

export async function getCategoryById(id: number): Promise<Category | null> {
  return await basePrisma.category.findUnique({
    where: { id },
    include: {
      parent: true,
      children: true,
    },
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return await basePrisma.category.findUnique({
    where: { slug },
    include: {
      parent: true,
      children: true,
    },
  });
}

export async function getRootCategories(): Promise<Category[]> {
  return await basePrisma.category.findMany({
    where: { parentId: null },
    include: {
      children: true,
    },
    orderBy: { name: 'asc' },
  });
}

export async function getCategoryChildren(parentId: number): Promise<Category[]> {
  return await basePrisma.category.findMany({
    where: { parentId },
    include: {
      children: true,
    },
    orderBy: { name: 'asc' },
  });
}

export async function createCategory(
  data: Omit<Category, 'id' | 'parent' | 'children'>,
): Promise<Category> {
  return await withModeratorOrAdmin(async prisma => {
    return await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        icon: data.icon,
        parentId: data.parentId,
      },
      include: {
        parent: true,
        children: true,
      },
    });
  });
}

export async function updateCategory(
  id: number,
  data: Partial<Omit<Category, 'id' | 'parent' | 'children'>>,
): Promise<Category> {
  return await withAdmin(async prisma => {
    return await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        icon: data.icon,
        parentId: data.parentId,
      },
      include: {
        parent: true,
        children: true,
      },
    });
  });
}

export async function deleteCategory(id: number): Promise<Category> {
  return await withAdmin(async prisma => {
    return await prisma.category.delete({
      where: { id },
      include: {
        parent: true,
        children: true,
      },
    });
  });
}

export async function getCategoriesWithProductCount(): Promise<CategoryWithRelations[]> {
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
