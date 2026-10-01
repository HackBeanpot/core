"use client";

import useIsMobile from "@repo/util/hooks/useIsMobile";
import { SessionProvider } from "next-auth/react";
import React, { createContext } from "react";

export const MobileContext = createContext({ isMobile: false });

export function Providers({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    // Auth route lives at the default /api/auth. On Vercel, NextAuth derives its URL
    // from the request host and ignores any path in NEXTAUTH_URL, so it must stay there.
    <SessionProvider>
      <MobileContext.Provider value={{ isMobile }}>
        {children}
      </MobileContext.Provider>
    </SessionProvider>
  );
}
