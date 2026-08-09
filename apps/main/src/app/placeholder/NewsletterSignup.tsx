"use client";

import React from "react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterSignup = () => {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async () => {
    if (status === "loading") return;

    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/joinMailingList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          reactivate_existing: false,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list! 🎉");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  const buttonText = status === "loading" ? "Submitting…" : "Submit";

  return (
    <div className="relative flex flex-row items-center gap-4 tablet:gap-3 mobile:gap-2 w-auto mobile-xl:w-full mobile:w-full max-w-md mobile-xl:max-w-sm mb-6 tablet:mb-5 mobile-xl:mb-5 mobile:mb-4">
      {message && (
        <div
          role="status"
          className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-DMSans-Regular text-white shadow-md ${
            status === "success" ? "bg-emerald-600" : "bg-firecrackerRed"
          }`}
        >
          {message}
        </div>
      )}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={status === "loading"}
        className="w-96 tablet:w-80 mobile-xl:w-auto mobile-xl:flex-1 mobile-xl:min-w-0 mobile:w-auto mobile:flex-1 mobile:min-w-0 px-6 mobile:px-4 py-4 tablet:py-3.5 mobile:py-3 rounded-full bg-carouselCreamLight text-charcoalFog placeholder-charcoalFog placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-firecrackerRed text-lg tablet:text-base mobile:text-sm font-DMSans-Regular"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="px-8 tablet:px-7 mobile:px-5 py-4 tablet:py-3.5 mobile:py-3 flex-shrink-0 bg-marigoldYellow text-charcoalFog font-DMSans-Bold rounded-full hover:bg-marigoldYellowDark transition-colors text-lg tablet:text-base mobile:text-sm whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default NewsletterSignup;
