"use client"
//email input form, calls signIn("email")
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { isAdminEmail } from "@/lib/auth/roles";
import icon from "@/app/icon.ico";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex email checker

type Status = "idle" | "loading" | "sent";

export function SignInForm() {
  const [dotCount, setDotCount] = useState(1);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setDotCount((c) => (c % 3) + 1);
    }, 800);
    return () => clearInterval(id);
  }, []);

  async function handleSignIn() {
    // invalid email -> inline error, no request sent
    if (!EMAIL_RE.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(null);
    setStatus("loading");

    try {
      // signIn() handles CSRF, form-encoding, and the redirect for us.
      // redirect:false → we drive the UI state ourselves instead of navigating.
      // The callbackUrl is baked into the magic link; the admin layout
      // re-checks the role server-side, so this is routing, not authorization.
      const res = await signIn("email", {
        email: email.trim(),
        redirect: false,
        callbackUrl: isAdminEmail(email) ? "/admin" : "/dashboard",
      });

      if (res?.error) {
        toast.error(
          "Something went wrong sending your sign-in link. Please try again.",
        );
        setStatus("idle");
        return;
      }

      setStatus("sent");
    } catch {
      // network failure (signIn threw)
      toast.error("Network error. Check your connection and try again.");
      setStatus("idle");
    }
  }

  return (
    <>
      <Toaster />
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        {/*icon*/}
        <Image src={icon} alt="HBP Logo" width={64} height={64} />
        {/*title*/}
        <p className={"mt-4 text-black text-2xl"}>Login to HackBeanpot!</p>

        {/*input area*/}
        <div className={"w-[250px]"}>
          {/*input*/}
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(null);
            }}
            className={"w-full p-1 mt-4 border-2 rounded-md"}
          />
          {/*confirm*/}
          <button
            className={
              "w-full bg-starlightBlueLight text-white p-1 px-5 mt-4 border-2 rounded-md disabled:opacity-50"
            }
            onClick={handleSignIn}
            disabled={status === "loading"}
          >
            Sign in with email
          </button>

          {/*status / error message*/}
          <div className={"w-full flex flex-row items-end min-h-[2rem] pb-2"}>
            {emailError ? (
              <p className={"w-full text-firecrackerRed text-end text-[12px]"}>
                {emailError}
              </p>
            ) : status === "loading" ? (
              <p className={"w-full text-[#AAAAAA] text-end"}>
                Loading{".".repeat(dotCount)}
                {" ".repeat(4 - dotCount)}
              </p>
            ) : status === "sent" ? (
              <p
                className={
                  "w-full text-darkGreen text-end text-[12px] whitespace-nowrap"
                }
              >
                Check your email for a sign-in link!
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
