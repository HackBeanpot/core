import React from "react";
import Image from "next/image";
import icon from "@/app/icon.ico";

//note: I used AI to make this very basic placeholder background for the portal

interface TiledBackgroundProps {
  /** Rendered size of each icon, in px. */
  iconSize?: number;
  /** Size of each grid cell, in px. Spacing between icons = tile - iconSize. */
  tile?: number;
  /** Background opacity (0–1). */
  opacity?: number;
}

// Faded HackBeanpot logo tiled across the background. Uses a grid of cells
// (instead of a repeating CSS background) so the gap between icons can be
// controlled: the icon is drawn at `iconSize` inside a larger `tile` cell.
export default function TiledBackground({
  iconSize = 48,
  tile = 140,
  opacity = 0.1,
}: TiledBackgroundProps): JSX.Element {
  // Enough cells to cover large viewports; overflow is clipped by the parent.
  const cells = Array.from({ length: 400 });

  return (
    <div
      aria-hidden
      className="absolute inset-0 grid content-start justify-center overflow-hidden"
      style={{
        opacity,
        gridTemplateColumns: `repeat(auto-fill, ${tile}px)`,
        gridAutoRows: `${tile}px`,
      }}
    >
      {cells.map((_, i) => (
        <div key={i} className="flex items-center justify-center">
          <Image src={icon} alt="" width={iconSize} height={iconSize} />
        </div>
      ))}
    </div>
  );
}
