import { NextRequest, NextResponse } from "next/server";
import { getPosts, addPost } from "@/lib/data";

// GET /api/posts - get all posts
export async function GET() {
  const allPosts = await getPosts();
  return NextResponse.json(allPosts);
}

// POST /api/posts - create new post
export async function POST(request: NextRequest) {
  const body = await request.json();

  const newPost = await addPost({
    title: body.title,
    content: body.content,
  });

  return NextResponse.json(newPost, { status: 201 });
}
