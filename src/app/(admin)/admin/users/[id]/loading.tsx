import { Skeleton } from '@/components/ui/skeleton';
import { BackButton } from '@/components/ui/back-button';

export default function UserDetailLoading() {
  return (
    <>
      <div className="container">
        <BackButton href="/admin/users" label="Back to Users" />
      </div>

      <div className="content">
        <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
          <Skeleton className="mb-4 h-8 w-48" />

          <div className="space-y-3">
            <div>
              <Skeleton className="mb-1 h-4 w-8" />
              <Skeleton className="h-5 w-16" />
            </div>

            <div>
              <Skeleton className="mb-1 h-4 w-12" />
              <Skeleton className="h-5 w-64" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

