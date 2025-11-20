import { NextRequest, NextResponse } from "next/server";
import { getCategory } from "@/lib/data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/categories/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const category = await getCategory(id);

  if (category) {
    return NextResponse.json(category);
  } else {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
}
