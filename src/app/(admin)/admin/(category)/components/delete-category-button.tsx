'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { deleteCategoryAction } from '@/actions/category';
import type { Category } from '@/types/category';
import { Spinner } from '@/components/ui/spinner';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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
      toast.error((error as Error).message);
    },
  });

  const handleDelete = () => {
    mutation.mutate(categoryId);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <TrashIcon className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the category. Products in
            this category will need to be reassigned.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={e => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={mutation.isPending}
            asChild
          >
            <Button variant="destructive" disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner /> : 'Delete'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
