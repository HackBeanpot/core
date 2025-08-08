"use client";

import { Footer, NavBar } from "../lib/Components";
import SponsorsBackground from "./background";
import SponsorsContent from "./content";
import React, { useRef } from "react";
import useWindowSize from "@util/hooks/useWindowSize";
import useContentHeight from "@util/hooks/useContentHeight";

export default function Page(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [contentHeight] = useContentHeight(ref);

  if (!windowHeight || !windowWidth) return <></>;

  const mainHeight = Math.max(contentHeight, windowHeight);

  return (
    <main
      className="flex flex-col items-center min-h-screen relative"
      style={{ minHeight: mainHeight }}
    >
      <div className="absolute inset-0 w-full h-[90%] z-0 pointer-events-none">
        <SponsorsBackground />
      </div>
      <div
        className="relative z-10 w-full flex flex-col items-center"
        ref={ref}
      >
        <NavBar />
        <SponsorsContent />
        <div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
