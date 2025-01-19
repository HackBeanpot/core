import { useEffect, useState } from "react";

const useContentHeight = (ref: React.RefObject<HTMLElement>) => {
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;

    function handleResize() {
      setContentHeight(ref.current?.clientHeight || 0);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  return [contentHeight, setContentHeight] as const;
};

export default useContentHeight;
