import { Item } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminProductsLoading() {
  return (
    <>
      <div className="content-header">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-32" />
        <div className="flex-1" />
        <Skeleton className="h-9 w-32" />
      </div>

      <div className="content">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="grid-list">
          {Array.from({ length: 6 }).map((_, i) => (
            <Item key={i} variant="outline" className="flex-col flex-nowrap items-start">
              <div className="relative w-full pb-[100%]">
                <Skeleton className="absolute inset-0" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-20" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-2 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </Item>
          ))}
        </div>
      </div>
    </>
  );
}
