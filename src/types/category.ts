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
