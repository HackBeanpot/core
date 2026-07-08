"use client";

import useIsMobile from "@repo/util/hooks/useIsMobile";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { createContext, useEffect } from "react";
import { authLog } from "@/lib/auth/log";

export const MobileContext = createContext({ isMobile: false });

export function Providers({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  // Frontend trace: which path the browser is on + whether an auth cookie exists.
  useEffect(() => {
    const hasSessionCookie = document.cookie
      .split("; ")
      .some(
        (c) =>
          c.startsWith("next-auth.session-token") ||
          c.startsWith("__Secure-next-auth.session-token"),
      );
    authLog("client", `navigated → ${pathname}`, { hasSessionCookie });
  }, [pathname]);

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
