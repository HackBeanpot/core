"use client";

import React, { FormEvent, useId, useState } from "react";
import Image from "next/image";
import { Merriweather } from "next/font/google";
import clsx from "clsx";
import isValidEmail from "@repo/util/functions/isValidEmail";
import { SOCIAL_LINKS } from "../siteConfig";
import ExternalLink from "./ExternalLink";
import { Button } from "./museum";

const merriweather = Merriweather({
  weight: ["300", "400"],
  subsets: ["latin"],
});

type MailingStatus = "idle" | "loading" | "success" | "error" | "invalid";

const statusMessages: Partial<Record<MailingStatus, string>> = {
  success: "Thanks for signing up! Keep an eye on your inbox.",
  error: "Something went wrong. Please try again in a moment.",
  invalid: "Please enter a valid email address.",
};

// Instagram and LinkedIn are exported from Figma as whole buttons with the
// shadow baked in (86px SVG around a 46px button), so they're offset by the
// shadow. TikTok is a plain icon inside a ghost Button.
const BakedSocialButton = ({
  href,
  label,
  src,
}: {
  href: string;
  label: string;
  src: string;
}) => (
  <ExternalLink
    href={href}
    aria-label={label}
    className="relative block size-[46px] shrink-0 rounded-xl transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
  >
    <Image
      src={src}
      alt=""
      width={86}
      height={86}
      className="absolute inset-[-43.48%] block max-w-none"
    />
  </ExternalLink>
);

const MailingListForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<MailingStatus>("idle");
  const messageId = useId();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/joinMailingList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const message = statusMessages[status];

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby={`${messageId}-heading`}
      className="flex w-[411px] max-w-full shrink-0 flex-col items-start gap-5"
    >
      <div className="flex w-full flex-col items-start gap-1 text-white">
        <h2
          id={`${messageId}-heading`}
          className="font-SpecialGothicCondensedOne-Regular text-[28px] uppercase leading-[1.4]"
        >
          Join our mailing list
        </h2>
        <p className={clsx(merriweather.className, "text-base font-light")}>
          Stay up to date with HackBeanpot by signing up for our mailing list!
        </p>
      </div>
      <div className="relative flex w-full items-stretch gap-3">
        {/* Figma "Text Field" (5539:792). 16px text so iOS doesn't zoom. */}
        <input
          type="email"
          name="email"
          autoComplete="email"
          aria-label="Email address"
          aria-invalid={status === "invalid" || undefined}
          aria-describedby={message ? messageId : undefined}
          placeholder="example@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "loading") setStatus("idle");
          }}
          className={clsx(
            merriweather.className,
            "min-w-0 flex-1 rounded-lg border bg-[rgba(244,244,244,0.2)] px-4 py-3 text-base text-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1),inset_0px_0px_20px_0px_rgba(255,255,255,0.1)] backdrop-blur-[4px] placeholder:text-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            status === "invalid" ? "border-[#ff9d8a]" : "border-[#ffda82]",
          )}
        />
        <Button
          type="submit"
          variant="gold"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
        >
          {status === "loading" ? "Sending…" : "Submit"}
        </Button>
        <p
          id={messageId}
          role="status"
          aria-live="polite"
          className={clsx(
            merriweather.className,
            "absolute left-0 top-full mt-2 text-sm",
            status === "success" ? "text-[#ffd268]" : "text-[#ff9d8a]",
          )}
        >
          {message}
        </p>
      </div>
    </form>
  );
};

/**
 * Site footer: Back to top, socials, 501(c)(3) line, and the mailing list
 * form (posts to `api/joinMailingList`).
 *
 * Transparent: it renders over whatever its parent paints (the FAQ scene owns
 * the art behind it). Figma: Components → Footer (5388:305), in context at the
 * bottom of LG FAQ (5597:20877).
 */
const Footer = () => {
  // TODO(MS-401): swap for the Lenis scrollTo.
  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full bg-transparent">
      <div className="flex flex-row items-center justify-between gap-10 px-20 pb-[93px] pt-[70px] tablet:px-12 tablet:pb-16 mobile-xl:flex-col mobile-xl:items-start mobile-xl:px-5 mobile-xl:pb-12 mobile:flex-col mobile:items-start mobile:px-5 mobile:pb-12">
        <div className="flex w-[343px] max-w-full shrink-0 flex-col items-start gap-4">
          <Button variant="ghost" onClick={handleBackToTop}>
            Back to top
          </Button>
          <div className="flex items-center gap-2">
            <BakedSocialButton
              href={SOCIAL_LINKS.instagram}
              label="HackBeanpot on Instagram"
              src="/footer/instagram-ghost.svg"
            />
            <BakedSocialButton
              href={SOCIAL_LINKS.linkedin}
              label="HackBeanpot on LinkedIn"
              src="/footer/linkedin-ghost.svg"
            />
            <Button
              variant="ghost"
              size="icon"
              href={SOCIAL_LINKS.tiktok}
              external
              aria-label="HackBeanpot on TikTok"
            >
              <Image
                src="/footer/tiktok-icon-white.svg"
                alt=""
                width={20}
                height={20}
              />
            </Button>
          </div>
          <p
            className={clsx(
              merriweather.className,
              "text-sm font-light text-[#cecece]",
            )}
          >
            HackBeanpot is a 501(c)(3) non-profit organization.
          </p>
        </div>

        <MailingListForm />
      </div>
    </footer>
  );
};

export default Footer;
