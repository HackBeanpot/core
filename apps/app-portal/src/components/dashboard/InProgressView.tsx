import React from "react";
import Link from "next/link";

export default function InProgressView(): JSX.Element {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold">Draft saved</h1>
      <Link className="mt-4 inline-block text-blue-600" href="#">
        Link to continue application
      </Link>
    </section>
  );
}
