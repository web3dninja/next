export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  parentId: number | null;
}

export interface CategoryWithCount extends Category {
  parent?: Category | null;
  children?: CategoryWithCount[];
  _count?: {
    products: number;
  };
}
