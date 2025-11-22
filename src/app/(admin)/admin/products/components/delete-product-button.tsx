'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { deleteProductAction } from '../actions';
import type { Product } from '@/lib/data/products';
import { Spinner } from '@/components/ui/spinner';
import { TrashIcon } from 'lucide-react';

interface DeleteProductButtonProps {
  productId: number;
}

export default function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProductAction,
    onSuccess: () => {
      queryClient.setQueryData<Product[]>(['products'], (old = []) =>
        old.filter(product => product.id !== productId),
      );
    },
  });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    mutation.mutate(productId);
  };

  return (
    <>
      <Button onClick={handleDelete} variant="outline" size="icon" disabled={mutation.isPending}>
        {mutation.isPending ? <Spinner /> : <TrashIcon className="size-4" />}
      </Button>
      {mutation.isError && (
        <span className="ml-2 text-xs text-red-500">
          {mutation.error instanceof Error ? mutation.error.message : 'Failed to delete product'}
        </span>
      )}
    </>
  );
}
