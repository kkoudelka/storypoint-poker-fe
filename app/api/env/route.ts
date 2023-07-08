import { NextResponse } from "next/server";

export async function GET() {
  const env = process.env ?? {};

  return NextResponse.json(env);
}
