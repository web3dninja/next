"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPostAction } from "../actions";

export default function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(createPostAction, null);

  return (
    <form action={formAction} className="space-y-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
      <h3 className="font-medium text-black dark:text-white">Create New Post</h3>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="My awesome post"
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (optional)</Label>
        <Input
          id="slug"
          name="slug"
          placeholder="my-awesome-post"
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your post content..."
          rows={4}
          required
          disabled={isPending}
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      {state?.success && (
        <p className="text-sm text-green-500">Post created successfully!</p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Post"}
      </Button>
    </form>
  );
}
