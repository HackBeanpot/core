//magic-link email entry form
import React from "react";
import Image from "next/image";
import icon from "@/app/icon.ico";

const gap = 4;

function SignInForm() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        {/*icon*/}
        <Image src={icon} alt="HBP Logo" width={64} height={64} />
        {/*title*/}
        <p className={`mt-${gap} text-black text-2xl`}>HackBeanpot</p>
        {/*input*/}
        <input
          placeholder="Email"
          className={`p-1 mt-${gap} border-2 rounded-md`}
        />
        {/*confirm*/}
        <button
          className={`bg-starlightBlueLight text-white p-1 px-5 mt-${gap} border-2 rounded-md`}
        >
          Sign in with email
        </button>
      </div>
    </>
  );
}

export default function Page(): JSX.Element {
  return (
    <>
      <SignInForm />
    </>
  );
}
