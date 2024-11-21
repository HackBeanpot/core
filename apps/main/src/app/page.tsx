import { Stats } from "./Sections";
import React from "react";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Stats />
    </main>
  );
}
