import React from "react";

// Frames are at least the artboard height, so LG and MD render at --u = 1.
const BREAKPOINTS = [
  { name: "LG", width: 1512, height: 1100 },
  { name: "MD", width: 1000, height: 1100 },
  { name: "SM", width: 390, height: 1100 },
];

/** Each frame has its own viewport, so the real media queries apply. */
export default function TypographyDevPage() {
  return (
    <main className="space-y-8 bg-[#15173b] p-8">
      {BREAKPOINTS.map(({ name, width, height }) => (
        <section key={name} className="space-y-3">
          <h2 className="font-bold text-white">
            {name} ({width}px)
          </h2>
          <div className="overflow-x-auto">
            <iframe
              src="/dev/typography/specimen"
              title={`Typography at ${name}`}
              width={width}
              height={height}
              className="bg-white"
            />
          </div>
        </section>
      ))}
    </main>
  );
}
