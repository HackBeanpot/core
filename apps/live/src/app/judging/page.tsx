import React from "react";
import Judging from "./Judging";
import NavBar from "../lib/Components/NavBar";

export default function Page(): JSX.Element {
  return (
    <main>
      <NavBar />
      <Judging />
    </main>
  );
}
