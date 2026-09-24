import React from "react";
import { Footer, Header } from "../lib/Components";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      <Header />
      <Footer />
    </div>
  );
}
