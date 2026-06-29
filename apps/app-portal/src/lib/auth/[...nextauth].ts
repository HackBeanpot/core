import NextAuth from "next-auth"
import MainEmailProvider from "./email-transport.ts";

export const authOptions = {
  providers: [
    MainEmailProvider
  ],
}

export default NextAuth(authOptions);