import "./globals.css";
import "../../../../packages/util/src/fonts/fonts.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Live Site",
  description: "The Live Website for the Hackbeanpot Nonprofit Organization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="w-screen overflow-x-hidden">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
