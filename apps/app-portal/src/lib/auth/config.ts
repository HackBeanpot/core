//NextAuth options (providers, callbacks, session strategy)

import type { NextAuthOptions } from "next-auth";
import MainEmailProvider from "./email-transport";
import { authAdapter } from "./adapter";
import { authLog, mask } from "./log";

export const authOptions: NextAuthOptions = {
  adapter: authAdapter,
  providers: [MainEmailProvider],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  // NextAuth's own verbose logging (routes hit, errors) in dev.
  debug: process.env.NODE_ENV !== "production",
  // Route NextAuth's internal logs through our prefixed logger.
  logger: {
    error(code, metadata) {
      authLog("event", `NextAuth ERROR: ${code}`, metadata);
    },
    warn(code) {
      authLog("event", `NextAuth warn: ${code}`);
    },
    debug(code, metadata) {
      authLog("event", `NextAuth debug: ${code}`, metadata);
    },
  },

  // Lifecycle events — the clearest high-level trace of the flow.
  events: {
    async signIn({ user, isNewUser }) {
      authLog("event", `signIn OK: ${user.email}`, { isNewUser });
    },
    async signOut() {
      authLog("event", "signOut");
    },
    async createUser({ user }) {
      authLog("event", `createUser: ${user.email}`, { id: user.id });
    },
    async session({ session }) {
      authLog("event", `session read: ${session.user?.email ?? "(anon)"}`);
    },
  },

  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },

  callbacks: {
    // Gatekeeper: log every sign-in attempt (return false here to reject one).
    async signIn({ user, email }) {
      authLog("callback", `signIn attempt: ${user?.email ?? "(unknown)"}`, {
        verificationRequest: email?.verificationRequest ?? false,
      });
      return true;
    },
    // Runs when the JWT (the cookie's contents) is created/updated.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      authLog("callback", `jwt: building token for ${token.email ?? "(none)"}`, {
        id: token.id,
        sub: token.sub,
        jti: mask(token.jti as string),
      });
      return token;
    },
    // Runs when app code reads the session; shapes what the app sees.
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      authLog("callback", `session: exposing ${session.user?.email ?? "(none)"}`, {
        id: (session.user as { id?: string })?.id,
      });
      return session;
    },
  },
};
