import { Loader2 } from "lucide-react";
import React from "react";

export default function ApplicantDetailLoading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center text-neutral-500">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}
