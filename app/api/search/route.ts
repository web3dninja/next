import { NextRequest, NextResponse } from "next/server";

// GET /api/search?q=query - пошук з query параметрами
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  // Демо результати
  const results = [
    { id: 1, title: `Result for "${query}" - 1` },
    { id: 2, title: `Result for "${query}" - 2` },
    { id: 3, title: `Result for "${query}" - 3` },
  ];

  return NextResponse.json({
    query,
    limit: parseInt(limit),
    page: parseInt(page),
    results,
    total: results.length,
  });
}
