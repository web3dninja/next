import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { fetchRedditStats } from '@/lib/services/reddit';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const stats = await prisma.redditStats.findMany({
      where: {
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

    const results = [];

    for (const stat of stats) {
      try {
        // Split keywords string into array (format: "tag-tag-tag")
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

    return NextResponse.json({
      success: true,
      updated: results.filter(r => r.status === 'updated').length,
      errors: results.filter(r => r.status === 'error').length,
      results,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
