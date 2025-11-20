import { NextRequest, NextResponse } from "next/server";
import { getUser, updateUser, deleteUser } from "@/lib/data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/users/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const user = await getUser(parseInt(id));

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}

// PUT /api/users/[id]
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  const updated = await updateUser(parseInt(id), {
    name: body.name,
    email: body.email,
  });

  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// DELETE /api/users/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const deleted = await deleteUser(parseInt(id));

  if (!deleted) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(deleted);
}
