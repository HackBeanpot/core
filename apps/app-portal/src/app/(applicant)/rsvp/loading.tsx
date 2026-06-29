import React from "react";

export default function Loading(): JSX.Element {
  return (
    <section className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="h-5 w-40 rounded-full bg-slate-200" />
        <div className="h-11 w-3/4 rounded-3xl bg-slate-100" />
        <div className="h-24 rounded-3xl bg-slate-100" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-16 rounded-3xl bg-slate-100" />
          <div className="h-16 rounded-3xl bg-slate-100" />
        </div>
        <div className="h-44 rounded-3xl bg-slate-100" />
      </div>
    </section>
  );
}
