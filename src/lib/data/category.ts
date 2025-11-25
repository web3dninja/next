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

// Re-export from repository for backward compatibility
export {
  findAllCategories as getCategories,
  findCategoryById as getCategoryById,
  findCategoryBySlug as getCategoryBySlug,
  findRootCategories as getRootCategories,
  findCategoryChildren as getCategoryChildren,
  createCategoryInDb as createCategory,
  updateCategoryInDb as updateCategory,
  deleteCategoryFromDb as deleteCategory,
  findCategoriesWithProductCount as getCategoriesWithProductCount,
} from '@/lib/categories/repository';
