//Next middleware, redirects unauthed users from protected routes

//Middleware intercepts at every requests and is a preliminary check to whether a user is authorized to visit a page
//  or not. The protected pages matched by the regex represent pages that should be always available to public without
//  having needed to login in advance.
//Unauthenticated requests to matched routes are redirected to sign-in

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authLog } from "@/lib/auth/log";

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  // JWT session cookie name differs by protocol (Secure prefix over HTTPS).
  const hasSessionCookie =
    request.cookies.has("next-auth.session-token") ||
    request.cookies.has("__Secure-next-auth.session-token");
  authLog("middleware", `hit ${pathname}${search}`, {
    authenticated: hasSessionCookie,
  });
  return NextResponse.next();
}

//the matcher was written with assistance of AI
export const config = {
  matcher: [
    /*
     * Protect everything EXCEPT:
     *  - /api/auth/*      NextAuth's own endpoints (must stay public)
     *  - /_next/static,/_next/image, /favicon.ico   build/static assets
     *  - the landing page "/" and /login             public entry points
     * Add any other public path to this negative lookahead as you build it.
     */
    "/((?!auth|_next/static|_next/image|favicon.ico|login$|$).*)",
  ],
};
