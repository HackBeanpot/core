import { Section } from "@repo/ui";
import { Stats, Values } from "./Sections";
import { Footer, NavBar } from "../lib/Components";
import React from "react";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <NavBar />
      <Stats />
      <Section
        name="about"
        background={<>about</>}
        content={<></>}
        height={70}
      />
      <Values />
      <Section name="projects" background={<></>} content={<></>} height={70} />
      <Section
        name="sponsors"
        background={<>sponsors</>}
        content={<></>}
        height={70}
      />
      <Section name="team" background={<>team</>} content={<></>} height={70} />
      <Section
        name="sponsor-us"
        background={<>sponsor us</>}
        content={<></>}
        height={70}
      />
      <Section
        name="apply"
        background={<>apply</>}
        content={<></>}
        height={70}
      />
      <Footer />
    </main>
  );
}
