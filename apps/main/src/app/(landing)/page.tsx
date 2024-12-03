import { Section } from "@repo/ui";
import { Stats } from "./Sections";
import { FAQDropdown } from "@repo/ui";
import { Footer, NavBar } from "../lib/Components";
import React from "react";

export default function Page(): JSX.Element {
  const q = "Question?";
  const a =
    "ANswejoidfjlsdkjfoweidjlksdfjklsdjflskjhfgksjdhglskdjfghslkdjfghslkdfjghskldjfghskldjfghsdkljfghsdlkfg";
  return (
    <main className="flex flex-col items-center min-h-screen">
      <NavBar />
      <Stats />
      <FAQDropdown dropdownQuestion={q} dropdownAnswer={a} />
      <Section
        name="about"
        background={<>about</>}
        content={<></>}
        height={70}
      />
      <Section
        name="projects"
        background={<>projects</>}
        content={<></>}
        height={70}
      />
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
