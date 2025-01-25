import React from "react";
import Landing from "./Sections/Landing";
import Resources from "./Sections/Resources";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Landing />
      <Resources />
    </main>
  );
}
