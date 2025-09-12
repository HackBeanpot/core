import {
  Stats,
  Values,
  FAQSection,
  Landing,
  Keynote,
  Calendar,
  Testimonials,
  Apply,
  About,
} from "./Sections";
import { Footer, NavBar } from "../lib/Components";
import Head from "next/head";
import React from "react";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen bg-canopyGreen">
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
