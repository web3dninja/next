export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  parentId: number | null;
  parent?: Category | null;
  children?: Category[];
}

export interface CategoryWithCount extends Category {
  parent?: CategoryWithCount | null;
  children?: CategoryWithCount[];
  _count?: {
    products: number;
  };
}
