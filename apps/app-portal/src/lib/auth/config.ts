//NextAuth options (providers, callbacks, session strategy)

import type { NextAuthOptions } from "next-auth";
import MainEmailProvider from "./email-transport";
import { authAdapter } from "./adapter";
import { isAdminEmail } from "./roles";

export const authOptions: NextAuthOptions = {
  adapter: authAdapter,
  providers: [MainEmailProvider],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "database", maxAge: 30 * 24 * 60 * 60 },

  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },

  callbacks: {
    // Gatekeeper: return false here to reject a sign-in.
    async signIn() {
      return true;
    },
    // Runs when app code reads the session; shapes what the app sees.
    async session({ session, user }) {
      if (session.user) {
        (session.user as { id?: string; isAdmin?: boolean }).id = user.id;
        (session.user as { id?: string; isAdmin?: boolean }).isAdmin =
          isAdminEmail(user.email);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
};
