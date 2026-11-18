"use client";

import React, { forwardRef } from "react";
import "./decor.css";
import { animAttr, decorColors, DecorBaseProps } from "./shared";

export type CandleProps = DecorBaseProps & {
  /** Height of the wax body in px. Figma's is 131. */
  height?: number;
  /** Lit or unlit. */
  flame?: boolean;
  /**
   * Height of the candlestick in px. Figma's is ~332; other values stretch or squash
   * only the vase so the dish, bands, knob and foot keep their shape.
   */
  holderHeight?: number;
};

// Everything below is in Figma px (frame 5597:15707), taken from the layer exports.

// ---------- Flame: 16×55 box, wick bottom at (8.06, 54.12) ----------
const FLAME_WICK_X = 8.06;
const FLAME_WICK_Y = 54.116;
const FLAME_OUTER =
  "M1.24371 24.1818C-1.36474 38.5283 1.49944 45.9505 5.00844 48.3305C6.15207 49.1062 7.62034 49.215 8.97223 48.9286C15.0041 47.6508 16.7936 40.2918 15.0586 25.7172C13.5232 12.8202 4.82612 2.68687 1.24371 0C2.52317 1.02357 4.31441 7.29293 1.24371 24.1818Z";
const FLAME_INNER =
  "M7.73059 28.7812C1.97408 33.3873 1.15094 46.8217 7.7308 46.054C16.8258 44.9929 12.7219 36.0742 7.73059 28.7812Z";
const FLAME_HIGHLIGHT =
  "M3.56491 5.68544C4.71432 13.7458 2.78138 18.8174 3.5652 19.5035C6.63471 22.1901 8.16787 9.52383 3.56491 5.68544Z";

// ---------- Wax: 41.5 wide; flared lip is the top 14.6px, bottom edge at `h` ----------
const WAX_CENTER_X = 20.94;
const WAX_LIP = 14.5859;
const waxPath = (h: number) =>
  `M0.0366818 2.81694C-0.0958287 2.26494 0.135003 1.73009 0.675142 1.55541C2.39585 0.998924 7.37429 0 20.9431 0C34.9008 0 39.3459 1.05691 40.7103 1.60209C41.104 1.75939 41.2529 2.15667 41.1821 2.57467C40.9787 3.77678 40.4842 6.36587 39.7512 8.06061C38.7699 10.3297 35.1452 14.5859 35.1452 ${WAX_LIP}V${h - 0.504}C35.1452 ${h - 0.504} 25.9577 ${h + 0.008} 20.5593 ${h}C15.1609 ${h - 0.008} 6.74112 ${h - 0.384} 6.74112 ${h - 0.384}V${WAX_LIP}C6.74112 ${WAX_LIP} 2.85861 10.3162 1.75122 8.06061C0.975552 6.48068 0.344901 4.10089 0.0366818 2.81694Z`;

// ---------- Candlestick ----------
// Each Figma layer was exported on its own, so `axis` is the x of that layer's
// vertical centerline (used to line it up) and `y` is where its top sits in the
// stick, measured from the top of the dish. Children reuse their parent's
// origin plus the offset where their outlines coincide.
type Piece = {
  d: string;
  fill: string;
  dx?: number;
  dy?: number;
  opacity?: number;
};
type Layer = { axis: number; y: number; pieces: Piece[] };

const BOWL: Layer = {
  axis: 42.43,
  y: 0,
  pieces: [
    {
      // Union
      d: "M41.282 0.00689303C62.4469 -0.134026 74.7479 1.91262 81.3846 3.68072C85.0327 4.65285 85.8392 8.70163 83.3309 11.5235L78.407 17.0645C76.7169 18.9659 74.5848 20.4203 72.1277 21.0782C71.2335 23.7821 70.0692 28.3445 70.0691 33.7803C70.0691 42.6086 73.1385 49.1338 73.1385 49.1338H11.7244C11.7565 49.0823 15.5643 42.9536 15.5643 33.7803C15.5642 27.9126 14.004 23.2915 12.8729 20.709C10.8639 20.0229 9.07593 18.8189 7.58477 17.2852L1.56719 11.0958C-0.994132 8.46124 -0.384298 4.62601 3.16485 3.67486C9.30794 2.02861 20.7799 0.14343 41.282 0.00689303Z",
      fill: "#1F224E",
    },
    {
      // Intersect (5): shading over the bowl
      d: "M41.282 0.00689116C62.447 -0.134041 74.7479 1.91359 81.3846 3.6817C85.0327 4.65375 85.84 8.70259 83.3318 11.5245L78.407 17.0645C76.7171 18.9656 74.5853 20.4192 72.1287 21.0772C71.2344 23.7809 70.0692 28.3444 70.0692 33.7813C70.0692 38.0486 70.7862 41.7779 71.5272 44.4922C70.6225 46.0928 69.6485 47.6531 68.6014 49.1348H41.5193C40.1805 44.8001 38.5458 40.2317 35.1395 37.2315C28.7222 31.5798 20.5459 27.5723 14.244 24.5108C13.7983 22.9768 13.3052 21.695 12.8738 20.71C10.8646 20.0239 9.0761 18.8201 7.58478 17.2862L1.5672 11.0967C-0.994135 8.46221 -0.384297 4.62699 3.16485 3.67584C9.30788 2.02957 20.7797 0.14343 41.282 0.00689116Z",
      fill: "#15173B",
    },
  ],
};

const FUNNEL: Layer = {
  axis: 30.42,
  y: 56.5,
  pieces: [
    {
      // Vector 270
      d: "M60.2626 0H0C0 0 11.5241 8.42595 15.3535 13.4343C19.183 18.4427 23.0303 27.6364 23.0303 27.6364H38.3838C38.3838 27.6364 41.6965 18.445 45.2929 13.4343C48.8893 8.42368 60.2626 0 60.2626 0Z",
      fill: "#15173B",
    },
  ],
};

const UPPER_BAND: Layer = {
  axis: 32.2,
  y: 46.5,
  pieces: [
    {
      // Vector 271
      d: "M60.2211 0.100304C37.5495 2.59423 14.4911 1.03981 3.9305 0.0188567C2.69895 -0.100203 1.42163 0.336677 0.828482 1.42252C-0.287627 3.46573 -0.119835 5.44139 0.419625 7.26659C0.819428 8.61929 2.08474 9.51329 3.48809 9.6556C34.5611 12.8065 54.4002 11.148 61.7527 9.69077C62.5692 9.52895 63.3232 9.08711 63.7068 8.34845C64.8249 6.19565 64.4078 3.79665 63.7007 1.97025C63.1685 0.595362 61.6866 -0.0609027 60.2211 0.100304Z",
      fill: "#33357D",
    },
    {
      // Intersect (6): lit top of the band
      d: "M0.823242 1.42231C1.41638 0.336651 2.6934 -0.0999731 3.9248 0.0189917C14.4854 1.03994 37.5442 2.59398 60.2158 0.100046C61.6813 -0.0611024 63.1631 0.595321 63.6953 1.97016C64.0054 2.77107 64.259 3.68215 64.3525 4.63423C58.4011 5.98594 46.4481 6.91255 32.6719 6.91255C18.0815 6.91254 5.53631 5.8745 0 4.39106C0.0346913 3.42467 0.271879 2.43167 0.823242 1.42231Z",
      fill: "#484A93",
    },
  ],
};

const DISH: Layer = {
  axis: 41.45,
  y: 0,
  pieces: [
    {
      // Ellipse 177: dish rim
      d: "M82.9091 5.57372C82.9091 8.652 58.8724 11.1474 41.4545 11.1474C24.0367 11.1474 0 8.652 0 5.57372C0 2.49544 26.101 0 41.4545 0C56.8081 0 82.9091 2.49544 82.9091 5.57372Z",
      fill: "#494B96",
    },
  ],
};

const SOCKET_ELLIPSE =
  "M52.9697 3.83838C52.9697 4.89832 33.0101 5.75758 25.7172 5.75758C18.4242 5.75758 0 4.89832 0 3.83838C0 2.77844 2.68687 0 25.7172 0C48.7475 0 52.9697 2.77844 52.9697 3.83838Z";
const SOCKET_AXIS = 26.48;
const SOCKET_Y = 2.4; // centered on the dish rim
const SOCKET_CENTER_Y = SOCKET_Y + 2.88;

const VASE_Y = 84.1;
const VASE_H = 116.3;
const VASE: Layer = {
  axis: 29.9,
  y: VASE_Y,
  pieces: [
    {
      // Vector 269
      d: "M16.3869 25.4585L22.2611 0H37.9985L43.0832 24.8202C45.5746 36.9816 56.5571 48.4026 58.573 60.6518C58.9075 62.6841 59.0991 64.9747 59.0991 67.5556C59.0991 75.5786 57.6066 81.4524 55.7988 85.6243C52.9868 92.1138 48.4008 98.1262 46.3824 104.905L42.9884 116.303H16.8874L12.8647 104.252C10.7365 97.8769 6.30485 92.2618 3.52563 86.1419C1.6187 81.9428 0 75.9161 0 67.5556C0 64.7421 0.227593 62.2736 0.619827 60.1086C2.78365 48.1649 13.6579 37.2859 16.3869 25.4585Z",
      fill: "#15173B",
    },
    {
      // Intersect (4): light swirl
      d: "M23.3291 0C33.1953 3.86665 40.6367 21.1266 40.6367 41.8369C40.6367 65.3909 31.0128 84.485 19.1416 84.4854C10.796 84.4854 3.56124 75.0487 0 61.2598C0.057665 60.8669 0.118682 60.4829 0.186523 60.1084C2.35042 48.165 13.224 37.2861 15.9531 25.459L21.8281 0H23.3291Z",
      fill: "#33357D",
      dx: 0.434,
    },
    {
      // Subtract: mid-tone sliver inside the swirl
      d: "M39.752 0C39.7784 0.865377 39.7939 1.73766 39.7939 2.61621C39.7939 26.1702 30.17 45.2642 18.2988 45.2646C10.5633 45.2646 3.78604 37.1561 0 24.9902C4.19984 32.7174 10.1565 37.543 16.7646 37.543C29.0234 37.5425 39.0426 20.94 39.752 0Z",
      fill: "#262960",
      dx: 1.277,
      dy: 39.221,
    },
  ],
};

// Below the vase; these shift down/up as the vase stretches.
const LOWER_BAND: Layer = {
  axis: 15.8,
  y: 196,
  pieces: [
    {
      // Vector 268
      d: "M25.5487 0.114988C18.9262 1.48204 11.3683 1.09903 6.77852 0.350428C4.49463 -0.022083 1.74866 0.693017 0.87542 2.83601C-1.00522 7.45123 0.494083 11.1365 2.0954 13.0931C2.57047 13.6735 3.26064 14.0148 3.99563 14.1646C11.9022 15.775 22.4051 14.9938 27.1675 14.1963C28.1061 14.0391 28.9635 13.5506 29.5035 12.767C32.1151 8.97802 31.4793 4.90212 30.2065 2.0309C29.4366 0.294188 27.4092 -0.269064 25.5487 0.114988Z",
      fill: "#292A70",
    },
    {
      // Intersect (2): lit top of the band
      d: "M25.5195 0.114896C27.3799 -0.269045 29.4069 0.294282 30.1768 2.03091C30.7061 3.22515 31.124 4.62779 31.2451 6.1315C27.2558 7.6157 21.6004 8.54552 15.3271 8.54556C9.35799 8.54556 3.94745 7.70433 0 6.34439C0.0804124 5.2526 0.339581 4.07767 0.845703 2.8356C1.71894 0.69261 4.46513 -0.0222629 6.74902 0.350248C11.3388 1.09885 18.8971 1.48195 25.5195 0.114896Z",
      fill: "#33357D",
    },
  ],
};

const KNOB: Layer = {
  axis: 24.33,
  y: 210,
  pieces: [
    {
      // Vector 267
      d: "M12.8144 0H35.8447C35.8447 0 33.6296 3.07071 33.6296 9.9798C33.6296 16.8889 35.8447 19.1919 35.8447 19.1919C35.8447 19.1919 43.3692 21.2923 46.2083 24.9495C46.7405 25.635 47.1676 26.5221 47.5103 27.511C49.603 33.5505 44.8655 39.3704 38.5455 40.3258C34.6537 40.9142 29.7423 41.3978 23.9457 41.4545C17.3846 41.5188 12.1579 40.929 8.29326 40.2194C3.11234 39.268 -0.657662 34.7752 0.0961752 29.5619C0.34785 27.8214 0.826933 26.1542 1.68308 24.9495C4.51822 20.9602 12.8144 19.1919 12.8144 19.1919C12.8144 19.1919 15.4415 16.8889 15.5892 9.9798C15.7369 3.07071 12.8144 0 12.8144 0Z",
      fill: "#15173B",
    },
    {
      // Intersect (3): soft highlight on the bulb
      d: "M14.2533 0C23.4902 1.44623 31.9479 2.39412 24.4174 4.16602C15.2457 6.32437 10.9317 16.7373 9.49843 23.4863C9.08311 23.4181 8.68125 23.3495 8.29335 23.2783C3.11245 22.327 -0.657714 17.8344 0.0960823 12.6211C0.347757 10.8806 0.826847 9.21347 1.683 8.00879C4.51152 4.02884 12.7752 2.25923 12.8139 2.25098C12.8139 2.25098 13.5422 1.6127 14.2533 0Z",
      fill: "#33357D",
      opacity: 0.41,
      dy: 16.941,
    },
    {
      // Intersect: shadow under the bulb
      d: "M46.4688 0C44.9852 3.15498 41.7159 5.5541 37.8555 6.1377C33.9637 6.72602 29.0524 7.20985 23.2559 7.2666C16.6949 7.33084 11.4681 6.74086 7.60352 6.03125C4.10617 5.38906 1.25393 3.13193 0 0.129883C5.14938 1.11052 12.5062 1.8877 22.9004 1.8877C33.753 1.88767 41.2939 1.04175 46.4688 0Z",
      fill: "#0C0D31",
      dx: 0.69,
      dy: 34.188,
    },
    {
      // Intersect (1): shadow the band casts on the stem
      d: "M23.0312 0C23.0224 0.0122574 21.9629 1.48892 21.3125 4.68359C18.5297 5.35043 14.8578 5.75781 10.833 5.75781C7.69309 5.75779 4.76822 5.50912 2.3125 5.08398C1.52154 1.60256 0.00359507 0.00378106 0 0H23.0312Z",
      fill: "#0B0D27",
      dx: 12.814,
    },
  ],
};

const FOOT: Layer = {
  axis: 67.56,
  y: 248.5,
  pieces: [
    {
      // Group 236: bell foot
      d: "M21.927 41.8996C39.4645 27.1834 50.8356 8.18393 54.512 0.000976562H80.6132C92.0132 29.9435 106.184 40.2448 116.961 45.9684C118.563 46.8195 120.268 47.4648 121.936 48.1796C132.544 52.7258 132.752 60.2705 132.926 66.6291L132.932 66.8208C133.004 69.4381 131.97 72.0095 129.663 73.2471C122.585 77.0436 103.925 84.2853 65.2597 83.6777C25.3142 83.0501 8.29357 75.2918 2.5031 71.6833C0.810164 70.6283 -0.0497271 68.7414 0.0651068 66.75C0.737888 55.0826 6.52239 50.293 12.6327 47.3806C15.8954 45.8255 19.1583 44.2228 21.927 41.8996Z",
      fill: "#33357D",
    },
    {
      d: "M80.6157 0C92.0156 29.9419 106.186 40.2432 116.962 45.9668C118.565 46.818 120.27 47.464 121.938 48.1787C132.546 52.7249 132.753 60.2695 132.928 66.6279L132.934 66.8193C133.006 69.4365 131.973 72.0084 129.666 73.2461C122.923 76.8626 105.671 83.6038 70.6284 83.71V0H80.6157Z",
      fill: "#060825",
    },
    {
      d: "M99.4153 51.4346L109.395 59.4951L110.953 79.749C100.456 82.1355 85.6358 83.9969 65.26 83.6768C62.5985 83.6349 60.0388 83.5598 57.5774 83.458V61.7979L67.9407 51.4346L64.2922 0H74.9749L99.4153 51.4346Z",
      fill: "#15173B",
    },
  ],
};
const FOOT_H = 83.71;
const KNOB_SHADOW_Y = 247; // contact shadow (Ellipse 180) where the knob meets the foot

/** Natural stick height in Figma: dish top → foot bottom. */
const STICK_H = FOOT.y + FOOT_H;
/** The vase can squash to 40% before the stick looks broken. */
const MIN_STICK_H = STICK_H - VASE_H * 0.6;

const W = 134;
const CX = 67.6;
const LIP_Y = FLAME_WICK_Y + 4; // room above the wax for the flame

// Glow rings, outer → inner. Overlapping translucent discs give the stepped halo.
const GLOW_RINGS = [200, 160, 125, 95, 66];

const renderLayer = (layer: Layer, yShift = 0) =>
  layer.pieces.map((p, i) => (
    <path
      key={i}
      d={p.d}
      fill={p.fill}
      opacity={p.opacity}
      transform={`translate(${CX - layer.axis + (p.dx ?? 0)} ${layer.y + yShift + (p.dy ?? 0)})`}
    />
  ));

/**
 * Peach candle in the indigo Figma candlestick, with a flickering flame and a soft
 * ringed glow that pulses. Sized in Figma px; the glow spills past the box.
 */
const Candle = forwardRef<SVGSVGElement, CandleProps>(
  (
    {
      height = 131.273,
      flame = true,
      holderHeight = STICK_H,
      animate = true,
      className,
      style,
    },
    ref,
  ) => {
    const c = decorColors;

    const stickH = Math.max(MIN_STICK_H, holderHeight);
    const vaseScale = (VASE_H + stickH - STICK_H) / VASE_H;
    const shift = stickH - STICK_H; // pushes everything under the vase

    // The wax bottom tucks 2px into the socket; the stick hangs from there.
    const stickTop = LIP_Y + height - 2 - SOCKET_CENTER_Y;
    const total = Math.ceil(stickTop + stickH);

    return (
      <svg
        ref={ref}
        data-anim={animAttr(animate)}
        data-decor="candle"
        width={W}
        height={total}
        viewBox={`0 0 ${W} ${total}`}
        aria-hidden
        focusable={false}
        className={className}
        style={{
          display: "block",
          pointerEvents: "none",
          overflow: "visible",
          ...style,
        }}
      >
        {flame && (
          <g className="decor-part decor-glow">
            {GLOW_RINGS.map((r, i) => (
              <circle
                key={r}
                cx={CX}
                cy={LIP_Y - 20}
                r={r}
                fill={i === GLOW_RINGS.length - 1 ? c.flameCore : c.candleGlow}
                opacity={0.06}
              />
            ))}
          </g>
        )}

        {/* ---- candlestick, painted bottom → top so each joint is covered ---- */}
        <g transform={`translate(0 ${stickTop})`}>
          {renderLayer(FOOT, shift)}
          <path
            d={SOCKET_ELLIPSE}
            fill="#060825"
            transform={`translate(${CX - SOCKET_AXIS} ${KNOB_SHADOW_Y + shift})`}
          />
          {renderLayer(KNOB, shift)}
          <g
            transform={`translate(0 ${VASE_Y}) scale(1 ${vaseScale}) translate(0 ${-VASE_Y})`}
          >
            {renderLayer(VASE)}
          </g>
          {renderLayer(LOWER_BAND, shift)}
          {renderLayer(FUNNEL)}
          {renderLayer(BOWL)}
          {renderLayer(UPPER_BAND)}
          {renderLayer(DISH)}
          <path
            d={SOCKET_ELLIPSE}
            fill="#060825"
            transform={`translate(${CX - SOCKET_AXIS} ${SOCKET_Y})`}
          />
        </g>

        {/* ---- wax ---- */}
        <path
          transform={`translate(${CX - WAX_CENTER_X} ${LIP_Y})`}
          d={waxPath(height)}
          fill={c.wax}
        />

        {/* ---- wick + flame ---- */}
        <g
          transform={`translate(${CX - FLAME_WICK_X} ${LIP_Y - FLAME_WICK_Y})`}
        >
          <line
            x1={FLAME_WICK_X}
            y1={48.7422}
            x2={FLAME_WICK_X}
            y2={FLAME_WICK_Y}
            stroke={c.wick}
            strokeWidth={0.767677}
            strokeLinecap="round"
          />
          {flame && (
            <g className="decor-part decor-flicker">
              <path d={FLAME_OUTER} fill={c.flame} />
              <path d={FLAME_INNER} fill={c.flameInner} />
              <path d={FLAME_HIGHLIGHT} fill={c.flameHighlight} />
            </g>
          )}
        </g>
      </svg>
    );
  },
);

Candle.displayName = "Candle";

export default Candle;
