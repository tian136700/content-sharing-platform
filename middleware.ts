import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  validateSessionToken,
} from "@/lib/admin-session";

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login"]);
const API_KEY_ADMIN_PATHS = new Set(["/api/admin/upload-article"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (API_KEY_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (token && (await validateSessionToken(token))) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const authenticated = token ? await validateSessionToken(token) : false;

  if (!authenticated) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const loginUrl = new URL("/admin/login", request.url);
    if (pathname !== "/admin") {
      loginUrl.searchParams.set("from", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/admin/:path*"],
};
