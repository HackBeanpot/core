"use client";

import React from "react";

import { Button } from "@/components/ui/button";

export function ExportButtons() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" asChild>
        <a download href="/api/v1/export/applications">
          Export applications CSV
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a download href="/api/v1/export/post-acceptance">
          Export RSVPs CSV
        </a>
      </Button>
    </div>
  );
}
