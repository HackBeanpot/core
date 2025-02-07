"use client";

import { Section } from "@repo/ui";
import { Footer, NavBar } from "../lib/Components";
import ProjectsBackground from "./background";
import ProjectsContent from "./content";
import React, { useRef } from "react";
import useWindowSize from "@util/hooks/useWindowSize";
import useContentHeight from "@util/hooks/useContentHeight";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const [contentHeight] = useContentHeight(ref);

  if (!windowHeight || !windowWidth) return;

  return (
    <main className="flex flex-col items-center  min-h-screen">
      <NavBar />
      <Section
        name={"projects"}
        background={<ProjectsBackground />}
        content={<ProjectsContent ref={ref} />}
        height={(contentHeight / windowHeight) * 100 + 50}
      />
      <Footer />
    </main>
  );
}
