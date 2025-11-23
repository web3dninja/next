import { ContentLoader } from '@/components/ui/content-loader';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminProductsLoading() {
  return (
    <>
      <div className="container flex gap-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-32" />
        <div className="flex-1" />
        <Skeleton className="h-9 w-32" />
      </div>

      <div className="content">
        <Skeleton className="mb-4 h-10 w-full max-w-md" />
        <ContentLoader variant="products" count={6} />
      </div>
    </>
  );
}
