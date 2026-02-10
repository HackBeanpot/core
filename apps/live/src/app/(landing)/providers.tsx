"use client";

import useIsMobile from "@repo/util/hooks/useIsMobile";
import React, { createContext, ReactElement, useState } from "react";

export type ModalContextProps = {
  modal: ReactElement | null;
  setModal: (component: ReactElement | null) => void;
};

export const MobileContext = createContext({ isMobile: false });
export const ModalContext = createContext<ModalContextProps>({
  modal: null,
  setModal: () => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [modalComponent, setModalComponent] = useState<ReactElement | null>(
    null,
  );

  return (
    <MobileContext.Provider value={{ isMobile }}>
      <ModalContext.Provider
        value={{ modal: modalComponent, setModal: setModalComponent }}
      >
        <div>
          {!!modalComponent && (
            <div className="flex sticky top-0 justify-center items-center w-full h-full z-50">
              <div
                className="w-[100vw] h-[100vh]"
                autoFocus
                onBlur={() => {
                  setModalComponent(null);
                }}
              >
                {modalComponent}
              </div>
            </div>
          )}

          {children}
        </div>
      </ModalContext.Provider>
    </MobileContext.Provider>
  );
}
