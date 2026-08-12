import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import icon from "@/app/icon.ico";
import TiledBackground from "@/components/ui/tiled-background";
import { getSession } from "@/lib/auth/session";

export default async function Page(): Promise<JSX.Element> {
  const session = await getSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative w-[100vw] h-[100vh] overflow-hidden">
      <TiledBackground />

      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-6 text-center gap-6">
        <Image src={icon} alt="HackBeanpot logo" width={96} height={96} />

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl">Welcome to HackBeanpot!</h1>
          <p className="max-w-md text-lg text-gray-700">
            Find all resources for the competition here in the portal by signing
            in now.
          </p>
        </div>

        <Link
          href="/auth/signin"
          className="rounded-md bg-[#352A28] px-6 py-3 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
