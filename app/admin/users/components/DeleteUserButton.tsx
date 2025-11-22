'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { deleteUserAction } from '../actions';
import type { User } from '@/lib/data/users';
import { Spinner } from '@/components/ui/spinner';
import { TrashIcon } from 'lucide-react';

interface DeleteUserButtonProps {
  userId: number;
}

export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUserAction,
    onSuccess: () => {
      queryClient.setQueryData<User[]>(['users'], (old = []) =>
        old.filter(user => user.id !== userId),
      );
    },
  });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    mutation.mutate(userId);
  };

  return (
    <>
      <Button onClick={handleDelete} variant="outline" size="icon" disabled={mutation.isPending}>
        {mutation.isPending ? <Spinner /> : <TrashIcon className="size-4" />}
      </Button>
      {mutation.isError && (
        <span className="ml-2 text-xs text-red-500">
          {mutation.error instanceof Error ? mutation.error.message : 'Failed to delete user'}
        </span>
      )}
    </>
  );
}
