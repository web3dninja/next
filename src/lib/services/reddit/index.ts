import type { RedditPost, RedditSearchResponse, RedditStatsResult, AnalyzedComment } from './types';
import {
  analyzeSentimentAdvanced,
  detectCategory,
  freshnessWeight,
  sourceWeight,
  calculateSpecificity,
  computeCommentScore,
} from './helpers';

async function getRedditAccessToken(): Promise<string | null> {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn('Reddit API credentials not set (REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET)');
    return null;
  }

  try {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'ProductStats/2.0',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      console.error('Failed to get Reddit access token:', response.status);
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Reddit access token:', error);
    return null;
  }
}

export async function fetchRedditStats(keywords: string | string[]): Promise<RedditStatsResult> {
  try {
    const keys = Array.isArray(keywords) ? keywords : [keywords];
    const allPosts: RedditPost[] = [];

    const accessToken = await getRedditAccessToken();
    if (!accessToken) {
      console.warn('Skipping Reddit API calls - no access token');
      return { mentions: 0, positiveScore: 0, negativeScore: 0, rank: 0 };
    }

    const url = (k: string) =>
      `https://oauth.reddit.com/search?q=${encodeURIComponent(k)}&limit=100&t=year`;

    for (const k of keys) {
      const r = await fetch(url(k), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'ProductStats/2.0',
        },
      });
      if (!r.ok) {
        console.warn(`Reddit API error for "${k}": ${r.status}`);
        continue;
      }

      const d: RedditSearchResponse = await r.json();
      for (const child of d.data.children) {
        allPosts.push(child.data);
      }
    }

    console.log(`Fetched ${allPosts.length} posts for keywords: ${keys.join(', ')}`);

    const analyzedScores: number[] = [];
    let debugCount = 0;

    for (const post of allPosts) {
      const text = `${post.title} ${post.selftext}`;

      const sentiment = analyzeSentimentAdvanced(text);
      const category = detectCategory(text);
      const fresh = freshnessWeight(post.created_utc);
      const sourceW = sourceWeight();
      const specificity = calculateSpecificity(text, keys);

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

      // Debug first 3 posts
      if (debugCount < 3) {
        console.log(`Post ${debugCount + 1}:`, {
          title: post.title.substring(0, 50),
          sentiment: sentiment.sentiment,
          strength: sentiment.strength,
          specificity,
          score,
        });
        debugCount++;
      }
    }

    console.log(
      `Total scores: positive=${analyzedScores.filter(s => s > 0).length}, negative=${analyzedScores.filter(s => s < 0).length}, neutral=${analyzedScores.filter(s => s === 0).length}`,
    );

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

    // If all neutral, return default values
    if (positiveSum === 0 && negativeSum === 0) {
      return { mentions, positiveScore: 50, negativeScore: 50, rank: 50 };
    }

    const total = positiveSum + negativeSum || 1;
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

// Re-export types for convenience
export type { RedditPost, RedditSearchResponse, RedditStatsResult } from './types';
