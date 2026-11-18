import React, { type SVGProps } from "react";

/**
 * City skyline behind the museum (LG Day geometry). Night, Title and Zoom
 * use the same shape scaled by `HERO_LAYERS.skyline` transforms.
 *
 * 1512x1024 LG canvas (the 1512x982 artboard plus 42px below it, which MD
 * shows), the same as every hero layer.
 * Colors are CSS custom properties, so a scene can tween them on any ancestor:
 * - `--hero-skyline-light` (default `#37A9C9`)
 * - `--hero-skyline-dark` (default `#017B9D`)
 */
export function Skyline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1512 1024"
      fill="none"
      overflow="visible"
      aria-hidden
      {...props}
    >
      <path
        fill="var(--hero-skyline-light, #37A9C9)"
        d="M-441.4 601.08h25.49v-29.6h25.49v-37.8h60.84v67.4h44.4v-50.97h62.5v-95.36h13.16v-52.61l23.02-8.22v-83.86h82.23v32.89h88.8v59.19h8.22v13.15h18.1v39.46h64.13V241.01h31.24v19.73h18.1v49.32h24.66v14.8h60.85v47.68h108.54v29.6h19.73V241h19.74v-18.09h121.7V241h19.73v200.6h59.2v60.83h19.74V287.05l115.11-22.57v-41.56l4.93-4.93v-77.28h29.6v-31.24h18.1v-26.3h8.22v26.3h18.09v31.24h27.96v82.21l6.57 4.94V441.6l13.16-69.06h14.8v-62.48h67.43v-55.9h47.69v14.8h78.94v310.75h23.02V415.29h80.58v-29.6h75.65V497.5h74v-55.9h25.49v-69.06h25.49v-73.99h49.34V188.4h92.09v253.2h36.18v-95.36l8.23-27.95h32.89v27.95h47.69l11.51 59.19h55.91v92.07h29.6v101.94H1782v42.75l-2223.4-3.29z"
      />
      <path
        fill="var(--hero-skyline-dark, #017B9D)"
        d="M-390.42 600.68h-50.98v37.81l2223.4 3.3v-42.76h-85.52V497.1h-29.6v-92.07h-83.87V579.3h-72.36v-67.4h-44.4V298.14h-133.21v143.04h-50.98v147.98h-74V385.29h-75.65v29.6h-80.58V579.3h-23.02V268.55h-78.94v-14.8h-47.7v366.66h-29.6V472.43H764.05V579.3h-18.1V253.76l-167.73 32.88V608.9h-19.74V441.2H489.4v108.5h-65.78v-95.35h-14.8v-39.47h-34.54v39.47H326.6v70.7h-42.76l-21.37 83.85h-52.63V324.46h-60.85v-14.8h-42.76v223.6H74.98v-78.91H10.84v-39.47H-7.25v-13.15h-36.18v13.15h-19.73v156.2h-87.16V454.35h-72.36v95.36h-62.5v50.97h-44.4v-67.41h-60.84z"
      />
    </svg>
  );
}
