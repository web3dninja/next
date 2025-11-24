import type { Category } from '@/lib/data/category';
import { getCategoryById } from '@/lib/data/category';

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
): { value: string; key: string | number } | undefined {
  const selectedCategory = id ? categories.find(cat => cat.id === id) : null;

  return selectedCategory
    ? {
        value: selectedCategory.name,
        key: selectedCategory.id,
      }
    : undefined;
}
