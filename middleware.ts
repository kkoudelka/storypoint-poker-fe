import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // get cookie "next-auth.session-token"

  if (request.cookies.has("next-auth.session-token")) {
    const tokenCookie = request.cookies.get("next-auth.session-token");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = tokenCookie?.value;
  }

  return NextResponse.next();
}
