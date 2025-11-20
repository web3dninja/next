import { NextResponse } from "next/server";
import { getServerDate } from "@/lib/data";

// GET /api/date
export async function GET() {
  return NextResponse.json({
    date: new Date().toISOString(),
    locale: getServerDate(),
    timestamp: Date.now(),
  });
}
