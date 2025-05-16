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

  return (
    <main className="flex flex-col items-center min-h-screen">
      <NavBar />
      <Section
        name={"sponsors"}
        background={<SponsorsBackground />}
        content={<SponsorsContent ref={ref} />}
        height={(contentHeight / windowHeight) * 100 + 40}
      />
      <Footer />
    </main>
  );
}
