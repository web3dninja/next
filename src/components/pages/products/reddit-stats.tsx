'use client';

import { Badge } from '@/components/ui/badge';
import type { RedditStats } from '@/types/product';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';

interface RedditStatsProps {
  stats: RedditStats;
  className?: string;
}

export function RedditStatsDisplay({ stats, className }: RedditStatsProps) {
  const positivePercent = Math.min(Math.max(stats.positiveScore, 0), 100);

  return (
    <div className={cn('flex w-full flex-col gap-1 text-xs', className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex cursor-help items-center justify-center gap-1 text-center text-xs">
              {stats.positiveScore}% positive sentiment <InfoIcon className="size-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs text-xs">
            This value shows what percentage of Reddit mentions about the product are positive,
            compared to negative ones. We use the balance of positive and negative sentiment to
            position the marker on the progress bar and quickly visualize how the community feels
            about this product.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="relative h-3 w-full">
        <div className="from-destructive to-success absolute inset-0 rounded-md bg-linear-to-r" />

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
