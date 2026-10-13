import React from "react";
import HeaderDemo from "./HeaderDemo";
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
    <ScrollStage>
      {process.env.NODE_ENV !== "production" && <StageDebug />}
    </ScrollStage>
  );
}
