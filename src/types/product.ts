import { Category } from './category';

export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  description: string;
  price: number;
  link: string;
  image: string;
  categoryId: number;
  category: Category;
  redditKeyword: string;
  redditStats: RedditStats;
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
