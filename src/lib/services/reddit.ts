// Reddit API service for fetching product mentions and sentiment

interface RedditPost {
  title: string;
  selftext: string;
  score: number;
  num_comments: number;
  created_utc: number;
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

// Simple sentiment analysis based on keywords
function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const lowerText = text.toLowerCase();

  const positiveWords = [
    'great', 'amazing', 'excellent', 'love', 'best', 'awesome', 'fantastic',
    'perfect', 'recommend', 'worth', 'good', 'nice', 'helpful', 'quality'
  ];

  const negativeWords = [
    'bad', 'terrible', 'awful', 'hate', 'worst', 'poor', 'disappointing',
    'broken', 'waste', 'avoid', 'regret', 'useless', 'cheap', 'defective'
  ];

  let positiveCount = 0;
  let negativeCount = 0;

  for (const word of positiveWords) {
    if (lowerText.includes(word)) positiveCount++;
  }

  for (const word of negativeWords) {
    if (lowerText.includes(word)) negativeCount++;
  }

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
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

    let positiveCount = 0;
    let negativeCount = 0;
    let totalScore = 0;

    for (const post of posts) {
      const text = `${post.title} ${post.selftext}`;
      const sentiment = analyzeSentiment(text);

      if (sentiment === 'positive') {
        positiveCount++;
      } else if (sentiment === 'negative') {
        negativeCount++;
      }

      totalScore += post.score;
    }

    const mentions = posts.length;
    const total = positiveCount + negativeCount || 1;

    // Calculate scores as percentages
    const positiveScore = Math.round((positiveCount / total) * 100);
    const negativeScore = Math.round((negativeCount / total) * 100);

    // Calculate rank based on mentions and positive ratio (1-100)
    const mentionScore = Math.min(mentions / 10, 50); // Max 50 points for mentions
    const sentimentScore = (positiveScore / 100) * 50; // Max 50 points for sentiment
    const rank = Math.round(mentionScore + sentimentScore);

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
