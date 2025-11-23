import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

interface ContentLoaderProps {
  variant?: 'products' | 'users' | 'product-detail';
  count?: number;
  className?: string;
}

export function ContentLoader({ variant = 'products', count = 6, className }: ContentLoaderProps) {
  if (variant === 'products') {
    return (
      <div className={cn('grid-list', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (variant === 'users') {
    return (
      <div className={cn('flex flex-col gap-4', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <UserCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (variant === 'product-detail') {
    return <ProductDetailSkeleton />;
  }

  return null;
}

function ProductCardSkeleton() {
  return (
    <div className="border-border bg-card flex flex-col gap-4 rounded-lg border p-4">
      {/* Image skeleton */}
      <div className="relative w-full pb-[100%]">
        <Skeleton className="absolute inset-0" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Footer skeleton (Reddit stats) */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-2 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  );
}

function UserCardSkeleton() {
  return (
    <div className="group/item border-border flex flex-wrap items-center gap-4 rounded-md border bg-transparent p-4">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="size-9 rounded-md" />
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap gap-8">
        {/* Image skeleton */}
        <div className="mx-auto w-80 sm:w-64">
          <Skeleton className="relative overflow-hidden rounded-lg pb-[100%]" />
          <Skeleton className="mt-4 h-12 w-full" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-2 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-3/4" />
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-20" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductFormSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-4xl gap-6 space-y-4">
      {/* Image Preview */}
      <div className="size-80 sm:size-64">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="relative h-64 w-full rounded-lg" />
      </div>

      {/* Form Fields */}
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-20 w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
