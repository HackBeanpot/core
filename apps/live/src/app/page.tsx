import React from "react";
import Landing from "./Sections/Landing";
import GuestSpeaker from "./Sections/GuestSpeaker";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Landing />
      <GuestSpeaker />
    </main>
  );
}
