"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPostAction } from "../actions";

interface FormData {
  title: string;
  content: string;
}

export default function CreatePostForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: createPostAction,
    onSuccess: () => {
      router.refresh();
      reset();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg"
    >
      <h3 className="font-medium text-black dark:text-white">Create New Post</h3>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 2,
              message: "Title must be at least 2 characters",
            },
          })}
          placeholder="My awesome post"
          disabled={mutation.isPending}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          {...register("content", {
            required: "Content is required",
            minLength: {
              value: 10,
              message: "Content must be at least 10 characters",
            },
          })}
          placeholder="Write your post content..."
          rows={4}
          disabled={mutation.isPending}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      {mutation.isError && (
        <p className="text-sm text-red-500">
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Failed to create post"}
        </p>
      )}

      {mutation.isSuccess && (
        <p className="text-sm text-green-500">Post created successfully!</p>
      )}

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Post"}
      </Button>
    </form>
  );
}
