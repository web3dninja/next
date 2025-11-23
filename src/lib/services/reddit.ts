// Reddit API service for fetching product mentions and sentiment

interface RedditPost {
  title: string;
  selftext: string;
  score: number;
  num_comments: number;
  created_utc: number;
  author: string;
}

interface RedditSearchResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}

interface RedditStatsResult {
  mentions: number;
  positiveScore: number;
  negativeScore: number;
  rank: number;
}

interface UserVote {
  positive: number;
  negative: number;
  specificity: number;
}

// Sentiment analysis based on keywords with weighted scoring
function analyzeSentiment(text: string): { sentiment: 'positive' | 'negative' | 'neutral'; strength: number } {
  const lowerText = text.toLowerCase();

  const positiveWords = [
    'great', 'amazing', 'excellent', 'love', 'best', 'awesome', 'fantastic',
    'perfect', 'recommend', 'worth', 'good', 'nice', 'helpful', 'quality',
    'reliable', 'solid', 'impressive', 'satisfied', 'happy', 'wonderful'
  ];

  const negativeWords = [
    'bad', 'terrible', 'awful', 'hate', 'worst', 'poor', 'disappointing',
    'broken', 'waste', 'avoid', 'regret', 'useless', 'cheap', 'defective',
    'frustrating', 'annoying', 'failed', 'garbage', 'junk', 'horrible'
  ];

  let positiveCount = 0;
  let negativeCount = 0;

  for (const word of positiveWords) {
    if (lowerText.includes(word)) positiveCount++;
  }

  for (const word of negativeWords) {
    if (lowerText.includes(word)) negativeCount++;
  }

  const total = positiveCount + negativeCount;
  const strength = total > 0 ? Math.min(total / 5, 1) : 0.5; // Normalize strength 0-1

  if (positiveCount > negativeCount) return { sentiment: 'positive', strength };
  if (negativeCount > positiveCount) return { sentiment: 'negative', strength };
  return { sentiment: 'neutral', strength: 0.5 };
}

// Check how specific the reference is to the keyword
function calculateSpecificity(text: string, keyword: string): number {
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();

  // Exact match gets full specificity
  if (lowerText.includes(lowerKeyword)) {
    return 1.0;
  }

  // Check for partial matches (individual words)
  const keywordParts = lowerKeyword.split(/[-\s]+/);
  let matchedParts = 0;

  for (const part of keywordParts) {
    if (part.length > 2 && lowerText.includes(part)) {
      matchedParts++;
    }
  }

  // Return ratio of matched parts (spread out vote among possible models)
  return keywordParts.length > 0 ? matchedParts / keywordParts.length : 0.5;
}

export async function fetchRedditStats(keyword: string): Promise<RedditStatsResult> {
  try {
    // Search Reddit for the keyword
    const searchUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(keyword)}&sort=relevance&limit=100&t=month`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'ProductStats/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data: RedditSearchResponse = await response.json();
    const posts = data.data.children.map(child => child.data);

    // Track unique user votes (each user contributes up to 1 vote)
    const userVotes = new Map<string, UserVote>();

    for (const post of posts) {
      const text = `${post.title} ${post.selftext}`;
      const { sentiment, strength } = analyzeSentiment(text);
      const specificity = calculateSpecificity(text, keyword);

      // Get or create user vote
      const existingVote = userVotes.get(post.author) || {
        positive: 0,
        negative: 0,
        specificity: 0,
      };

      // User's vote is weighted by specificity (less than 1 if not exact match)
      const voteWeight = specificity * strength;

      if (sentiment === 'positive') {
        existingVote.positive = Math.max(existingVote.positive, voteWeight);
      } else if (sentiment === 'negative') {
        existingVote.negative = Math.max(existingVote.negative, voteWeight);
      }

      existingVote.specificity = Math.max(existingVote.specificity, specificity);
      userVotes.set(post.author, existingVote);
    }

    // Calculate aggregate scores from unique user votes
    let totalPositive = 0;
    let totalNegative = 0;

    for (const vote of userVotes.values()) {
      totalPositive += vote.positive;
      totalNegative += vote.negative;
    }

    const mentions = posts.length;
    const uniqueUsers = userVotes.size;
    const total = totalPositive + totalNegative || 1;

    // Calculate scores as percentages
    const positiveScore = Math.round((totalPositive / total) * 100);
    const negativeScore = Math.round((totalNegative / total) * 100);

    // Calculate positive:negative ratio
    const ratio = totalNegative > 0 ? totalPositive / totalNegative : totalPositive;
    const normalizedRatio = Math.min(ratio / 10, 1); // Normalize to 0-1

    // Calculate normalized positive sentiment score (0-1)
    const normalizedPositive = positiveScore / 100;

    // Combined score: 75% positive sentiment, 25% positive:negative ratio
    const combinedScore = (normalizedPositive * 0.75) + (normalizedRatio * 0.25);

    // Factor in popularity (more mentions = more weight)
    const popularityBonus = Math.min(uniqueUsers / 50, 0.2); // Up to 20% bonus

    // Final rank (1-100)
    const rank = Math.round((combinedScore + popularityBonus) * 100);

    return {
      mentions,
      positiveScore,
      negativeScore,
      rank: Math.max(1, Math.min(100, rank)),
    };
  } catch (error) {
    console.error(`Error fetching Reddit stats for "${keyword}":`, error);

    // Return default values on error
    return {
      mentions: 0,
      positiveScore: 0,
      negativeScore: 0,
      rank: 0,
    };
  }
}
