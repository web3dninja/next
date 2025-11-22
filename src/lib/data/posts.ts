// Posts data and functions

import prisma from "@/lib/prisma";

export interface Post {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number | null;
}

// Data access functions
export async function getPosts(): Promise<Post[]> {
  return await prisma.post.findMany();
}

export async function getPostById(id: number): Promise<Post | null> {
  return await prisma.post.findUnique({
    where: { id },
  });
}

// Mutation functions
export async function addPost(post: Omit<Post, "id" | "published" | "authorId"> & { published?: boolean; authorId?: number | null }): Promise<Post> {
  const newPost = await prisma.post.create({
    data: {
      title: post.title,
      content: post.content ?? null,
      published: post.published ?? false,
      authorId: post.authorId ?? null,
    },
  });
  return newPost;
}

export async function updatePost(id: number, data: Partial<Omit<Post, "id">>): Promise<Post | null> {
  try {
    return await prisma.post.update({
      where: { id },
      data,
    });
  } catch (error) {
    return null;
  }
}

export async function deletePost(id: number): Promise<Post | null> {
  try {
    return await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    return null;
  }
}
