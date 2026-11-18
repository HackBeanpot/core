import "@repo/ui/styles.css";
import "../../../../packages/util/src/fonts/fonts.css";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";

// Self-hosted (latin subset) rather than next/font/google, which downloads
// from Google Fonts at build time and has failed Vercel builds when that
// response couldn't be parsed. Merriweather is the variable font, so every
// weight from 300 to 900 is available.
const amarante = localFont({
  src: "./fonts/Amarante-Regular-Latin.woff2",
  weight: "400",
  variable: "--font-amarante",
});

const merriweather = localFont({
  src: "./fonts/Merriweather-Latin.woff2",
  weight: "300 900",
  variable: "--font-merriweather",
});

// Also declared in packages/util fonts.css, but loading it there means no
// preload and no size-matched fallback, so text visibly swaps and shifts
// once the font arrives. next/font provides both, like the fonts above.
const specialGothic = localFont({
  src: "./fonts/SpecialGothicCondensedOne-Regular.ttf",
  weight: "400",
  variable: "--font-gothic",
});

export const metadata: Metadata = {
  title: "HackBeanpot",
  description:
    "All things HackBeanpot, a 5013c non-profit hackathon for undergraduates in Boston and surrounding areas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="w-screen overflow-x-hidden bg-museum-black">
      <body
        className={`${amarante.variable} ${merriweather.variable} ${specialGothic.variable} font-merriweather`}
      >
        {children}
      </body>
    </html>
  );
}
