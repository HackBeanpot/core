"use client";
//client hook: fetches the current user from /api/v1/user; 401 -> null
import { useEffect, useState } from "react";

export interface CurrentUser {
  email: string | null;
  id?: string;
  isAdmin?: boolean;
}

export default function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/v1/user", { cache: "no-store" })
      .then((res) => (res.ok ? (res.json() as Promise<CurrentUser>) : null))
      .then((data) => {
        if (active) setUser(data);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { user, loading };
}
