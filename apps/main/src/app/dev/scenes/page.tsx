import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { SceneHarness } from "./SceneHarness";
import { TransitionHarness } from "./TransitionHarness";

export default function ScenesDevPage({
  searchParams,
}: {
  searchParams: { transition?: string };
}) {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <Suspense>
      {searchParams.transition ? <TransitionHarness /> : <SceneHarness />}
    </Suspense>
  );
}
