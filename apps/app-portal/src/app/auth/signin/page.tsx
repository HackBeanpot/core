//magic-link email entry — skips straight to /dashboard if already signed in
import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { SignInForm } from "@/components/auth/SignInForm";
import {isAdminEmail} from "@/lib/auth/roles.ts";

export default async function Page({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}): Promise<JSX.Element> {
  // read cookie - see if valid session in DB - if so, automatically redir user to logged in part
  const session = await getSession();
  if (session?.user) {
    redirect(isAdminEmail(session.user.email) ? "/admin" : "/dashboard");
  }

  // callbackUrl is only present when middleware bounced an unauthed user here
  // from a protected route. The form uses it both to prompt "sign in first" and
  // as the post-sign-in destination baked into the magic link.
  return <SignInForm callbackUrl={searchParams?.callbackUrl} />;
}
