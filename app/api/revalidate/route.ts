import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json({ revalidated: false, now: Date.now() });
  }
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}