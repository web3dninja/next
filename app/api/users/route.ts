import { NextResponse } from "next/server";
import { getUsers, addUser } from "@/lib/data";

// GET /api/users
export async function GET() {
  const allUsers = await getUsers();
  return NextResponse.json(allUsers);
}

// POST /api/users
export async function POST(request: Request) {
  const body = await request.json();

  const newUser = await addUser({
    name: body.name,
    email: body.email,
  });

  return NextResponse.json(newUser, { status: 201 });
}
