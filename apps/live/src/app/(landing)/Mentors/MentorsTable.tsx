"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import Icon from "@repo/ui/Icons/MemberIcon";
import clsx from "clsx";
import isTimeRange from "@util/functions/isTimeRange";
import useDevice from "@util/hooks/useDevice";
import { AirtableData, MentorData } from ".";
import IconPopup from "@repo/ui/Icons/IconPopup";
import { ModalContext } from "../providers";

type MentorTableProps = {
  data: AirtableData;
};

const MentorsTable = ({ data }: MentorTableProps) => {
  const { isDesktop, isTablet, isMobile } = useDevice();
  const records = useMemo(() => data?.records ?? [], [data]);
  const [skillsFilter, setSkillsFilter] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorData | null>();
  const { setModal } = useContext(ModalContext);
  const gridStyles = clsx(
    "flex flex-wrap justify-center items-center mx-auto gap-6",
    isDesktop && "w-3/4",
    isMobile && "grid grid-cols-2",
    isTablet && "grid grid-cols-3",
  );

  const date = useMemo(() => new Date(), []);

  const uniqueSkills = useMemo(() => {
    const skills = new Set<string>();
    records.forEach((r) => {
      r.fields.Expertise?.forEach((s) => skills.add(s.trim()));
    });
    return Array.from(skills).sort();
  }, [records]);

  const hasFilter = availabilityFilter || skillsFilter.length !== 0;

  const toggleSkill = (skill: string) => {
    setSkillsFilter((prev) => {
      if (prev.includes(skill)) return prev.filter((s) => s !== skill);
      return [...prev, skill];
    });
  };

  const filtered = useMemo(() => {
    if (!records.length) return [];
    return records.filter((rec) => {
      if (!hasFilter) return true;

      const expertise = new Set(
        rec.fields.Expertise?.map((s) => s.trim()) ?? [],
      );
      const hasSkills =
        skillsFilter.length === 0 ||
        skillsFilter.every((skill) => expertise.has(skill));

      let availableOk = true;
      if (availabilityFilter) {
        availableOk = false;
        const slots = rec.fields["Time Slots"] || [];
        for (let i = 0; i < slots.length; i++) {
          if (isTimeRange(slots[i], date)) {
            availableOk = true;
            break;
          }
        }
      }

      return hasSkills && availableOk;
    });
  }, [records, skillsFilter, availabilityFilter, hasFilter, date]);

  useEffect(() => {
    if (selectedMentor) {
      setModal(
        <IconPopup
          iconSrc={selectedMentor.fields.Image[0].url}
          iconAltText={selectedMentor.fields.Name}
          iconTitle={selectedMentor.fields.Name}
          discord={selectedMentor.fields.discord}
          expertise={selectedMentor.fields.Expertise}
          onClose={() => {
            setSelectedMentor(null);
            setModal(null);
          }}
        />,
      );
    }
  }, [selectedMentor]);

  if (!records.length) {
    return <div className="py-6">No mentors available right now.</div>;
  }

  return (
    <div className="w-full">
      <div
        className={clsx(
          "flex flex-row gap-4 font-GT-Walsheim-Regular py-4 items-center flex-wrap justify-center",
          isMobile && "px-4",
        )}
      >
        <div className="relative inline-block text-left">
          <button
            className="py-2 px-4 min-w-[140px] transition-transform duration-300 transform scale-100 hover:scale-[102%] rounded-xl font-NeulisNeue-Bold text-[20px] bg-[#2E5B9A] text-white flex items-center justify-between gap-2"
            onClick={() => setDropdownOpen((p) => !p)}
            aria-expanded={dropdownOpen}
          >
            <span>Expertise</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7L10 12L15 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-2">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setSkillsFilter([])}
                >
                  All
                </button>
                {uniqueSkills.map((skill) => (
                  <button
                    key={skill}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${
                      skillsFilter.includes(skill) ? "bg-gray-100" : ""
                    }`}
                    onClick={() => toggleSkill(skill)}
                  >
                    <span>{skill}</span>
                    {skillsFilter.includes(skill) && (
                      <span className="text-green-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          className={`relative py-2 pl-6 pr-3 transition-transform duration-300 transform scale-100 hover:scale-[102%] rounded-xl font-NeulisNeue-Bold text-[20px] ${
            availabilityFilter
              ? "bg-firecrackerRed text-white"
              : "bg-white border border-firecrackerRed text-firecrackerRed"
          }`}
          onClick={() => setAvailabilityFilter((p) => !p)}
        >
          <span
            className={`absolute left-3 top-1/2 -translate-y-1/2 inline-block w-2 h-2 rounded-full ${
              availabilityFilter ? "bg-lime-400" : "bg-firecrackerRed"
            }`}
          />
          <span className="block w-full text-center">Active</span>
        </button>
      </div>

      <div className={clsx(gridStyles, "w-full pb-12")}>
        {(hasFilter ? filtered : records).map((record) => {
          const slots = record.fields["Time Slots"] || [];
          let isAvailable = false;
          for (let i = 0; i < slots.length; i++) {
            if (isTimeRange(slots[i], date)) {
              isAvailable = true;
              break;
            }
          }

          const imageUrl =
            record.fields.Image?.[0]?.url || "/headshots/placeholder.png";

          return (
            <div key={record.id} className="flex flex-col items-center">
              <Icon
                src={imageUrl}
                name={record.fields.Name}
                isLive={true}
                isActive={isAvailable}
                textColor="black"
                showLinkedInIcon={true}
                onClick={() => setSelectedMentor(record)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorsTable;
