import type { Category, CategoryWithCount } from '@/types/category';

export function getCategoryPath(category: CategoryWithCount): string {
  const path: string[] = [];
  let current: CategoryWithCount | null = category;

  while (current) {
    path.unshift(current.name);
    current = current.parent || null;
  }

  return path.join(' > ');
}

export function getChildrenCategorySlugs(category: CategoryWithCount): string[] {
  const path: string[] = [category.slug];
  let current: CategoryWithCount | null = category;

  while (current) {
    if (current.children && current.children.length > 0) {
      path.push(...current.children.map(child => child.slug));
    }
    current = current.children?.[0] || null;
  }
  return path;
}

export function getCategoryOption(
  categories: Category[],
  id: number | null,
): { value: string; key: string | number } | null {
  const selectedCategory = id ? categories.find(cat => cat.id === id) : null;

  return selectedCategory
    ? {
        value: selectedCategory.name,
        key: selectedCategory.id,
      }
    : null;
}

export function buildCategoryTree(
  categories: CategoryWithCount[],
  parentId: number | null = null,
): CategoryWithCount[] {
  return categories
    .filter(category => category.parentId === parentId)
    .map(category => ({
      ...category,
      children: buildCategoryTree(categories, category.id),
    }));
}

export function getCategoryTreeProductsCount(category: CategoryWithCount): number {
  const count = category._count?.products ?? 0;

  if (!category.children || category.children.length === 0) {
    return count;
  }

  return category.children.reduce((sum, child) => sum + getCategoryTreeProductsCount(child), 0);
}
