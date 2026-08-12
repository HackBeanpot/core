//Next middleware, redirects unauthed users from protected routes

//Middleware intercepts every request and is a preliminary check to whether a user is authorized to visit a page
//  or not. The protected pages matched by the regex represent pages that should be always available to public without
//  having needed to login in advance.
//Unauthenticated requests to matched routes are redirected to sign-in.
//
//Session strategy is "database" (see lib/auth/config.ts), so the session cookie is an opaque
//token that can't be decoded/verified here in the Edge runtime (no Mongo driver available).
//Instead we ask NextAuth's own session endpoint — which already runs server-side with DB
//access — to resolve it, forwarding the incoming request's cookies.

import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const sessionUrl = new URL("/auth/session", req.url);
  const sessionRes = await fetch(sessionUrl, {
    headers: { cookie: req.headers.get("cookie") ?? "" },
  });

  const session = await sessionRes.json().catch(() => null);

  if (!session?.user) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

//the matcher was written with assistance of AI
export const config = {
  matcher: [
    /*
     * Protect everything EXCEPT:
     *  - /api/*                                     API routes enforce their own auth
     *                                                (requireUser/requireAdmin) and must return
     *                                                JSON on failure, not an HTML redirect.
     *  - /auth/*                                     NextAuth's own endpoints (its handler is
     *                                                mounted at /auth, not the default /api/auth —
     *                                                see providers.tsx) plus the signin/verify/error
     *                                                pages. Must stay public.
     *  - /_next/static, /_next/image, /favicon.ico   build/static assets
     *  - the landing page "/"                        public entry point
     * Add any other public path to this negative lookahead as you build it.
     */
    "/((?!api|auth|_next/static|_next/image|favicon.ico|$).*)",
  ],
};
