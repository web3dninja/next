import { NextRequest, NextResponse } from "next/server";

// POST /api/upload - завантаження файлів
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // В реальному проекті тут буде збереження файлу
  const fileInfo = {
    name: file.name,
    size: file.size,
    type: file.type,
    uploaded: new Date().toISOString(),
  };

  return NextResponse.json({
    message: "File uploaded successfully",
    file: fileInfo,
  });
}
