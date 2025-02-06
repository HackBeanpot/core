"use client";

import React, { useState } from "react";
import Image from "next/image";

const TeamTable = () => {
  const teams = {
    Directors: [
      {
        name: "Mike Mundia",
        src: "/headshots/directors/mike.png",
        linkedin: "https://www.linkedin.com/in/michael-mundia/",
      },

      {
        name: "Lisa Jiang",
        src: "/headshots/directors/lisa.png",
        linkedin: "https://www.linkedin.com/in/-lisa-jiang/",
      },
    ],
    Tech: [
      {
        name: "John Sargent",
        src: "/headshots/tech/john.png",
        linkedin: "https://www.linkedin.com/in/john--sargent/",
      },
      {
        name: "Nelson Dong",
        src: "/headshots/tech/nelson.png",
        linkedin: "https://www.linkedin.com/in/nelson-dong/",
      },
      {
        name: "Mandy Rodriques",
        src: "/headshots/tech/mandy.png",
        linkedin: "https://www.linkedin.com/in/amanda-rodriques/",
      },
      {
        name: "Aaryan Jain",
        src: "/headshots/tech/aaryan.png",
        linkedin: "https://www.linkedin.com/in/aaryanja/",
      },
      {
        name: "Lucas Dunker",
        src: "/headshots/tech/lucas.png",
        linkedin: "https://www.linkedin.com/in/lucasdunker/",
      },
      {
        name: "Crystal Zhang",
        src: "/headshots/tech/crystal.png",
        linkedin: "https://www.linkedin.com/in/cryystalzhang/",
      },
      {
        name: "Aretha Chen",
        src: "/headshots/tech/aretha.png",
        linkedin: "https://www.linkedin.com/in/aretha-chen/",
      },
      {
        name: "Alina Gonzalez",
        src: "/headshots/tech/alina.png",
        linkedin: "https://www.linkedin.com/in/agonzalez26",
      },
      {
        name: "Alexander Chen",
        src: "/headshots/tech/alexander.png",
        linkedin: "https://www.linkedin.com/in/alexchen04/",
      },
      {
        name: "Yumiko Chow",
        src: "/headshots/tech/yumiko.png",
        linkedin: "https://www.linkedin.com/in/yumiko-chow/",
      },
    ],
    Design: [
      {
        name: "Audrey Wong",
        src: "/headshots/design/audrey.png",
        linkedin: "https://www.linkedin.com/in/wong-audrey/",
      },
      {
        name: "Zahra Wibisana",
        src: "/headshots/design/zahra.png",
        linkedin: "https://www.linkedin.com/in/zahra-wibisana-0b0bb2222/",
      },
      {
        name: "Trisha Garg",
        src: "/headshots/design/trisha.png",
        linkedin: "https://www.linkedin.com/in/trishagarg/",
      },
      {
        name: "Isabella Borda",
        src: "/headshots/design/isabella.png",
        linkedin: "https://www.linkedin.com/in/isabella-borda-03537b306/",
      },
      {
        name: "Annabelle Chung",
        src: "/headshots/design/annabelle.png",
        linkedin: "https://www.linkedin.com/in/annabelle-c-2ba49327b/",
      },
    ],
    Social: [
      {
        name: "Emma Vonuelow",
        src: "/headshots/social/emma.png",
        linkedin: "https://www.linkedin.com/in/emma-von/",
      },
      {
        name: "Nidhi Bendre",
        src: "/headshots/social/nidhi.png",
        linkedin: "https://www.linkedin.com/in/nidhi-bendre-928423218/",
      },
      {
        name: "Megan Lai",
        src: "/headshots/social/megan.png",
        linkedin: "https://www.linkedin.com/in/meganplai/",
      },
      {
        name: "Nicole Ni",
        src: "/headshots/social/nicole.png",
        linkedin: "https://www.linkedin.com/in/nicoleni22/",
      },
    ],
    Sponsorship: [
      {
        name: "Luke Steimel",
        src: "/headshots/sponsorship/luke.png",
        linkedin: "https://www.linkedin.com/in/luke-steimel/",
      },
      {
        name: "Nidhi Pillai",
        src: "/headshots/sponsorship/nidhi.png",
        linkedin: "https://www.linkedin.com/in/nidhi-pillai-074a27180/",
      },
      {
        name: "Sammi Chen",
        src: "/headshots/sponsorship/sammi.png",
        linkedin: "https://www.linkedin.com/in/chensammi/",
      },
      {
        name: "Harini Avula",
        src: "/headshots/sponsorship/harini.png",
        linkedin: "https://www.linkedin.com/in/harini-avula/",
      },
      {
        name: "Swar Kewaiia",
        src: "/headshots/sponsorship/swar.png",
        linkedin: "https://www.linkedin.com/in/swarkewalia/",
      },
      {
        name: "Tiffany Zheng",
        src: "/headshots/sponsorship/tiffany.png",
        linkedin: "https://www.linkedin.com/in/tiff-zheng/",
      },
    ],
    Operations: [
      {
        name: "Katherine Zeng",
        src: "/headshots/operations/katherine.png",
        linkedin: "https://www.linkedin.com/in/k-zeng/",
      },
      {
        name: "Alexandra Hu",
        src: "/headshots/operations/alexandra.png",
        linkedin: "https://www.linkedin.com/in/alexandra-hu/",
      },
      {
        name: "Amy Wang",
        src: "/headshots/operations/amy.png",
        linkedin: "https://www.linkedin.com/in/amy-wang-17b526248/",
      },
      {
        name: "Zoe Gao",
        src: "/headshots/operations/zoe.png",
        linkedin: "https://www.linkedin.com/in/zoe-gao-khoury/",
      },
      {
        name: "Rachel Pao",
        src: "/headshots/operations/rachel.png",
        linkedin: "https://www.linkedin.com/in/rachelpaocyber/",
      },
      {
        name: "Tonatiuh Godinez",
        src: "/headshots/operations/tonatiuh.png",
        linkedin: "https://www.linkedin.com/in/godinezsteven/",
      },
      {
        name: "Jalen Wu",
        src: "/headshots/operations/jalen.png",
        linkedin: "https://www.linkedin.com/in/jalen-wu/",
      },
    ],
  };
  type teamKey = keyof typeof teams;
  const [currTeam, setCurrTeam] = useState<teamKey>("Tech");

  const changeTeam = (team: teamKey) => {
    setCurrTeam(team);
  };

  return (
    <div className="py-4">
      <div className="flex flex-row gap-4">
        {Object.entries(teams).map(([teamName, team]) => (
          <button
            key={team.toString()}
            onClick={() => changeTeam(teamName as keyof typeof teams)}
            className={`py-4 px-2 transition-transform duration-300 transform scale-100 hover:scale-[102%] ${
              currTeam === teamName ? "font-bold" : "font-normal"
            }`}
          >
            {teamName.toString()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-2 md:grid-cols-2 md:grid-rows-5">
        {teams[currTeam].map((member, index) => (
          <a
            key={index}
            href={member.linkedin}
            className="transition-transform scale-100 hover:scale-105"
          >
            <div className="items-center p-2 rounded-lg ">
              <div className="w-full pb-[100%] relative overflow-hidden rounded-lg">
                <Image
                  src={member.src}
                  alt={member.src}
                  fill
                  className="absolute w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-[20%_80%] items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 30 30"
                  className="h-8 pr-[5rem]"
                >
                  <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                </svg>
                <p className="text-sm font-medium truncate w-full place-self-start mt-1 ">
                  {member.name}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TeamTable;
