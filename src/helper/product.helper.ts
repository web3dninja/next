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
