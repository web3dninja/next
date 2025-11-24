export function getDescendantCategoryIds<
  T extends {
    id: number;
    parentId: number | null;
  },
>(categories: T[], categoryId: number): number[] {
  const descendants: number[] = [categoryId];
  const children = categories.filter(category => category.parentId === categoryId);

  for (const child of children) {
    descendants.push(...getDescendantCategoryIds(categories, child.id));
  }

  return descendants;
}

export function generateProductSlug(brand: string, name: string): string {
  return `${brand} ${name}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/)
    .slice(0, 5)
    .join('-')
    .replace(/-+/g, '-')
    .trim();
}

export function getLeafCategories<
  T extends {
    id: number;
    parentId: number | null;
  },
>(categories: T[]): T[] {
  return categories.filter(
    category => !categories.some(c => c.parentId === category.id),
  );
}
