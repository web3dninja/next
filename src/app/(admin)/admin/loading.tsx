import { Spinner } from '@/components/ui/spinner';

// Loading UI - shown while the page is loading
export default function Loading() {
  return (
    <div className="m-auto flex items-center justify-center gap-2">
      <Spinner className="size-6" />
      <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
    </div>
  );
}
