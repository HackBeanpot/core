import { useCallback, useEffect, useState, type RefObject } from "react";

/** Put on the scrolling row. */
export const galleryTrackClassName =
  "flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

/** Put on each card in the row. */
export const galleryItemClassName = "snap-start shrink-0";

const useHorizontalGallery = (ref: RefObject<HTMLElement | null>) => {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // 1px tolerance for subpixel rounding.
    setCanPrev(el.scrollLeft > 1);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    update();
    el.addEventListener("scroll", update, { passive: true });

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);
    Array.from(el.children).forEach((child) => resizeObserver.observe(child));

    return () => {
      el.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [ref, update]);

  const scrollPage = useCallback(
    (dir: 1 | -1) => {
      const el = ref.current;
      if (!el) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el.scrollBy({
        left: dir * el.clientWidth,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [ref],
  );

  return {
    canPrev,
    canNext,
    next: () => scrollPage(1),
    prev: () => scrollPage(-1),
    update,
  };
};

export default useHorizontalGallery;
