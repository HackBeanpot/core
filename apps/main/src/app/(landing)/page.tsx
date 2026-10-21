import React from "react";
import Image from "next/image";
import Link from "next/link";
import PlaceBackground from "../placeholder/placeBackground";
import Rollercoaster from "../placeholder/rollercoaster";
import HackBeanpotLogo from "../placeholder/HackBeanpotLogo";
import NewsletterSignup from "../placeholder/NewsletterSignup";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-starlightBlueDark overflow-hidden fixed inset-0">
      {/* Cover the green html background (incl. mobile overscroll), scoped to this page */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "html,body{background-color:#091F36 !important;overscroll-behavior:none;}",
        }}
      />
      {/* Sunburst rays - back layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <PlaceBackground />
      </div>

      {/* Rollercoaster scene - front layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="w-full h-full flex items-center justify-center tablet:items-end mobile-xl:items-end mobile:items-end">
          <div className="w-full h-auto max-h-full origin-bottom tablet:scale-105 mobile-xl:scale-125 mobile:scale-150">
            <Rollercoaster />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-screen flex flex-col">
        {/* Header - Logo and Social Icons */}
        <header className="flex justify-between items-center px-12 tablet:px-8 mobile-xl:px-6 mobile:px-5 py-6 tablet:py-5 mobile-xl:py-4 mobile:py-4 flex-shrink-0">
          {/* Logo */}
          <div className="flex items-center">
            <HackBeanpotLogo className="h-14 tablet:h-12 mobile-xl:h-10 mobile:h-9 w-auto" />
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 tablet:gap-3 mobile:gap-2.5">
            <Link
              href="https://www.instagram.com/hackbeanpot/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full p-3 tablet:p-2.5 mobile-xl:p-2.5 mobile:p-2 bg-firecrackerRed hover:bg-firecrackerRedDark transition-colors"
            >
              <Image
                src="/footer-logos/insta-logo.svg"
                alt="Instagram"
                width={24}
                height={24}
                className="w-6 h-6 tablet:w-5 tablet:h-5 mobile-xl:w-5 mobile-xl:h-5 mobile:w-4 mobile:h-4"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/hackbeanpot-inc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full p-3 tablet:p-2.5 mobile-xl:p-2.5 mobile:p-2 bg-firecrackerRed hover:bg-firecrackerRedDark transition-colors"
            >
              <Image
                src="/footer-logos/linkedin-logo.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="w-6 h-6 tablet:w-5 tablet:h-5 mobile-xl:w-5 mobile-xl:h-5 mobile:w-4 mobile:h-4"
              />
            </Link>
            <Link
              href="https://www.tiktok.com/@hackbeanpot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="rounded-full p-3 tablet:p-2.5 mobile-xl:p-2.5 mobile:p-2 bg-firecrackerRed hover:bg-firecrackerRedDark transition-colors"
            >
              <Image
                src="/footer-logos/tiktok-logo.svg"
                alt="TikTok"
                width={24}
                height={24}
                className="w-6 h-6 tablet:w-5 tablet:h-5 mobile-xl:w-5 mobile-xl:h-5 mobile:w-4 mobile:h-4"
              />
            </Link>
          </div>
        </header>

        {/* Main Content - Upper center */}
        <div className="flex-1 flex flex-col items-center justify-start -mt-10 tablet:mt-0 mobile-xl:mt-0 mobile:mt-0 pt-0 tablet:pt-[4vh] mobile-xl:pt-[4vh] mobile:pt-[3vh] px-8 mobile-xl:px-6 mobile:px-5 overflow-hidden">
          {/* Title */}
          <h1 className="text-6xl tablet:text-5xl mobile-xl:text-4xl mobile:text-3xl font-NeulisNeue-Bold text-carouselCreamLight text-center mb-4 tablet:mb-4 mobile-xl:mb-3 mobile:mb-2 max-w-4xl leading-tight">
            We hope you enjoyed the ride!
          </h1>

          {/* Subtitle */}
          <p className="text-xl tablet:text-lg mobile-xl:text-base mobile:text-sm font-DMSans-Regular text-white text-center mb-8 tablet:mb-7 mobile-xl:mb-5 mobile:mb-4 max-w-2xl mobile-xl:max-w-md mobile:max-w-xs leading-snug">
            Thank you for coming to HackBeanpot 2026! Sign up for our newsletter
            for more information and any upcoming events!
          </p>

          {/* Newsletter Signup */}
          <NewsletterSignup />

          {/* Last Year's Site Link */}
          <Link
            href="https://2026.hackbeanpot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline hover:text-carouselCreamLight transition-colors text-lg tablet:text-base mobile:text-sm font-DMSans-Bold flex items-center gap-2 group"
          >
            Visit our last year&apos;s site
            <svg
              className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>

          {/* Sponsorship Contact */}
          <p className="mt-4 mobile:mt-3 text-lg tablet:text-base mobile:text-sm font-DMSans-Regular text-white text-center max-w-2xl mobile-xl:max-w-md mobile:max-w-xs">
            Interested in sponsoring us? Reach out to{" "}
            <Link
              href="mailto:sponsorship@hackbeanpot.com"
              className="font-DMSans-Bold underline hover:text-carouselCreamLight transition-colors"
            >
              sponsorship@hackbeanpot.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
