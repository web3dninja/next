'use client';

import { useRouter, useParams } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CategoryForm } from '../../../categories/components/category-form';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesAction, getCategoryBySlugAction } from '../../../categories/category.actions';

export default function EditCategoryModal() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategoriesAction(),
  });

  const { data: category } = useQuery({
    queryKey: ['category', params.slug],
    queryFn: () => getCategoryBySlugAction(params.slug),
    enabled: !!params.slug,
  });

  if (!category) {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={open => !open && router.back()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          mode="update"
          category={category}
          categories={categories}
          onSuccess={() => router.back()}
        />
      </DialogContent>
    </Dialog>
  );
}
