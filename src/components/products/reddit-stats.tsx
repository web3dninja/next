'use client';

import { Badge } from '../ui/badge';
import { RedditStats } from '@/lib/data/products';
import { cn } from '@/lib/utils';

interface RedditStatsProps {
  stats: RedditStats;
  className?: string;
}

export function RedditStatsDisplay({ stats, className }: RedditStatsProps) {
  const positivePercent = Math.min(Math.max(stats.positiveScore, 0), 100);

  return (
    <div className={cn('flex w-full flex-col gap-1 text-xs', className)}>
      <div className="text-center text-xs">{stats.positiveScore}% positive sentiment</div>
      <div className="border-border relative h-3 w-full overflow-hidden rounded-md border">
        <div className="from-destructive to-success absolute inset-0 bg-linear-to-r" />

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-sm"
          style={{
            left: `${positivePercent}%`,
          }}
        />
      </div>
      <div className="flex flex-wrap justify-between gap-1">
        <Badge variant="outline">{stats.mentions} mentions</Badge>
        <Badge variant="outline">Rank: {stats.rank}</Badge>
      </div>
    </div>
  );
}
