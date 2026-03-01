"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { ScrollTracker } from "@react-kino/core";

interface KinoContextValue {
  tracker: ScrollTracker;
}

const KinoContext = createContext<KinoContextValue | null>(null);

export function useKino(): KinoContextValue {
  const ctx = useContext(KinoContext);
  if (!ctx) throw new Error("<Kino> provider is required");
  return ctx;
}

interface KinoProps {
  children: ReactNode;
}

export function Kino({ children }: KinoProps) {
  const trackerRef = useRef<ScrollTracker>(new ScrollTracker());

  useEffect(() => {
    const tracker = trackerRef.current;
    tracker.start();
    return () => tracker.stop();
  }, []);

  return (
    <KinoContext.Provider value={{ tracker: trackerRef.current }}>
      {children}
    </KinoContext.Provider>
  );
}
