import { Section } from "@repo/ui";
import { Footer, NavBar } from "../lib/Components";
import ProjectsBackground from "./background";
import ProjectsContent from "./content";
import React from "react";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <NavBar />
      <Section
        name={"projects"}
        background={<ProjectsBackground />}
        content={<ProjectsContent />}
        height={500}
      />
      <Footer />
    </main>
  );
}
