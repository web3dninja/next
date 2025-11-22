"use server";

import { revalidatePath } from "next/cache";
import { addPost, updatePost, deletePost } from "@/lib/data";

export async function createPostAction(data: { title: string; content: string }) {
  if (!data.title || !data.content) {
    throw new Error("Title and content are required");
  }

  const post = await addPost({
    title: data.title,
    content: data.content,
  });

  revalidatePath("/blog");

  return post;
}

export async function updatePostAction(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!id) {
    return { error: "ID is required" };
  }

  const post = await updatePost(id, {
    ...(title && { title }),
    ...(content && { content }),    
  });

  if (!post) {
    return { error: "Post not found" };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.id}`);

  return { success: true, post };
}

export async function deletePostAction(id: number) {
  if (!id) {
    throw new Error("ID is required");
  }

  const post = await deletePost(id);

  if (!post) {
    throw new Error("Post not found");
  }

  revalidatePath("/blog");

  return post;
}
