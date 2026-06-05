"use client";
//avatar + sign-out dropdown for header
import React, {useEffect, useRef, useState} from "react";

interface UserMenuProps {
  /** Signed-in user's email. Shown in the dropdown; first letter is the avatar. */
  email: string;
}


export default function UserMenu({email}: UserMenuProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initial = (email.trim()[0] ?? "?").toUpperCase();

  //menu close handling
  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function handleSignOut() {
    setOpen(false);
    // TODO: wire to NextAuth — signOut({ callbackUrl: "/" }) once next-auth is installed.
    await fetch("/api/auth/signout", {method: "POST"}).catch(() => {});
    window.location.href = "/";
  }

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* avatar button */}
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open user menu"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#352A28] text-sm font-semibold text-white hover:opacity-90 transition-opacity"
      >
        {initial}
      </button>

      {/* dropdown */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md border bg-white py-1 shadow-lg"
        >
          {/* signed-in identity */}
          <div className="px-3 py-2 border-b">
            <p className="text-xs text-gray-500">Signed in as</p>
            <p className="truncate text-sm font-medium text-gray-900" title={email}>
              {email}
            </p>
          </div>

          {/* sign out */}
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
