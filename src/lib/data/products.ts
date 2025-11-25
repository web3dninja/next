import { Category } from './category';

export interface Product {
  id: number;
  name: string;
  slug: string | null;
  brand: string;
  description: string;
  price: string;
  link: string;
  image: string;
  categoryId: number | null;
  category: Category | null;
  redditKeyword: string;
  redditStats: RedditStats | null;
}

export type ProductCreateInput = Omit<Product, 'id' | 'redditStats' | 'category'>;

export interface RedditStats {
  id: number;
  keyword: string;
  mentions: number;
  positiveScore: number;
  negativeScore: number;
  rank: number;
  updatedAt: Date;
}

export {
  findAllProducts as getProducts,
  findProductById as getProductById,
  findProductBySlug as getProductBySlug,
  findProductsByCategoryIds as getProductsByCategoryIds,
  createProduct as addProduct,
  updateProductById as updateProduct,
  deleteProductById as deleteProduct,
} from '@/lib/products/repository';
