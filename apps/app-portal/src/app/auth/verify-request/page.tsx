//"Check your email" confirmation screen
import React from "react";
import TiledBackground from "@/components/ui/tiled-background";

export default function Page(): JSX.Element {
  return (
    <div className="relative w-[100vw] h-[100vh] overflow-hidden">
      <TiledBackground />

      {/* confirmation message */}
      <div className="relative z-10 text-center w-full h-full flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-bold mb-2">Check your email</h1>
        <p className="max-w-md text-gray-700">
          Check your email for a confirmation message!
        </p>
      </div>
    </div>
  );
}
