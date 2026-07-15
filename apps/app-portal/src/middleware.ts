//Next middleware, redirects unauthed users from protected routes

//Middleware intercepts at every requests and is a preliminary check to whether a user is authorized to visit a page
//  or not. The protected pages matched by the regex represent pages that should be always available to public without
//  having needed to login in advance.
//Unauthenticated requests to matched routes are redirected to sign-in

import { NextResponse } from "next/server";

export default function middleware() {
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
