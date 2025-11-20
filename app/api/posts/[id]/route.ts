import { NextRequest, NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/posts/[id] - get post by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const post = await getPostById(parseInt(id));

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

// PUT /api/posts/[id] - update post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  const updated = await updatePost(parseInt(id), {
    title: body.title,
    content: body.content,
    slug: body.slug,
  });

  if (!updated) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// DELETE /api/posts/[id] - delete post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const deleted = await deletePost(parseInt(id));

  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(deleted);
}

// PATCH /api/posts/[id] - partial update
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  const updated = await updatePost(parseInt(id), body);

  if (!updated) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
