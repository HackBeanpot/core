import React from "react";

type InvalidType = undefined | null;
export type ForegroundItems = {
  item: Exclude<React.ReactNode, InvalidType>;
  coordinate: Coordinate;
}[];

type SectionProps = {
  name: string;
  background: React.ReactNode;
  content: React.ReactNode;
  foreground?: ForegroundItems;
  height: number;
};

export type Coordinate = {
  x: number;
  y: number;
};

export default function Section({
  name,
  background,
  content,
  foreground: foregroundItems,
  height,
}: SectionProps): React.ReactNode {
  const sectionHeight = `${height}vh`;

  return (
    <div id={name} style={{ height: sectionHeight }} className="w-full">
      <div style={{ height: sectionHeight }} className={`absolute z-0 w-full`}>
        {background}
      </div>
      <div style={{ height: sectionHeight }} className={`absolute z-10 w-full`}>
        {content}
      </div>
      <div
        style={{ height: sectionHeight }}
        className={`absolute z-20 w-full pointer-events-none`}
      >
        {foregroundItems?.map(({ item, coordinate }) => (
          <div
            key={`${coordinate.x}-${coordinate.y}-${item.toString()}`}
            style={{ left: `${coordinate.x}%`, top: `${coordinate.y}%` }}
            className={`absolute z-21`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
