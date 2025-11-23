import type { SentimentType, AnalyzedComment } from './types';
import { CATEGORY_KEYWORDS, CATEGORY_WEIGHTS } from './constants';

export function detectCategory(text: string): { category: string; weight: number } {
  const lower = text.toLowerCase();

  for (const category in CATEGORY_KEYWORDS) {
    for (const w of CATEGORY_KEYWORDS[category]) {
      if (lower.includes(w)) {
        return { category, weight: CATEGORY_WEIGHTS[category] };
      }
    }
  }

  return { category: 'emotion', weight: CATEGORY_WEIGHTS.emotion };
}

export function analyzeSentimentAdvanced(text: string): {
  sentiment: SentimentType;
  strength: number;
} {
  const lower = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;

  const strongPositive = ['love', 'amazing', 'excellent', 'fantastic'];
  const strongNegative = ['hate', 'terrible', 'awful', 'horrible'];

  const positiveWords = ['good', 'nice', 'helpful', 'reliable', 'recommend'];
  const negativeWords = ['bad', 'poor', 'worst', 'junk', 'disappointing'];

  for (const w of strongPositive) if (lower.includes(w)) positiveCount += 2;
  for (const w of strongNegative) if (lower.includes(w)) negativeCount += 2;

  for (const w of positiveWords) if (lower.includes(w)) positiveCount++;
  for (const w of negativeWords) if (lower.includes(w)) negativeCount++;

  const total = positiveCount + negativeCount;

  const strength = total > 0 ? Math.min(total / 4, 1.5) : 0.5;

  if (positiveCount > negativeCount) return { sentiment: 'positive', strength };
  if (negativeCount > positiveCount) return { sentiment: 'negative', strength };
  return { sentiment: 'neutral', strength: 0.5 };
}

export function freshnessWeight(createdUtc: number): number {
  const ageDays = (Date.now() / 1000 - createdUtc) / 86400;

  if (ageDays <= 30) return 1;
  if (ageDays <= 90) return 0.7;
  return 0.4;
}

export function sourceWeight(): number {
  return 1; // for Reddit specifically
}

export function calculateSpecificity(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();

  let max = 0;

  for (const key of keywords) {
    const parts = key.toLowerCase().split(/\s+/);
    let matches = 0;

    for (const p of parts) {
      if (lower.includes(p) && p.length > 2) matches++;
    }

    const score = matches / parts.length;
    max = Math.max(max, score);
  }

  return max;
}

export function computeCommentScore(a: AnalyzedComment): number {
  const sentimentWeight = a.sentiment === 'positive' ? 1 : a.sentiment === 'negative' ? -1 : 0;

  return (
    sentimentWeight *
    a.strength *
    a.categoryWeight *
    a.freshnessWeight *
    a.sourceWeight *
    (0.5 + a.specificity / 2)
  );
}

