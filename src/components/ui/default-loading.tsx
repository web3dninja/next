import { cn } from '@/lib/utils';
import { Spinner } from './spinner';

export function DefaultLoading({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 flex items-center justify-center gap-2', className)}>
      <Spinner className="size-6" />
      <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
    </div>
  );
}
