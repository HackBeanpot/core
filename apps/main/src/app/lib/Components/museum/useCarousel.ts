import { useCallback, useEffect, useState } from "react";

// 1 = forward; -1 = backward
export type CarouselDirection = 1 | -1;

type UseCarouselOptions = {
  loop?: boolean;
};

const useCarousel = <T>(
  items: T[],
  { loop = false }: UseCarouselOptions = {},
) => {
  const count = items.length;
  const [rawIndex, setIndex] = useState(0);
  const [direction, setDirection] = useState<CarouselDirection>(1);

  // if the number of items decreases, update the index (if it's at the very end)
  const index = count === 0 ? 0 : Math.min(rawIndex, count - 1);
  useEffect(() => {
    if (rawIndex !== index) setIndex(index);
  }, [rawIndex, index]);

  const canPrev = count > 1 && (loop || index > 0);
  const canNext = count > 1 && (loop || index < count - 1);

  const next = useCallback(() => {
    if (!canNext) return;
    setDirection(1);
    setIndex((index + 1) % count);
  }, [canPrev, index, count]);

  const prev = useCallback(() => {
    if (!canPrev) return;
    setDirection(-1);
    setIndex((index - 1 + count) % count);
  }, [canPrev, index, count]);

  const goTo = useCallback(
    (target: number) => {
      if (count === 0) return;
      const clamped = Math.max(0, Math.min(target, count - 1));
      if (clamped === index) return;
      setDirection(clamped > index ? 1 : -1);
      setIndex(clamped);
    },
    [count, index],
  );

  return {
    index,
    item: count > 0 ? items[index] : undefined,
    next,
    prev,
    goTo,
    canPrev,
    canNext,
    direction,
  };
};

export default useCarousel;
