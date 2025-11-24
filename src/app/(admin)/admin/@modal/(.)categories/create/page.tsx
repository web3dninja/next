'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CategoryForm } from '../../../categories/components/category-form';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesAction } from '../../../categories/category.actions';

export default function CreateCategoryModal() {
  const router = useRouter();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategoriesAction(),
  });

  return (
    <Dialog open={true} onOpenChange={open => !open && router.back()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          mode="create"
          categories={categories}
          onSuccess={() => router.back()}
        />
      </DialogContent>
    </Dialog>
  );
}
