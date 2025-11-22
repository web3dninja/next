import { NextResponse } from "next/server";
import { getUsers } from "@/lib/data";

// GET /api/users - публічний endpoint для отримання списку користувачів
export async function GET() {
  const allUsers = await getUsers();
  return NextResponse.json(allUsers);
}
