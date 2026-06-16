//auth error display (callback errors, expired links, etc.)
import React from "react";
import Link from "next/link";
import TiledBackground from "@/components/ui/tiled-background";

const ERROR_MESSAGES: Record<string, string> = {
  Configuration:
    "There's a problem with the server configuration. Please reach out to the HackBeanpot team.",
  AccessDenied: "You don't have permission to sign in.",
  Verification:
    "This sign-in link has expired or has already been used. Please request a new one.",
  OAuthSignin: "We couldn't start the sign-in process. Please try again.",
  OAuthCallback: "We couldn't complete the sign-in process. Please try again.",
  OAuthCreateAccount: "We couldn't create your account. Please try again.",
  EmailCreateAccount: "We couldn't create your account. Please try again.",
  Callback: "Something went wrong while signing you in. Please try again.",
  OAuthAccountNotLinked:
    "This email is already linked to a different sign-in method. Please use the method you signed up with.",
  EmailSignin: "We couldn't send the sign-in email. Please try again.",
  CredentialsSignin:
    "Sign in failed. Please check the details you provided and try again.",
  SessionRequired: "Please sign in to access this page.",
  Default: "Something went wrong while signing you in. Please try again.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { error?: string };
}): JSX.Element {
  const code = searchParams?.error ?? "Default";
  const message = ERROR_MESSAGES[code] ?? ERROR_MESSAGES.Default;

  return (
    <div className="relative w-[100vw] h-[100vh] overflow-hidden">
      <TiledBackground />

      {/* error message */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="max-w-md text-gray-700">{message}</p>
      </div>

      {/* back-to-homepage button */}
      <Link
        href="/auth/signin"
        className="absolute bottom-6 right-6 z-10 rounded-md bg-[#352A28] px-4 py-2 text-white text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Back to homepage
      </Link>
    </div>
  );
}
