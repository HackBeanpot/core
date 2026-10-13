import "@repo/ui/styles.css";
import "../../../../packages/util/src/fonts/fonts.css";
import "./globals.css";
import type { Metadata } from "next";
import { Amarante, Merriweather } from "next/font/google";
import localFont from "next/font/local";
import React from "react";
import { Providers } from "./providers";

const amarante = Amarante({
  weight: ["400"],
  variable: "--font-amarante",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  subsets: ["latin"],
});

// Also declared in packages/util fonts.css, but loading it there means no
// preload and no size-matched fallback, so text visibly swaps and shifts
// once the font arrives. next/font provides both, like the Google fonts above.
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
    <html lang="en" className="w-screen overflow-x-hidden bg-canopyGreen">
      <body
        className={`${amarante.variable} ${merriweather.variable} ${specialGothic.variable}`}
        style={{ fontFamily: "var(--font-merriweather)" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
