import React from "react";

interface TooltipRowProps {
  label: React.ReactNode;
  value: React.ReactNode;
  color?: string; // optional colored swatch for pie slices
}

// shared tooltip line with "label: value"
export function TooltipRow({
  label,
  value,
  color,
}: TooltipRowProps): JSX.Element {
  return (
    <span className="flex items-center gap-2">
      {color ? (
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
          style={{ backgroundColor: color }}
        />
      ) : null}
      <span className="capitalize text-neutral-500">{label}:</span>
      <span className="font-mono font-medium text-neutral-950 tabular-nums">
        {value}
      </span>
    </span>
  );
}
