"use client";

import { Section } from "@repo/ui";
import { Footer, NavBar } from "../lib/Components";
import ProjectsBackground from "./background";
import ProjectsContent from "./content";
import React, { useEffect, useState } from "react";
import useWindowSize from "@util/hooks/useWindowSize";

export default function Page(): JSX.Element {
  const [scrollWindowHeight, setScrollWindowHeight] = useState(0);
  const { height: windowHeight } = useWindowSize();

  useEffect(() => {
    function handleResize() {
      setScrollWindowHeight(document.documentElement.scrollHeight);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resizedHeight = windowHeight
    ? (scrollWindowHeight / windowHeight) * 100
    : 200;

  return (
    <main className="flex flex-col items-center min-h-screen">
      <div>
        <NavBar />
        <Section
          name={"projects"}
          background={<ProjectsBackground />}
          content={<ProjectsContent />}
          height={resizedHeight}
        />
        <Footer />
      </div>
    </main>
  );
}
