import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { SceneHarness } from "./SceneHarness";

export default function ScenesDevPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <Suspense>
      <SceneHarness />
    </Suspense>
  );
}
