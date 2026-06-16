import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwtToken"); // Or check localStorage logic if you prefer

  // If the user is trying to access MainAppRoutes and has no token, send to login
  if (request.nextUrl.pathname.startsWith("/MainAppRoutes") && !token) {
    return NextResponse.redirect(new URL("/AuthRoutes/login", request.url));
  }

  return NextResponse.next();
}
