import { NextResponse } from "next/server";
import { getCategories } from "@/lib/data";

// GET /api/categories
export async function GET() {
  const allCategories = await getCategories();
  return NextResponse.json(allCategories);
}
