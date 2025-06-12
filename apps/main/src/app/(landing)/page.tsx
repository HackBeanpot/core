import {
  Stats,
  Values,
  FAQSection,
  Landing,
  Keynote,
  Calendar,
  Testimonials,
  Apply,
} from "./Sections";
import { Footer, NavBar } from "../lib/Components";
// something wrong with the import here (?)
import About from "./Sections/About";
import React from "react";
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
