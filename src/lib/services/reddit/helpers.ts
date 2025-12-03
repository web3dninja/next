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
  qualityScore: number;
} {
  const lower = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;

  const strongPositive = ['love', 'amazing', 'excellent', 'fantastic', 'perfect', 'outstanding'];
  const strongNegative = ['hate', 'terrible', 'awful', 'horrible', 'worst', 'useless'];

  const positiveWords = [
    'good',
    'nice',
    'helpful',
    'reliable',
    'recommend',
    'solid',
    'quality',
    'comfortable',
    'durable',
  ];
  const negativeWords = [
    'bad',
    'poor',
    'worst',
    'junk',
    'disappointing',
    'waste',
    'regret',
    'broke',
    'flimsy',
  ];

  for (const w of strongPositive) if (lower.includes(w)) positiveCount += 2;
  for (const w of strongNegative) if (lower.includes(w)) negativeCount += 2;

  for (const w of positiveWords) if (lower.includes(w)) positiveCount++;
  for (const w of negativeWords) if (lower.includes(w)) negativeCount++;

  const total = positiveCount + negativeCount;
  const strength = total > 0 ? Math.min(total / 4, 1.5) : 0.5;

  let qualityScore = 1.0;

  const wordCount = text.split(/\s+/).length;
  if (wordCount >= 50 && wordCount <= 500) {
    qualityScore *= 1.3;
  } else if (wordCount > 500 && wordCount <= 1000) {
    qualityScore *= 1.2;
  } else if (wordCount < 20) {
    qualityScore *= 0.7;
  }

  const hasStructure =
    /(?:pros?|advantages?|positives?)\s*[:|\-|—]/i.test(text) &&
    /(?:cons?|disadvantages?|negatives?|downsides?)\s*[:|\-|—]/i.test(text);
  if (hasStructure) {
    qualityScore *= 1.5;
  }

  const hasPositive =
    positiveWords.some(w => lower.includes(w)) || strongPositive.some(w => lower.includes(w));
  const hasNegative =
    negativeWords.some(w => lower.includes(w)) || strongNegative.some(w => lower.includes(w));

  if (hasPositive && hasNegative) {
    qualityScore *= 1.4;
  }

  const expertisePatterns = [
    /\d+\s*(?:months?|years?|weeks?)\s*(?:of use|using|owned|had it)/i,
    /compared to|vs\.|versus|better than|worse than/i,
    /specs?|specifications?|technical/i,
    /\d+(?:hz|db|mah|watts?|hours?|fps)/i,
  ];

  const hasExpertise = expertisePatterns.some(pattern => pattern.test(text));
  if (hasExpertise) {
    qualityScore *= 1.3;
  }

  const hasExamples = /for example|such as|like when|in my case|specifically/i.test(text);
  if (hasExamples) {
    qualityScore *= 1.2;
  }

  qualityScore = Math.min(qualityScore, 3.0);

  let sentiment: SentimentType;
  if (positiveCount > negativeCount) {
    sentiment = 'positive';
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }

  return { sentiment, strength, qualityScore };
}

export function freshnessWeight(createdUtc: number): number {
  const ageDays = (Date.now() / 1000 - createdUtc) / 86400;

  if (ageDays <= 30) return 1;
  if (ageDays <= 90) return 0.7;
  return 0.4;
}

export function sourceWeight(): number {
  return 1;
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
  const base = a.sentiment === 'positive' ? 1 : a.sentiment === 'negative' ? -1 : 0;

  return (
    base *
    a.strength *
    a.qualityScore *
    a.categoryWeight *
    a.freshnessWeight *
    a.sourceWeight *
    Math.max(a.specificity, 0.3)
  );
}
