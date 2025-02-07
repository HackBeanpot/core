import {
  Stats,
  Values,
  FAQSection,
  Landing,
  Keynote,
  Calendar,
  Testimonials,
  Apply
} from "./Sections";
import { Footer, NavBar } from "../lib/Components";
import React from "react";
import About from "./Sections/About";
import Head from "next/head";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen bg-light-yellow">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar />
      <Landing />
      <Apply />
      <Stats />
      <About />
      <Values />
      <Keynote />
      <Calendar />
      <Testimonials />
      <FAQSection />
      <Footer />
    </main>
  );
}
