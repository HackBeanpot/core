"use client";

import { useIsMobile } from "@repo/util";
import React, { createContext } from "react";

export const MobileContext = createContext({ isMobile: false });

export function Providers({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
}
