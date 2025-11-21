"use server";

import { revalidatePath } from "next/cache";
import { addPost, updatePost, deletePost } from "@/lib/data";

export async function createPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const slug = formData.get("slug") as string;

  if (!title || !content) {
    return { error: "Title and content are required" };
  }

  const post = await addPost({
    title,
    content,
    slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
  });

  revalidatePath("/blog");

  return { success: true, post };
}

export async function updatePostAction(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const slug = formData.get("slug") as string;

  if (!id) {
    return { error: "ID is required" };
  }

  const post = await updatePost(id, {
    ...(title && { title }),
    ...(content && { content }),
    ...(slug && { slug }),
  });

  if (!post) {
    return { error: "Post not found" };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);

  return { success: true, post };
}

export async function deletePostAction(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  if (!id) {
    return { error: "ID is required" };
  }

  const post = await deletePost(id);

  if (!post) {
    return { error: "Post not found" };
  }

  revalidatePath("/blog");

  return { success: true, post };
}
