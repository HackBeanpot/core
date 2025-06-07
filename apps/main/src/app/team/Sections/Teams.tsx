"use client";

import React, { useRef } from "react";
import Image from "next/image";
import LinkedInLogo from "@repo/ui/LinkedInLogo";
import useWindowSize from "@repo/util/hooks/useWindowSize";
import {
  TeamsBottomSquiggle,
  TeamsMiddleSquiggle,
  TeamsTopSquiggle,
} from "../../lib/Assets/SVG";

type HeadshotProps = {
  name: string;
  src: string;
};

type TeamSectionsProps = {
  team: keyof typeof teams;
};

const TeamSections = ({ team }: TeamSectionsProps) => {
  return (
    <div>
      <h2 className="text-4xl text-black font-semibold font-GT-Walsheim-Regular">
        {team}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-3  py-5">
        {teams[team].map((member) => (
          <Headshot key={member.name} name={member.name} src={member.src} />
        ))}
      </div>
    </div>
  );
};

const Headshot = ({ name, src }: HeadshotProps) => {
  return (
    <div className="flex flex-col w-fit">
      <Image
        alt={name}
        src={src}
        width={400}
        height={400}
        className="rounded"
      />
      <div className="flex items-center font-semibold">
        <LinkedInLogo />
        {name}
      </div>
    </div>
  );
};
const teams = {
  Directors: [
    { name: "Mike Mundia", src: "/headshots/directors/mike.png" },
    { name: "Lisa Jiang", src: "/headshots/directors/lisa.png" },
  ],
  Tech: [
    { name: "John Sargent", src: "/headshots/tech/john.png" },
    { name: "Nelson Dong", src: "/headshots/tech/nelson.png" },
    { name: "Mandy Rodriques", src: "/headshots/tech/mandy.png" },
    { name: "Aaryan Jain", src: "/headshots/tech/aaryan.png" },
    { name: "Lucas Dunker", src: "/headshots/tech/lucas.png" },
    { name: "Crystal Zhang", src: "/headshots/tech/crystal.png" },
    { name: "Aretha Chen", src: "/headshots/tech/aretha.png" },
    { name: "Alina Gonzalez", src: "/headshots/tech/alina.png" },
    { name: "Alexander Chen", src: "/headshots/tech/alexander.png" },
    { name: "Yumiko Chow", src: "/headshots/tech/yumiko.png" },
  ],
  Design: [
    { name: "Audrey Wong", src: "/headshots/design/audrey.png" },
    { name: "Zahra Wibisana", src: "/headshots/design/zahra.png" },
    { name: "Trisha Garg", src: "/headshots/design/trisha.png" },
    { name: "Isabella Borda", src: "/headshots/design/isabella.png" },
    { name: "Annabelle Chung", src: "/headshots/design/annabelle.png" },
  ],
  Social: [
    { name: "Emma Vonuelow", src: "/headshots/social/emma.png" },
    { name: "Nidhi Bendre", src: "/headshots/social/nidhi.png" },
    { name: "Megan Lai", src: "/headshots/social/megan.png" },
    { name: "Nicole Ni", src: "/headshots/social/nicole.png" },
  ],
  Sponsorship: [
    { name: "Luke Steimel", src: "/headshots/sponsorship/luke.png" },
    { name: "Nidhi Pillai", src: "/headshots/sponsorship/nidhi.png" },
    { name: "Sammi Chen", src: "/headshots/sponsorship/sammi.png" },
    { name: "Harini Avula", src: "/headshots/sponsorship/harini.png" },
    { name: "Swar Kewaiia", src: "/headshots/sponsorship/swar.png" },
    { name: "Tiffany Zheng", src: "/headshots/sponsorship/tiffany.png" },
  ],
  Operations: [
    { name: "Katherine Zeng", src: "/headshots/operations/katherine.png" },
    { name: "Alexandra Hu", src: "/headshots/operations/alexandra.png" },
    { name: "Amy Wang", src: "/headshots/operations/amy.png" },
    { name: "Zoe Gao", src: "/headshots/operations/zoe.png" },
    { name: "Rachel Pao", src: "/headshots/operations/rachel.png" },
    { name: "Tonatiuh Godinez", src: "/headshots/operations/tonatiuh.png" },
    { name: "Jalen Wu", src: "/headshots/operations/jalen.png" },
  ],
};

const Teams = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  if (!windowHeight || !windowWidth) return;

  const TeamsContent = () => {
    return (
      <div ref={ref} className="p-[8vw]">
        {Object.entries(teams).map(([teamName, team]) => (
          <TeamSections
            key={team.toString()}
            team={teamName as keyof typeof teams}
          />
        ))}
      </div>
    );
  };

 

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <TeamsTopSquiggle className="w-[110vw] -mt-48 -ml-[5vw]" />
        <TeamsMiddleSquiggle className="w-[110vw] -ml-[10vw]" />
        <TeamsBottomSquiggle className="w-[110vw] -ml-[5vw]" />
      </div>

      <div className="relative z-10">
        <TeamsContent />
      </div>
    </div>
  );
};

export default Teams;
