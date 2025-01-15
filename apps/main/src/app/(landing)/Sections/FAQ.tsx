import React from "react";
import Image from "next/image";
import { Section, FAQDropdown } from "@repo/ui";

const background = (
  <div className="w-full h-full overflow-hidden">
    <Image alt="FAQsBackground" src="/faq_background.png" fill />
  </div>
);

const content = (
  <div className="flex flex-col p-10 space-y-5 mt-20 font-GT-Walsheim-Regular">
    <h1 className="text-6xl font-bold text-white mb-20 flex justify-center font-Wilden-Regular">
      FAQs
    </h1>

    <div className="w-3/5 mx-auto flex">
      <h3 className="text-2xl font-semibold text-white">Time and Location</h3>
    </div>

    <div className="flex justify-center">
      <FAQDropdown
        dropdownQuestion="When and where is HackBeanpot 2025?"
        dropdownAnswer="Location TBD!"
      />
    </div>

    <div className="flex justify-center">
      <FAQDropdown
        dropdownQuestion="Will HackBeanpot 2025 be in-person or online?"
        dropdownAnswer="In person!"
      />
    </div>
    <div className="flex justify-center">
      <FAQDropdown
        dropdownQuestion="How long is the event?"
        dropdownAnswer="long time."
      />
    </div>

    <div className="w-3/5 mx-auto flex">
      <h3 className="text-2xl font-semibold text-white pt-10">
        Application Logistics
      </h3>
    </div>

    <div className="flex justify-center">
      <FAQDropdown
        dropdownQuestion="How do I apply to attend HackBeanpot?"
        dropdownAnswer="Fill out the application here!"
      />
    </div>

    <div className="w-3/5 mx-auto flex">
      <h3 className="text-2xl font-semibold text-white pt-10">
        Event Logistics
      </h3>
    </div>

    <div className="flex justify-center">
      <FAQDropdown
        dropdownQuestion="What kind of projects can I work on?"
        dropdownAnswer="..."
      />
    </div>

    <div className="flex justify-center">
      <FAQDropdown
        dropdownQuestion="How do I find a team?"
        dropdownAnswer="..."
      />
    </div>
    <div className="flex justify-center">
      <FAQDropdown
        dropdownQuestion="What prizes are there this year?"
        dropdownAnswer="We will be releasing more information about our prizes soon!"
      />
    </div>
  </div>
);

export default function FAQSection(): React.ReactNode {
  return (
    <Section
      name={"faqs"}
      background={background}
      content={content}
      height={250}
    />
  );
}
