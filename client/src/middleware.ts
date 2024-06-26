import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/dashboard/students") &&
      req.nextauth.token?.isTeacher !== false
    )
      return NextResponse.rewrite(new URL("/auth/signin", req.url));
    if (
      req.nextUrl.pathname.startsWith("/dashboard/teachers") &&
      req.nextauth.token?.isTeacher !== true
    )
      return NextResponse.rewrite(new URL("/auth/signin", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/students/:path*", "/dashboard/teachers/:path*"],
};