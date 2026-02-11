import React, { useState } from "react";

type DropdownProps = {
  label: string;
  options: string[];
  onSelect?: (value: string | null) => void;
};

export function DropDown({ label, options, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(option: string) {
    const newValue = option === selected ? null : option;
    setSelected(newValue);
    setOpen(false);
    onSelect?.(newValue);
  }

  return (
    <div className="relative w-64">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-marigoldYellow rounded-xl px-4 py-2 text-left shadow-sm hover:bg-marigoldYellowDark flex justify-between items-center font-NeulisNeue-Bold"
      >
        <span>{selected ?? label}</span>
        <span className="ml-2">▾</span>
      </button>

      {/* Menu */}
      {open && (
        <ul className="absolute mt-2 w-full bg-marigoldYellow font-NeulisNeue-Regular rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-marigoldYellowDark cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// filter so that when a team is selected, only the card that has their name shows
