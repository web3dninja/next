import type {
  RedditPost,
  RedditSearchResponse,
  RedditStatsResult,
  AnalyzedComment,
  UpdateResult,
  UpdateAllResult,
} from './types';
import prisma from '@/lib/prisma/prisma';
import {
  analyzeSentimentAdvanced,
  detectCategory,
  freshnessWeight,
  sourceWeight,
  calculateSpecificity,
  computeCommentScore,
} from './helpers';

export async function fetchRedditStats(keywords: string | string[]): Promise<RedditStatsResult> {
  try {
    const keys = Array.isArray(keywords) ? keywords : [keywords];
    const normalizedKeys = keys.map(k => k.toLowerCase().trim()).filter(Boolean);
    const allPosts: RedditPost[] = [];

    for (const keyword of normalizedKeys) {
      const searchUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(keyword)}&limit=100&t=year`;

      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'ProductStats/2.0',
        },
      });

      if (!response.ok) {
        console.warn(`Reddit API error for keyword "${keyword}": ${response.status}`);
        continue;
      }

      const data: RedditSearchResponse = await response.json();
      for (const child of data.data.children) {
        allPosts.push(child.data);
      }
    }

    const analyzedScores: number[] = [];

    for (const post of allPosts) {
      const text = `${post.title} ${post.selftext}`;

      const sentiment = analyzeSentimentAdvanced(text);
      const category = detectCategory(text);
      const fresh = freshnessWeight(post.created_utc);
      const sourceW = sourceWeight();
      const specificity = calculateSpecificity(text, normalizedKeys);

      const a: AnalyzedComment = {
        sentiment: sentiment.sentiment,
        strength: sentiment.strength,
        category: category.category,
        categoryWeight: category.weight,
        freshnessWeight: fresh,
        sourceWeight: sourceW,
        specificity,
      };

      const score = computeCommentScore(a);
      analyzedScores.push(score);
    }

    const mentions = analyzedScores.length;
    if (mentions === 0) {
      return { mentions: 0, positiveScore: 0, negativeScore: 0, rank: 0 };
    }

    let positiveSum = 0;
    let negativeSum = 0;
    for (const s of analyzedScores) {
      if (s > 0) positiveSum += s;
      if (s < 0) negativeSum += Math.abs(s);
    }

    const total = positiveSum + negativeSum;
    const positiveScore = Math.round((positiveSum / total) * 100);
    const negativeScore = Math.round((negativeSum / total) * 100);

    const health = positiveScore * 0.7 + (positiveSum / Math.max(negativeSum, 0.1)) * 0.3 * 10;

    const rank = Math.max(1, Math.min(100, Math.round(health)));

    return {
      mentions,
      positiveScore,
      negativeScore,
      rank,
    };
  } catch (e) {
    console.error(e);
    return { mentions: 0, positiveScore: 0, negativeScore: 0, rank: 0 };
  }
}

interface UpdateAllOptions {
  force?: boolean;
}

export async function updateAllRedditStats(
  options: UpdateAllOptions = {},
): Promise<UpdateAllResult> {
  const { force = false } = options;

  const stats = await prisma.redditStats.findMany({
    where: force
      ? undefined
      : {
          OR: [
            { mentions: 0 },
            {
              updatedAt: {
                lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
            },
          ],
        },
  });

  const results: UpdateResult[] = [];

  for (const stat of stats) {
    try {
      const keywords = stat.keyword.split('-').filter(Boolean);
      const redditData = await fetchRedditStats(keywords);

      await prisma.redditStats.update({
        where: { keyword: stat.keyword },
        data: {
          mentions: redditData.mentions,
          positiveScore: redditData.positiveScore,
          negativeScore: redditData.negativeScore,
          rank: redditData.rank,
        },
      });

      results.push({
        keyword: stat.keyword,
        status: 'updated',
        data: redditData,
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      results.push({
        keyword: stat.keyword,
        status: 'error',
        error: String(error),
      });
    }
  }

  return {
    success: true,
    updated: results.filter(r => r.status === 'updated').length,
    errors: results.filter(r => r.status === 'error').length,
    results,
  };
}

export type {
  RedditPost,
  RedditSearchResponse,
  RedditStatsResult,
  UpdateResult,
  UpdateAllResult,
} from './types';
