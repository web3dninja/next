import { Category } from './category';
import type { AmazonProductData } from '@/lib/services/amazon/types';

export interface Product {
  id: number;
  categoryId: number;
  category: Category;
  redditKeyword: string;
  redditStats: RedditStats;
  link: string;
  amazonProductId: string;
  amazonData?: AmazonProductData | null;
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
