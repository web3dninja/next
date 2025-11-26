import type { Category } from '@/types/category';

export function getCategoryPath<T extends Category>(category: T): string {
  const path: string[] = [];
  let current: T | null = category;

  while (current) {
    path.unshift(current.name);
    current = current.parent as T | null;
  }

  return path.join(' > ');
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

export function buildCategoryTree(categories: Category[], parentId: number | null = null): Category[] {
  return categories
    .filter(category => category.parentId === parentId)
    .map(category => ({
      ...category,
      children: buildCategoryTree(categories, category.id),
    }));
}
