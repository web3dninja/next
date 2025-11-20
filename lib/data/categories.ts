// Categories data and functions

export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories?: Category[];
}

// Categories data
export const categories: Record<string, Category> = {
  electronics: {
    id: "electronics",
    name: "Electronics",
    description: "Smartphones, laptops, tablets and accessories",
    subcategories: [
      { id: "phones", name: "Phones", description: "Smartphones of all brands" },
      { id: "laptops", name: "Laptops", description: "Laptops for work and gaming" },
      { id: "tablets", name: "Tablets", description: "Tablets and e-readers" },
    ],
  },
  clothing: {
    id: "clothing",
    name: "Clothing",
    description: "Men's and women's clothing",
    subcategories: [
      { id: "men", name: "Men's", description: "Clothing for men" },
      { id: "women", name: "Women's", description: "Clothing for women" },
    ],
  },
  home: {
    id: "home",
    name: "Home & Garden",
    description: "Products for home and garden",
  },
};

// Data access functions
export async function getCategories(): Promise<Category[]> {
  return Object.values(categories);
}

export async function getCategory(id: string): Promise<Category | null> {
  return categories[id] || null;
}
