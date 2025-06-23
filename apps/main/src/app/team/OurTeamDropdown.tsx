"use client";


import React, { useState, useRef } from "react";


const teams = [
  "Directors",
  "Tech",
  "Design",
  "Social",
  "Sponsorship",
  "Operations",
] as const;

type TeamName = (typeof teams)[number];

interface OurTeamDropdownProps {
  onTeamSelect: (team: TeamName) => void;
  selectedTeam?: TeamName;
}

function OurTeamDropdown({
  onTeamSelect,
  selectedTeam = "Directors",
}: OurTeamDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTeamSelect = (team: TeamName) => {
    onTeamSelect(team);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left mb-8" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-x-2 bg-transparent px-0 py-2 text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {selectedTeam}
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 z-50 mt-2 w-48 origin-top rounded-md bg-white shadow-lg ring-1 ring-black/5 border border-gray-200">
          <div className="py-1">
            {teams.map((team: TeamName) => (
              <button
                key={team}
                onClick={() => handleTeamSelect(team)}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                  selectedTeam === team
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {team}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OurTeamDropdown;
