"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const TeamTable = () => {
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
  type teamKey = keyof typeof teams;
  const [currTeam, setCurrTeam] = useState<teamKey>("Tech");

  // setCurrTeam("Tech");
  const changeTeam = (team: teamKey) => {
    setCurrTeam(team);
  };

  // setCurrTeam(team)
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
          <div
            key={index}
            className="aspect-square flex flex-col items-center justify-center p-2 rounded-lg "
          >
            <div className="w-full pb-[100%] relative overflow-hidden rounded-lg">
              <Image
                src={member.src}
                alt={member.src}
                fill
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-row items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                        viewBox="0 0 30 30"
                        className="h-6 mt-1"
              >
                <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
              </svg>
              <a className="mt-2 text-sm font-medium truncate w-full">
                {member.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamTable;
