import React from "react";
import HeaderDemo from "./HeaderDemo";
import { MobileHero } from "./mobile/MobileHero";
import { ScrollStage } from "./scenes/ScrollStage";
import { StageDebug } from "./StageDebug";

// TODO(MS-301): render ScrollStage (with the Header/Footer) unconditionally.
export default function Page({
  searchParams,
}: {
  searchParams: { stage?: string };
}) {
  if (searchParams.stage !== "1") return <HeaderDemo />;
  return (
    <>
      {/* SM is static (MS-502 adds the rest of the SM page); ScrollStage hides itself below 640px. */}
      <div className="hidden mobile-xl:block mobile:block">
        <MobileHero />
      </div>
      <ScrollStage>
        {process.env.NODE_ENV !== "production" && <StageDebug />}
      </ScrollStage>
    </>
  );
}
