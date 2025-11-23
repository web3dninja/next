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

function analyzeSentiment(text: string): {
  sentiment: 'positive' | 'negative' | 'neutral';
  strength: number;
} {
  const lowerText = text.toLowerCase();

  const positiveWords = [
    'great',
    'amazing',
    'excellent',
    'love',
    'best',
    'awesome',
    'fantastic',
    'perfect',
    'recommend',
    'worth',
    'good',
    'nice',
    'helpful',
    'quality',
    'reliable',
    'solid',
    'impressive',
    'satisfied',
    'happy',
    'wonderful',
  ];

  const negativeWords = [
    'bad',
    'terrible',
    'awful',
    'hate',
    'worst',
    'poor',
    'disappointing',
    'broken',
    'waste',
    'avoid',
    'regret',
    'useless',
    'cheap',
    'defective',
    'frustrating',
    'annoying',
    'failed',
    'garbage',
    'junk',
    'horrible',
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
  const strength = total > 0 ? Math.min(total / 5, 1) : 0.5;

  if (positiveCount > negativeCount) return { sentiment: 'positive', strength };
  if (negativeCount > positiveCount) return { sentiment: 'negative', strength };
  return { sentiment: 'neutral', strength: 0.5 };
}

function calculateSpecificity(text: string, keyword: string): number {
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();

  if (lowerText.includes(lowerKeyword)) {
    return 1.0;
  }

  const keywordParts = lowerKeyword.split(/[-\s]+/);
  let matchedParts = 0;

  for (const part of keywordParts) {
    if (part.length > 2 && lowerText.includes(part)) {
      matchedParts++;
    }
  }

  return keywordParts.length > 0 ? matchedParts / keywordParts.length : 0.5;
}

export async function fetchRedditStats(keywords: string | string[]): Promise<RedditStatsResult> {
  try {
    const keywordArray = Array.isArray(keywords) ? keywords : [keywords];

    const allPosts: RedditPost[] = [];
    const seenPostIds = new Set<string>();

    for (const keyword of keywordArray) {
      const searchUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(keyword)}&sort=relevance&limit=100&t=month`;

      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'ProductStats/1.0',
        },
      });

      if (!response.ok) {
        console.warn(`Reddit API error for keyword "${keyword}": ${response.status}`);
        continue;
      }

      const data: RedditSearchResponse = await response.json();
      const posts = data.data.children.map(child => child.data);

      for (const post of posts) {
        const postId = `${post.title}-${post.author}`;
        if (!seenPostIds.has(postId)) {
          seenPostIds.add(postId);
          allPosts.push(post);
        }
      }
    }

    const posts = allPosts;

    const userVotes = new Map<string, UserVote>();

    for (const post of posts) {
      const text = `${post.title} ${post.selftext}`;
      const { sentiment, strength } = analyzeSentiment(text);

      let maxSpecificity = 0;
      for (const keyword of keywordArray) {
        const specificity = calculateSpecificity(text, keyword);
        maxSpecificity = Math.max(maxSpecificity, specificity);
      }
      const specificity = maxSpecificity;

      const existingVote = userVotes.get(post.author) || {
        positive: 0,
        negative: 0,
        specificity: 0,
      };

      const voteWeight = specificity * strength;

      if (sentiment === 'positive') {
        existingVote.positive = Math.max(existingVote.positive, voteWeight);
      } else if (sentiment === 'negative') {
        existingVote.negative = Math.max(existingVote.negative, voteWeight);
      }

      existingVote.specificity = Math.max(existingVote.specificity, specificity);
      userVotes.set(post.author, existingVote);
    }

    let totalPositive = 0;
    let totalNegative = 0;

    for (const vote of userVotes.values()) {
      totalPositive += vote.positive;
      totalNegative += vote.negative;
    }

    const mentions = posts.length;
    const total = totalPositive + totalNegative || 1;

    const positiveScore = Math.round((totalPositive / total) * 100);
    const negativeScore = Math.round((totalNegative / total) * 100);

    const ratio = totalNegative > 0 ? totalPositive / totalNegative : totalPositive;
    const normalizedRatio = Math.min(ratio / 10, 1); // Normalize to 0-1

    const normalizedPositive = positiveScore / 100;

    const combinedScore = normalizedPositive * 0.75 + normalizedRatio * 0.25;

    const rank = Math.round(combinedScore * 100);

    return {
      mentions,
      positiveScore,
      negativeScore,
      rank: Math.max(1, Math.min(100, rank)),
    };
  } catch (error) {
    const keywordStr = Array.isArray(keywords) ? keywords.join(', ') : keywords;
    console.error(`Error fetching Reddit stats for "${keywordStr}":`, error);

    return {
      mentions: 0,
      positiveScore: 0,
      negativeScore: 0,
      rank: 0,
    };
  }
}
