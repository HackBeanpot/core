"use client";

import useIsMobile from "@repo/util/hooks/useIsMobile";
import { SessionProvider } from "next-auth/react";
import React, { createContext } from "react";

export const MobileContext = createContext({ isMobile: false });

export function Providers({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    // basePath MUST match the auth route location (/auth). Without this, the
    // next-auth/react client (signIn/signOut/useSession) posts to /api/auth → 404.
    <SessionProvider basePath="/auth">
      <MobileContext.Provider value={{ isMobile }}>
        {children}
      </MobileContext.Provider>
    </SessionProvider>
  );
}
