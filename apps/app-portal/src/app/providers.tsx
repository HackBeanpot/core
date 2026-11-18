"use client";

import useIsMobile from "@repo/util/hooks/useIsMobile";
import { SessionProvider } from "next-auth/react";
import React, { createContext } from "react";

export const MobileContext = createContext({ isMobile: false });

export function Providers({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <SessionProvider>
      <MobileContext.Provider value={{ isMobile }}>
        {children}
      </MobileContext.Provider>
    </SessionProvider>
  );
}
