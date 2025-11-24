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

export function generateSlug(text: string, maxWords?: number): string {
  let slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/);

  if (maxWords) {
    slug = slug.slice(0, maxWords);
  }

  return slug.join('-').replace(/-+/g, '-').trim();
}

export function generateProductSlug(brand: string, name: string): string {
  return generateSlug(`${brand} ${name}`, 5);
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
