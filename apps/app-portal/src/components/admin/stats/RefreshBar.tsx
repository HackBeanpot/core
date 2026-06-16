"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RefreshBarProps {
  generatedAt: string;
}

export function RefreshBar({ generatedAt }: RefreshBarProps): JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  // format on client browser so label uses admin's local timezone & React matches
  const [updatedLabel, setUpdatedLabel] = React.useState("");
  React.useEffect(() => {
    setUpdatedLabel(
      new Date(generatedAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    );
  }, [generatedAt]);

  const handleRefresh = (): void => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-3 text-sm text-neutral-500">
      <span>Last updated {updatedLabel || "…"}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRefresh}
        disabled={isPending}
      >
        <RefreshCw
          className={cn("mr-2 h-4 w-4", isPending && "animate-spin")}
        />
        Refresh
      </Button>
    </div>
  );
}
