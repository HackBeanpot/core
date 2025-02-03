import { Section } from "@repo/ui";
import { Stats, Values, FAQSection, Landing, Keynote } from "./Sections";
import { Footer, NavBar } from "../lib/Components";
import React from "react";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen bg-light-yellow">
      <NavBar />
      <Landing />
      <Stats />
      <Section name="about" background={<></>} content={<></>} height={70} />
      <Values />
      <Keynote />
      <Section
        name="events calendar"
        background={<></>}
        content={<></>}
        height={70}
      />
      <Section
        name="testimonals"
        background={<></>}
        content={<></>}
        height={70}
      />
      <FAQSection />
      <Footer />
    </main>
  );
}
