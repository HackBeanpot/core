"use client";
import { Section } from "@repo/ui";
import { Footer, NavBar } from "../lib/Components";
import ProjectsBackground from "./background";
import ProjectsContent from "./content";
import React from "react";
import { useContext } from "react";
import { MobileContext } from "../providers";

export default function Page(): JSX.Element {
  const isMobile = useContext(MobileContext)
  return (
    <main className="flex flex-col items-center min-h-screen">
      <NavBar />
      <Section
        name={"projects"}
        background={<ProjectsBackground />}
        content={<ProjectsContent />}
        height={isMobile ? 800 : 400}
      />
      <Footer />
    </main>
  );
}
