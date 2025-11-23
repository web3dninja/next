export interface RedditPost {
  title: string;
  selftext: string;
  score: number;
  num_comments: number;
  created_utc: number;
  author: string;
}

export interface RedditSearchResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}

export interface RedditStatsResult {
  mentions: number;
  positiveScore: number;
  negativeScore: number;
  rank: number;
}

export type SentimentType = 'positive' | 'negative' | 'neutral';

export interface AnalyzedComment {
  sentiment: SentimentType;
  strength: number;
  category: string;
  categoryWeight: number;
  freshnessWeight: number;
  sourceWeight: number;
  specificity: number;
}

export interface UpdateResult {
  keyword: string;
  status: 'updated' | 'error';
  data?: {
    mentions: number;
    positiveScore: number;
    negativeScore: number;
    rank: number;
  };
  error?: string;
}

export interface UpdateAllResult {
  success: boolean;
  updated: number;
  errors: number;
  results: UpdateResult[];
}

