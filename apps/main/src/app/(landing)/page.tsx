import { Section } from "@repo/ui";
import {
  Stats,
  Values,
  FAQSection,
  Landing,
  Keynote,
  Calendar,
  Apply
} from "./Sections";
import { Footer, NavBar } from "../lib/Components";
import React from "react";
import About from "./Sections/About";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen bg-light-yellow">
      <NavBar />
      <Landing />
      <Apply />
      <Stats />
      <About />
      <Values />
      <Keynote />
      <Calendar />
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
