"use client";
import React, {
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";
import { ScrollTracker, calcSceneProgress, parseDuration } from "@kino/core";
import { useIsClient } from "./hooks/use-is-client";

interface VideoScrollProps {
  /** URL of the video file (MP4 recommended, no audio needed) */
  src: string;
  /** Scroll distance. Default: "300vh" */
  duration?: string;
  /** Whether to pin while scrubbing. Default: true */
  pin?: boolean;
  /** Overlay content rendered on top of the video */
  children?: ReactNode | ((progress: number) => ReactNode);
  className?: string;
  /** Poster image shown before video loads */
  poster?: string;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function VideoScroll({
  src,
  duration = "300vh",
  pin = true,
  children,
  className,
  poster,
}: VideoScrollProps) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const isClient = useIsClient();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isClient) return;

    const viewportHeight = window.innerHeight;
    const durationPx = parseDuration(duration, viewportHeight);
    const tracker = new ScrollTracker();

    const unsub = tracker.subscribe(({ scrollY }) => {
      if (!spacerRef.current) return;
      const rect = spacerRef.current.getBoundingClientRect();
      const offsetTop = rect.top + scrollY;
      setProgress(calcSceneProgress(scrollY, offsetTop, durationPx));
    });

    tracker.start();
    return () => {
      tracker.stop();
      unsub();
    };
  }, [isClient, duration]);

  // Scrub the video based on scroll progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isClient || reducedMotion) return;

    const dur = video.duration;
    if (!isFinite(dur) || dur === 0) return;

    video.currentTime = progress * dur;
  }, [progress, isClient, reducedMotion]);

  const viewportHeight = isClient ? window.innerHeight : 0;
  const durationPx = isClient ? parseDuration(duration, viewportHeight) : 0;

  const spacerStyle: CSSProperties = {
    position: "relative",
    height: isClient ? `${durationPx}px` : duration,
  };

  const stickyStyle: CSSProperties = pin
    ? {
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
      }
    : {};

  const videoStyle: CSSProperties = {
    width: "100%",
    height: "100vh",
    objectFit: "cover",
    display: "block",
  };

  const overlayStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "auto",
  };

  const resolvedChildren =
    typeof children === "function" ? children(progress) : children;

  return (
    <div ref={spacerRef} style={spacerStyle} className={className}>
      <div style={stickyStyle}>
        <video
          ref={videoRef}
          src={src}
          preload="auto"
          muted
          playsInline
          autoPlay={false}
          poster={poster}
          style={videoStyle}
        />
        {resolvedChildren && <div style={overlayStyle}>{resolvedChildren}</div>}
      </div>
    </div>
  );
}
