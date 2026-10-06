import type { Metadata } from "next";
import React from "react";
import DecorDemo from "./DecorDemo";

export const metadata: Metadata = {
  title: "Decor primitives · HackBeanpot",
  robots: { index: false, follow: false },
};

export default function DecorPage() {
  return <DecorDemo />;
}
