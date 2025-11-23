import { cn } from '@/lib/utils';

interface EmptyStateProps {
  show: boolean;
  children: React.ReactNode;
  className?: string;
}

export function EmptyState({ show, children, className }: EmptyStateProps) {
  if (!show) return null;

  return (
    <p className={cn('text-center text-zinc-500 dark:text-zinc-400', className)}>{children}</p>
  );
}
