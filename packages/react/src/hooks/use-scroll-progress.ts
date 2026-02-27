"use client";
import { useState, useEffect } from "react";
import { ScrollTracker } from "@kino/core";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const tracker = new ScrollTracker();
    const unsub = tracker.subscribe((data) => setProgress(data.progress));
    tracker.start();
    return () => {
      tracker.stop();
      unsub();
    };
  }, []);
  return progress;
}
