"use client";
import { RefObject, useState, useEffect } from "react";
import { ScrollTracker, calcSceneProgress } from "@kino/core";

export function useSceneProgress(
  spacerRef: RefObject<HTMLElement | null>,
  durationPx: number
): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const tracker = new ScrollTracker();
    const unsub = tracker.subscribe(({ scrollY }) => {
      if (!spacerRef.current) return;
      const offsetTop =
        spacerRef.current.getBoundingClientRect().top + scrollY;
      setProgress(calcSceneProgress(scrollY, offsetTop, durationPx));
    });
    tracker.start();
    return () => {
      tracker.stop();
      unsub();
    };
  }, [spacerRef, durationPx]);
  return progress;
}
