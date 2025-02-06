import {
  Stats,
  Values,
  FAQSection,
  Landing,
  Keynote,
  Calendar,
  Testimonials
} from "./Sections";
import { Footer, NavBar } from "../lib/Components";
import React from "react";
import About from "./Sections/About";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen bg-light-yellow">
      <NavBar />
      <Landing />
      <Stats />
      <About />
      <Values />
      <Keynote />
      <Calendar />
      <Testimonials/>
      <FAQSection />
      <Footer />
    </main>
  );
}
