"use client";

import React, { useRef } from "react";
import {
  CarouselArrow,
  CarouselRegion,
  CarouselSwap,
  useCarousel,
  useSwipe,
  useHorizontalGallery,
  galleryTrackClassName,
  galleryItemClassName,
} from "../../lib/Components/museum";

type DemoItem = { title: string; body: string };

const makeItems = (n: number): DemoItem[] =>
  Array.from({ length: n }, (_, i) => ({
    title: `Slide ${i + 1}`,
    body: `Placeholder content for slide ${i + 1}.`,
  }));

const NONE = makeItems(0);
const ONE = makeItems(1);
const MANY = makeItems(5);
const TEAM = makeItems(12);

type SlideExampleProps = {
  title: string;
  items: DemoItem[];
  loop?: boolean;
  animated?: boolean;
  swipe?: boolean;
  arrowSize?: "sm" | "lg";
};

const SlideExample = ({
  title,
  items,
  loop = false,
  animated = true,
  swipe = false,
  arrowSize = "lg",
}: SlideExampleProps) => {
  const { index, item, next, prev, canPrev, canNext, direction } = useCarousel(
    items,
    { loop },
  );
  const swipeRef = useRef<HTMLDivElement>(null);
  useSwipe(swipeRef, { onLeft: next, onRight: prev, enabled: swipe });

  return (
    <section className="space-y-2">
      <h2 className="font-semibold">{title}</h2>
      <CarouselRegion
        label={title}
        onPrev={prev}
        onNext={next}
        className="flex items-center gap-4 rounded-lg border border-gray-300 p-4"
      >
        <CarouselArrow
          direction="left"
          size={arrowSize}
          disabled={!canPrev}
          onClick={prev}
          aria-label="Previous slide"
        />
        <div ref={swipeRef} className="min-w-0 flex-1 select-none">
          {items.length === 0 || item === undefined ? (
            <p className="text-gray-500">No items to show.</p>
          ) : (
            <CarouselSwap
              swapKey={index}
              direction={direction}
              animated={animated}
            >
              <div className="rounded-md bg-gray-100 p-6">
                <h3 className="font-semibold">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </CarouselSwap>
          )}
        </div>
        <CarouselArrow
          direction="right"
          size={arrowSize}
          disabled={!canNext}
          onClick={next}
          aria-label="Next slide"
        />
      </CarouselRegion>
      <p className="text-sm text-gray-500">
        {items.length === 0 ? "0 items" : `${index + 1} / ${items.length}`}
      </p>
    </section>
  );
};

const GalleryExample = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { canPrev, canNext, next, prev } = useHorizontalGallery(trackRef);

  return (
    <section className="space-y-2">
      <h2 className="font-semibold">Team gallery (arrows, trackpad, touch)</h2>
      <CarouselRegion
        label="Team"
        onPrev={prev}
        onNext={next}
        className="flex items-center gap-4 rounded-lg border border-gray-300 p-4"
      >
        <CarouselArrow
          direction="left"
          disabled={!canPrev}
          onClick={prev}
          aria-label="Previous team members"
        />
        <div
          ref={trackRef}
          className={`${galleryTrackClassName} min-w-0 flex-1 gap-4`}
        >
          {TEAM.map((member) => (
            <div
              key={member.title}
              className={`${galleryItemClassName} w-[200px] rounded-md bg-gray-100 p-6`}
            >
              {member.title}
            </div>
          ))}
        </div>
        <CarouselArrow
          direction="right"
          disabled={!canNext}
          onClick={next}
          aria-label="Next team members"
        />
      </CarouselRegion>
    </section>
  );
};

const CarouselDemoPage = () => (
  <main className="mx-auto max-w-3xl space-y-10 p-8">
    <h1 className="text-2xl font-bold">Carousel primitives</h1>

    <section className="space-y-2">
      <h2 className="font-semibold">Arrows</h2>
      <div className="flex flex-wrap items-center gap-4">
        <CarouselArrow direction="left" aria-label="Left, large" />
        <CarouselArrow direction="right" aria-label="Right, large" />
        <CarouselArrow direction="left" size="sm" aria-label="Left, small" />
        <CarouselArrow direction="right" size="sm" aria-label="Right, small" />
        <CarouselArrow direction="right" disabled aria-label="Disabled" />
      </div>
    </section>

    <SlideExample title="0 items" items={NONE} />
    <SlideExample
      title="1 item, loop on (arrows stay disabled)"
      items={ONE}
      loop
    />
    <SlideExample title="Many items, no loop" items={MANY} />
    <SlideExample title="Many items, loop" items={MANY} loop />
    <SlideExample
      title="Many items, animated off (SM)"
      items={MANY}
      animated={false}
      arrowSize="sm"
    />
    <SlideExample
      title="Swipe (try on a phone)"
      items={MANY}
      swipe
      animated={false}
      arrowSize="sm"
    />
    <GalleryExample />
  </main>
);

export default CarouselDemoPage;
