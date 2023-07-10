import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // get cookie "next-auth.session-token"

  if (request.headers.get("Accept")?.includes("text/html")) {
    const response = NextResponse.next();
    response.headers.set(
      "Accept-CH",
      `Sec-CH-Prefers-Color-Scheme, Sec-CH-Prefers-Contrast`,
    );
    response.headers.set("Vary", "Sec-CH-Prefers-Color-Scheme");
    response.headers.set("Critical-CH", "Sec-CH-Prefers-Color-Scheme");
    return response;
  }

  const darkPreference = request.headers.get("Sec-CH-Prefers-Color-Scheme");

  if (darkPreference && !request.cookies.has("prefers-dark-mode")) {
    request.cookies.set(
      "prefers-dark-mode",
      (darkPreference === "dark").toString(),
    );
  }

  if (request.cookies.has("next-auth.session-token")) {
    const tokenCookie = request.cookies.get("next-auth.session-token");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = tokenCookie?.value;
  }

  return NextResponse.next();
}
