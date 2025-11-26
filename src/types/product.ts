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

export interface RedditStats {
  id: number;
  keyword: string;
  mentions: number;
  positiveScore: number;
  negativeScore: number;
  rank: number;
  updatedAt: Date;
}
