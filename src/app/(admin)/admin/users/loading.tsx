import { ContentLoader } from '@/components/ui/content-loader';
import { Skeleton } from '@/components/ui/skeleton';

export default function UsersLoading() {
  return (
    <>
      <div className="content-header">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>

      <div className="content">
        <Skeleton className="mb-4 h-10 w-full max-w-md" />
        <ContentLoader variant="users" count={6} />
      </div>
    </>
  );
}
