import { useEffect, useRef, type RefObject } from "react";

type UseSwipeOptions = {
  onLeft?: () => void; // finger moves left -> usually "next"
  onRight?: () => void; // finger moves right -> usually "prev"
  thresholdPx?: number;
  enabled?: boolean;
};

const useSwipe = (
  ref: RefObject<HTMLElement | null>,
  { onLeft, onRight, thresholdPx = 40, enabled = true }: UseSwipeOptions,
) => {
  // Keep the latest callbacks without re-attaching listeners every render.
  const handlers = useRef({ onLeft, onRight });
  useEffect(() => {
    handlers.current = { onLeft, onRight };
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    // The browser keeps vertical scrolling; horizontal gestures come to us.
    const previousTouchAction = el.style.touchAction;
    el.style.touchAction = "pan-y";

    let start: { x: number; y: number; id: number } | null = null;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      start = { x: e.clientX, y: e.clientY, id: e.pointerId };
    };

    const onUp = (e: PointerEvent) => {
      if (!start || e.pointerId !== start.id) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      start = null;

      // Mostly horizontal and past the threshold, or it's not a swipe.
      if (Math.abs(dx) < thresholdPx || Math.abs(dx) <= Math.abs(dy)) return;
      if (dx < 0) handlers.current.onLeft?.();
      else handlers.current.onRight?.();
    };

    // Fires when the browser takes over for a vertical scroll.
    const onCancel = () => {
      start = null;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onCancel);

    return () => {
      el.style.touchAction = previousTouchAction;
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onCancel);
    };
  }, [ref, thresholdPx, enabled]);
};

export default useSwipe;
