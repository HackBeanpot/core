"use client";

import React, { useRef } from "react";
import useWindowSize from "@util/hooks/useWindowSize";
import useContentHeight from "@util/hooks/useContentHeight";
import ProjectsBackground from "./background";
import ProjectsContent from "./content";
import { Footer, NavBar } from "../lib/Components";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [contentHeight] = useContentHeight(ref);

  if (!windowHeight || !windowWidth) return null;

  const mainHeight = Math.max(contentHeight, windowHeight);

  return (
    <main
      className="flex flex-col items-center min-h-screen relative"
      style={{ minHeight: mainHeight }}
    >
      <div className="absolute inset-0 w-full h-[90%] z-0 pointer-events-none">
        <ProjectsBackground />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <NavBar />
        <ProjectsContent ref={ref} />
        <div className="mt-96">
          <Footer />
        </div>
      </div>
    </main>
  );
}
