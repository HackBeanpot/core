import React from "react";
import PictureFrame, {
  PictureFrameVariant,
} from "../../lib/Components/museum/PictureFrame";

const WIDTHS = ["80px", "163px", "300px", "500px"];
const VARIANTS: PictureFrameVariant[] = [
  "goldBevel",
  "silverBevel",
  "wood",
  "copper",
  "copperRect",
  "greenArch",
  "navyShield",
  "blueMedallion",
  "goldMedallion",
  "placeholderOval",
];

const FramesDevPage = () => (
  <main className="space-y-10 bg-[#15173b] p-8">
    {VARIANTS.map((variant) => (
      <section key={variant} className="space-y-3">
        <h2 className="font-bold text-white">{variant}</h2>
        <div className="flex flex-wrap items-end gap-8">
          {WIDTHS.map((w) => (
            <PictureFrame
              key={w}
              variant={variant}
              width={w}
              src="/team.png"
              alt=""
            />
          ))}
          <PictureFrame
            variant={variant}
            width="200px"
            innerClassName="flex items-center justify-center bg-white"
          >
            <span className="font-bold">LOGO</span>
          </PictureFrame>
        </div>
      </section>
    ))}
    <section className="space-y-3">
      <h2 className="font-bold text-white">Custom aspect (rect frames)</h2>
      <div className="flex flex-wrap items-end gap-8">
        <PictureFrame
          variant="goldBevel"
          width="300px"
          aspect="3 / 2"
          src="/team.png"
          alt=""
        />
        <PictureFrame
          variant="wood"
          width="200px"
          aspect="4 / 5"
          src="/team.png"
          alt=""
        />
        <PictureFrame
          variant="copper"
          width="300px"
          aspect="1 / 1"
          src="/team.png"
          alt=""
        />
      </div>
    </section>
  </main>
);

export default FramesDevPage;
