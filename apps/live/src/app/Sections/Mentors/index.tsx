import React from "react";
import Image from "next/image";
import { Section } from "@repo/ui";
import MentorsTable from "./MentorsTable";

const MentorSectionBackground = () => {
  return (
    <div className="w-full h-full overflow-hidden pointer-events-none relative">
      <Image
        src="/MentorSectionBackground.svg"
        alt="mentorsectionbackground"
        fill
        className="object-cover"
      />
    </div>
  );
};

const MentorSectionContent = async () => {
  return (
    <div className="py-24 px-48">
      <p className="text-[clamp(3rem,7vw,7rem)] text-[#546ECD] font-bold font-Wilden drop-shadow-lg">
        Our Mentors
      </p>
      <p className="font-GT-Walsheim-Regular text-[#333333]">
        Need expert advice? Our mentors are here to help! Filter by shift,
        virtual status, expertise, or company to find the right support. Connect
        on our hackathon platform and get insights to take your project to the
        next level!
      </p>
      <MentorsTable />
    </div>
  );
};

const MentorSection = () => {
  return (
    <Section
      name="Mentor Section"
      background={<MentorSectionBackground />}
      content={<MentorSectionContent />}
      height={125}
    />
  );
};

export default MentorSection;
