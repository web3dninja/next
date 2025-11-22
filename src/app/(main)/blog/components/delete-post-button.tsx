'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { deletePostAction } from '../actions';

interface DeletePostButtonProps {
  postId: number;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePostAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleDelete = () => {
    mutation.mutate(postId);
  };

  return (
    <>
      <Button onClick={handleDelete} variant="destructive" size="sm" disabled={mutation.isPending}>
        {mutation.isPending ? '...' : 'Delete'}
      </Button>
      {mutation.isError && (
        <span className="ml-2 text-xs text-red-500">
          {mutation.error instanceof Error ? mutation.error.message : 'Failed to delete post'}
        </span>
      )}
    </>
  );
}
