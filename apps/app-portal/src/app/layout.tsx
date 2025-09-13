import "./globals.css";
import "../styles/main.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HackBeanpot - Application Portal",
  description: "Apply to HackBeanpot!",
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
