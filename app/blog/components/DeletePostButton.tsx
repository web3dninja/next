"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { deletePostAction } from "../actions";

interface DeletePostButtonProps {
  postId: number;
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [state, formAction, isPending] = useActionState(deletePostAction, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={postId} />
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        disabled={isPending}
      >
        {isPending ? "..." : "Delete"}
      </Button>
      {state?.error && (
        <span className="text-xs text-red-500 ml-2">{state.error}</span>
      )}
    </form>
  );
}
