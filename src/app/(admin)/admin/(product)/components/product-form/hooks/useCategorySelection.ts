import { useMemo } from 'react';
import { getLeafCategories } from '@/helpers/product.helper';
import { getCategoryOption } from '@/helpers/category';
import type { Category } from '@/types/category';

export function useCategorySelection(categories: Category[], categoryId: number | null) {
  const leafCategories = useMemo(() => getLeafCategories(categories), [categories]);

  const selectedOption = useMemo(() => {
    return getCategoryOption(categories, categoryId);
  }, [categories, categoryId]);

  return { leafCategories, selectedOption };
}
