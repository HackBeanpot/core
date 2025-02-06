"use client";

import isTimeRange from "@util/functions/isTimeRange";
import React, { useEffect, useState } from "react";
import Checkmark from "../../lib/Assets/SVG/Checkmark";
import clsx from "clsx";
import { AirtableData } from ".";

const date = new Date();

export type Filters = {
  skills: Set<string>;
  avalibility: boolean;
  virtual: boolean;
};

type MentorTableProps = {
  data: AirtableData;
};

const MentorsTable = ({ data }: MentorTableProps) => {
  const [skillsFilter, setSkillsFilter] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean>(false);
  const [virtualFilter, setVirtualFilter] = useState<boolean>(false);
  const [hasFilter, setHasFilter] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);


  // checking if current filter is default or not. if default it means dont have to do any filtering logic.
  useEffect(() => {
    setHasFilter(
      availabilityFilter ||
      virtualFilter ||
      skillsFilter.length !== 0,
    );
  }, [virtualFilter, availabilityFilter, skillsFilter]);

  let { records } = data;

  const uniqueSkills = new Set<string>(records.map((record) => record.fields.Expertise).flat().map((skill) => skill.trim().toUpperCase()));

  return (
    <div>
      <div className="flex flex-row gap-4 font-GT-Walsheim-Regular py-4">
        <div className="relative inline-block text-left">
          <div className="rounded-xl h-8 px-2 inline-flex w-full justify-center gap-x-1.5 bg-white ring-1 shadow-xs ring-gray-300 hover:bg-gray-50 cursor-pointer transition-transform hover:scale-105 items-center" onClick={() => {
            setDropdownOpen((prev) => !prev);
          }}>
            <div
              className="max-w-[50vw] truncate"
              id="menu-button"
            >
              Expertise: {skillsFilter.length === 0 ? "All" : skillsFilter.join(", ")}
            </div>

            <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </div>

          {dropdownOpen && (
            <div autoFocus className="origin-top-right z-50 absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
              <div className="py-1" role="none">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center justify-between"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => setSkillsFilter([])}>
                  All
                  {!skillsFilter.length && (<Checkmark />)}
                </button>
                {[...uniqueSkills].map((skill) => (
                  <div>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center justify-between"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => {
                        let newSkills = [...skillsFilter]
                        if (newSkills.includes(skill)) {
                          newSkills = newSkills.filter((item) => item !== skill)
                        } else {
                          newSkills.push(skill)
                        }
                        setSkillsFilter(newSkills)
                      }}>
                      {skill}
                      {skillsFilter.includes(skill) && (<Checkmark />)}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          className={clsx("rounded-xl h-8 px-2 w-32 border-[#5062A5] border-[1px] transition-transform duration-300 transform scale-100 hover:scale-[102%]",
            availabilityFilter ?
              "bg-[#647ACE] text-text-light" :
              "bg-[#ffff] text-text-dark")}
          onClick={() => setAvailabilityFilter(prev => !prev)}>
          Available
        </button>

        <button
          className={clsx("rounded-xl h-8 px-2 w-32 border-[#5062A5] border-[1px] transition-transform duration-300 transform scale-100 hover:scale-[102%]", virtualFilter ?
            "bg-[#647ACE] text-text-light" :
            "bg-[#ffff] text-text-dark")}
          onClick={() => {
            setVirtualFilter((prev) => !prev);
          }}
        >
          Virtual
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-3  py-5">
        {records
          .filter((filtered) => {
            if (!hasFilter) {
              return true;
            }

            let virtual = !virtualFilter;
            let hasSkills = !skillsFilter.length;
            let isAvailable = !availabilityFilter;
            for (let i = 0; i < filtered.fields["Time Slots"].length; i++) {
              isAvailable =
                isTimeRange(filtered.fields["Time Slots"][i], date) || isAvailable;
            }

            for (let i = 0; i < filtered.fields.Expertise.length; i++) {
              const cleanedSkill = filtered.fields.Expertise[i]
                .trim()
                .toUpperCase();

              hasSkills =
                skillsFilter.includes(cleanedSkill) ||
                hasSkills;
            }

            virtual = filtered.fields.IsVirtual === "True" || virtual;

            return hasSkills && isAvailable && virtual;
          })

          .map((record, index) => (
            <div
              key={index}
              className="aspect-square flex flex-col items-center justify-center p-2 rounded-lg "
            >
              <div className="w-full pb-[100%] relative overflow-hidden rounded-lg">
                <img
                  src={record.fields.Image[0].url}
                  alt={record.id}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <a className="mt-2 text-sm font-medium truncate w-full">
                {record.fields.Name}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MentorsTable;
