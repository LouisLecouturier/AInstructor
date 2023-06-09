import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("token: ", req.nextauth.token);

    if (req.nextUrl.pathname.startsWith("/dashboard/students") && req.nextauth.token?.is_teacher !== false)
      return NextResponse.rewrite(
        new URL("/auth/signin", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/dashboard/teachers") && req.nextauth.token?.is_teacher !== true)
      return NextResponse.rewrite(
        new URL("/auth/signin", req.url)
      );
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