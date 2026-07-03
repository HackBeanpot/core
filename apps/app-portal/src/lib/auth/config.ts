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
    // signIn: "/login", // point at a custom sign-in page once you build one
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
};
