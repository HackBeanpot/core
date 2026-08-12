"use client";

import React from "react";
import { useSession } from "next-auth/react";

type Status = "idle" | "loading" | "success" | "error";

// Subscribes the signed-in applicant's email to the mailing list via the existing
// /api/joinMailingList route (Beehiiv-backed) — same request shape as
// apps/main's NewsletterSignup.
export default function JoinMailingListButton(): JSX.Element {
  const { data: session } = useSession();
  const [status, setStatus] = React.useState<Status>("idle");

  async function handleClick() {
    const email = session?.user?.email;
    if (!email) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/joinMailingList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reactivate_existing: false }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-semibold text-darkGreen">
        You&apos;re on the list! 🎉
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => void handleClick()}
        disabled={status === "loading"}
        className="text-left text-blue-600 font-semibold hover:underline disabled:opacity-50"
      >
        {status === "loading" ? "Joining…" : "Join the mailing list"}
      </button>
      {status === "error" && (
        <p className="text-xs text-firecrackerRed">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
