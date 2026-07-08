//NextAuth options (providers, callbacks, session strategy)

import type { NextAuthOptions } from "next-auth";
import MainEmailProvider from "./email-transport";
import { authAdapter } from "./adapter";

export const authOptions: NextAuthOptions = {
  adapter: authAdapter,
  providers: [MainEmailProvider],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

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
    // Runs when the JWT (the cookie's contents) is created/updated.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Runs when app code reads the session; shapes what the app sees.
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
};
