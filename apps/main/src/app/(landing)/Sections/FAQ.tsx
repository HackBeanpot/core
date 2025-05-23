import React from "react";
import FAQDropdown from "@repo/ui/FAQDropdown";
import FAQBackground from "../../lib/Assets/SVG/FAQBackground";

export default function FAQSection(): React.ReactNode {
  return (
    <div className="w-full min-h-screen bg-cover overflow-visible relative">
      <div className="absolute w-full -mt-16">
        <FAQBackground
          className="w-full h-[1450px]"
          preserveAspectRatio="xMidYMax slice"
        />
      </div>
      <div className="relative flex flex-col px-28 py-20 space-y-10 font-GT-Walsheim-Regular z-10 min-h-[1400px]">
        <h1 className="text-7xl font-bold text-white mb-16 flex justify-center font-Wilden-Regular z-10">
          FAQs
        </h1>

        <div className="w-3/5 mx-auto flex">
          <h3 className="text-2xl font-semibold text-white">
            Time and Location
          </h3>
        </div>

        <div className="flex justify-center w-3/5 self-center">
          <FAQDropdown
            dropdownQuestion="When and where is HackBeanpot 2025?"
            dropdownAnswer="Location TBD!"
          />
        </div>

        <div className="flex justify-center w-3/5 self-center">
          <FAQDropdown
            dropdownQuestion="Will HackBeanpot 2025 be in-person or online?"
            dropdownAnswer="In person!"
          />
        </div>
        <div className="flex justify-center w-3/5 self-center">
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

        <div className="flex justify-center w-3/5 self-center">
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

        <div className="flex justify-center w-3/5 self-center">
          <FAQDropdown
            dropdownQuestion="What kind of projects can I work on?"
            dropdownAnswer="..."
          />
        </div>
      </div>
    </div>
  );
}
