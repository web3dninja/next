'use client';

import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ImagePreviewProps {
  value?: string;
  className?: string;
}

export function ImagePreview({ value, className }: ImagePreviewProps) {
  return (
    <Avatar className={cn('rounded-lg', className)}>
      {value ? (
        <AvatarImage
          src={value}
          alt="Preview"
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      <AvatarFallback className="absolute flex flex-col items-center justify-center gap-2 rounded-lg bg-zinc-50 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        <ImageIcon className="size-8" />
        <span className="text-sm">image preview</span>
      </AvatarFallback>
    </Avatar>
  );
}
