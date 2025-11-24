import { Item } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoriesLoading() {
  return (
    <>
      <div className="content-header">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="content">
        <Skeleton className="mb-4 h-10 w-full max-w-md" />

        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Item key={i} variant="outline">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </Item>
          ))}
        </div>
      </div>
    </>
  );
}

