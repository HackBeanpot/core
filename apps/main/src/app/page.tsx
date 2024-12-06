import Calendar from "./(landing)/Sections/Calendar/Calendar";
import Stats from "./(landing)/Sections/Stats";

import React from "react";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Stats />
      <Calendar />
    </main>
  );
}
