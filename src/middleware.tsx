import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return res;
}
