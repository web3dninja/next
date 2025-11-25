'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { deleteCategoryAction } from '../category.actions';
import type { Category } from '@/lib/data/category';
import { Spinner } from '@/components/ui/spinner';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DeleteCategoryButtonProps {
  categoryId: number;
}

export default function DeleteCategoryButton({ categoryId }: DeleteCategoryButtonProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: deleteCategoryAction,
    onSuccess: () => {
      queryClient.setQueryData<Category[]>(['categories'], (old = []) =>
        old.filter(category => category.id !== categoryId),
      );
      queryClient.removeQueries({ queryKey: ['category', categoryId] });
      toast.success('Category deleted successfully');
      setOpen(false);
      router.push('/admin/categories');
    },
    onError: error => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete category');
    },
  });

  const handleDelete = () => {
    mutation.mutate(categoryId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <TrashIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the category. Products in
            this category will need to be reassigned.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Spinner className="mr-2" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
