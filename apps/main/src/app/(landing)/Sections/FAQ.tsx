import React from "react";
import FAQDropdown from "@repo/ui/FAQDropdown";
import FAQBackground from "../../lib/Assets/SVG/FAQBackground";

export default function FAQSection(): React.ReactNode {
  return (
    <div className="w-full h-full mb-48 bg-cover overflow-hidden">
      <div className="absolute w-full -mt-16">
        <FAQBackground height={1500} width={ 1920} preserveAspectRatio="none"/>
      </div>
      <div className="flex flex-col p-28 space-y-5 font-GT-Walsheim-Regular">
        <h1 className="text-7xl font-bold text-white mb-16 flex justify-center font-Wilden-Regular z-10">
          FAQs
        </h1>

        <div className="w-3/5 mx-auto flex z-10">
          <h3 className="text-2xl font-semibold text-white">
            Time and Location
          </h3>
        </div>

        <div className="flex justify-center w-3/5 self-center">
          <FAQDropdown
            dropdownQuestion="When and where is HackBeanpot 2026?"
            dropdownAnswer="HackBeanpot will take place in the spring semester of 2026. Location TBD!"
          />
        </div>

        <div className="flex justify-center w-3/5 self-center">
          <FAQDropdown
            dropdownQuestion="Will HackBeanpot 2026 be in-person or online?"
            dropdownAnswer="HackBeanpot 2026 will be in-person!"
          />
        </div>
        <div className="flex justify-center w-3/5 self-center">
          <FAQDropdown
            dropdownQuestion="How long is the event?"
            dropdownAnswer="Our Hackathon is typically 36 hours long!"
          />
        </div>

        <div className="w-3/5 mx-auto flex">
          <h3 className="text-2xl font-semibold text-white pt-10 z-10">
            Application Logistics
          </h3>
        </div>

        <div className="flex justify-center w-3/5 self-center">
          <FAQDropdown
            dropdownQuestion="How do I apply to attend HackBeanpot?"
            dropdownAnswer="Our applications have not been released yet for the 2026 Hackathon! Be sure to connect with us on our social media or join our mailing list for any updates!"
          />
        </div>

        <div className="w-3/5 mx-auto flex">
          <h3 className="text-2xl font-semibold text-white pt-10 z-10">
            Event Logistics
          </h3>
        </div>

        <div className="flex justify-center w-3/5 self-center">
          <FAQDropdown
            dropdownQuestion="What kind of projects can I work on?"
            dropdownAnswer={
              <>
                Check out our <a href="https://www.hackbeanpot.com/projects" className="text-blue-500 underline" 
                target="_blank" rel="noopener noreferrer">Projects</a> page or check us out on <a 
                href="https://hackbeanpot2025.devpost.com/" className="text-blue-500 underline" 
                target="_blank" rel="noopener noreferrer">Devpost</a>!
              </>
            }
          />
        </div>

        <div className="flex justify-center w-3/5 self-center">
          <FAQDropdown
            dropdownQuestion="How do I find a team?"
            dropdownAnswer="..."
          />
        </div>
        <div className="flex justify-center w-3/5 self-center">
          <FAQDropdown
            dropdownQuestion="What prizes are there this year?"
            dropdownAnswer="We will be releasing more information about our prizes soon!"
          />
        </div>
      </div>
    </div>
  );
}
