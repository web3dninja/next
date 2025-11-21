import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/users/[id] - публічний endpoint для отримання користувача
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const user = await getUser(parseInt(id));

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
