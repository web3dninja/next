"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { deleteUserAction } from "../actions";
import type { User } from "@/lib/data/users";

interface DeleteUserButtonProps {
  userId: number;
}

export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUserAction,
    onSuccess: () => {
      queryClient.setQueryData<User[]>(["users"], (old = []) =>
        old.filter((user) => user.id !== userId)
      );
    },
  });

  const handleDelete = () => {
    mutation.mutate(userId);
  };

  return (
    <>
      <Button
        onClick={handleDelete}
        variant="destructive"
        size="sm"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "..." : "Delete"}
      </Button>
      {mutation.isError && (
        <span className="text-xs text-red-500 ml-2">
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Failed to delete user"}
        </span>
      )}
    </>
  );
}
