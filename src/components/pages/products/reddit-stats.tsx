'use client';

import { Badge } from '@/components/ui/badge';
import type { RedditStats } from '@/types/product';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface RedditStatsProps {
  stats: RedditStats;
  className?: string;
}

export function RedditStatsDisplay({ stats, className }: RedditStatsProps) {
  const positivePercent = Math.min(Math.max(stats.positiveScore, 0), 100);

  return (
    <div className={cn('flex w-full flex-col gap-1 text-xs', className)}>
      <TooltipProvider>
        <Tooltip disableHoverableContent>
          <div className="flex justify-center text-xs">
            <TooltipTrigger className="flex cursor-help items-center gap-1">
              {stats.positiveScore}% positive sentiment <InfoIcon className="size-4" />
            </TooltipTrigger>
          </div>
          <TooltipContent side="top" className="max-w-xs text-xs">
            This percentage shows the balance of positive vs negative Reddit sentiment.
            High-quality, detailed reviews with pros/cons carry more weight than simple "good" or
            "bad" comments, giving you a more accurate picture of community opinion based on
            thoughtful feedback.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Slider
        defaultValue={[positivePercent]}
        disabled
        max={100}
        rangeClassName="from-destructive to-success bg-linear-to-r"
      />

      <div className="flex flex-wrap justify-between gap-1">
        <Badge variant="outline">{stats.mentions} mentions</Badge>
        <Tooltip disableHoverableContent>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="inline-flex cursor-help items-center gap-1">
              <span>Rank: {stats.rank}</span>
              <InfoIcon className="size-3" />
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs text-xs">
            Reddit Rank (1-100) evaluates product quality by weighing sentiment, review depth, and
            credibility. Detailed reviews with specific pros/cons, technical details, and real usage
            experience count significantly more than short opinions, ensuring the score reflects
            genuine community expertise.
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
