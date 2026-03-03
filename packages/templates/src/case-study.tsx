import React, { type CSSProperties } from "react";
import {
  Kino,
  Scene,
  Reveal,
  Parallax,
  Counter,
  Progress,
  StickyHeader,
  TextReveal,
  ScrollTransform,
  Marquee,
} from "react-kino";

interface CaseStudyProps {
  /** Project title */
  title: string;
  /** Client name */
  client: string;
  /** Year of project */
  year: string | number;
  /** Optional hero background image URL */
  heroImage?: string;
  /** Project overview text */
  overview: string;
  /** The challenge faced */
  challenge: string;
  /** The solution delivered */
  solution: string;
  /** Measurable results */
  results?: Array<{
    metric: string;
    value: number;
    format?: (n: number) => string;
  }>;
  /** Link to the next project */
  nextProject?: { title: string; href: string };
  /** Optional navigation items for sticky header */
  navItems?: Array<{ label: string; href?: string }>;
  /** Show scroll-down hint on hero. Default: true */
  showScrollHint?: boolean;
  /** Custom items for the results marquee ticker */
  marqueeItems?: string[];
}

export function CaseStudy({
  title,
  client,
  year,
  heroImage,
  overview,
  challenge,
  solution,
  results = [],
  nextProject,
  navItems,
  showScrollHint = true,
  marqueeItems,
}: CaseStudyProps) {
  const baseStyle: CSSProperties = {
    margin: 0,
    padding: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: "#ffffff",
    background: "#0a0a0a",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  const sectionCenter: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "0 24px",
    textAlign: "center",
  };

  const tickerItems =
    marqueeItems ??
    results.map(
      (r) => `${r.format ? r.format(r.value) : r.value} ${r.metric}`
    );

  return (
    <div style={baseStyle}>
      <Kino>
        <Progress color="#e5e5e5" position="top" />

        {/* Sticky Header */}
        <StickyHeader
          threshold={40}
          background="rgba(0, 0, 0, 0.72)"
          blur
          style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}
        >
          <div
            style={{
              maxWidth: "980px",
              margin: "0 auto",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
            }}
          >
            <span
              style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}
            >
              {client}
            </span>
            <div
              style={{ display: "flex", alignItems: "center", gap: "24px" }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {year}
              </span>
              {navItems && navItems.length > 0 && (
                <nav style={{ display: "flex", gap: "20px" }}>
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href ?? "#"}
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.6)",
                        textDecoration: "none",
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </StickyHeader>

        {/* Hero with ScrollTransform */}
        <Scene duration="150vh">
          {(progress) => (
            <div
              style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
              }}
            >
              <Parallax speed={0.4}>
                <div
                  style={{
                    position: "absolute",
                    inset: "-20%",
                    background: heroImage
                      ? `url(${heroImage}) center/cover no-repeat`
                      : "linear-gradient(160deg, #111 0%, #1a1a2e 50%, #0a0a0a 100%)",
                  }}
                />
                {heroImage && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
                    }}
                  />
                )}
              </Parallax>
              <div
                style={{
                  ...sectionCenter,
                  position: "relative",
                  zIndex: 1,
                  gap: "16px",
                }}
              >
                <ScrollTransform
                  from={{ scale: 1, y: 0, opacity: 1 }}
                  to={{ scale: 0.85, y: -50, opacity: 0 }}
                  span={0.7}
                  easing="ease-out"
                >
                  <p
                    style={{
                      fontSize: "0.875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "rgba(255, 255, 255, 0.5)",
                      margin: 0,
                      textAlign: "center",
                    }}
                  >
                    {client} &middot; {year}
                  </p>
                  <h1
                    style={{
                      fontSize: "clamp(2.5rem, 8vw, 6rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      lineHeight: 1.05,
                      margin: "16px 0 0",
                      maxWidth: "900px",
                      textAlign: "center",
                    }}
                  >
                    {title}
                  </h1>
                </ScrollTransform>
                {showScrollHint && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "40px",
                      opacity: Math.max(0, 1 - progress * 5),
                      fontSize: "1.5rem",
                      color: "rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    &#8595;
                  </div>
                )}
              </div>
            </div>
          )}
        </Scene>

        {/* Overview — TextReveal */}
        <Scene duration="300vh">
          <div style={sectionCenter}>
            <div style={{ maxWidth: "680px" }}>
              <Reveal at={0.05} animation="fade-up">
                <p
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "rgba(255, 255, 255, 0.35)",
                    marginBottom: "32px",
                  }}
                >
                  Overview
                </p>
              </Reveal>
              <TextReveal
                mode="word"
                at={0.1}
                span={0.8}
                color="#ffffff"
                dimColor="rgba(255, 255, 255, 0.1)"
              >
                {overview}
              </TextReveal>
            </div>
          </div>
        </Scene>

        {/* Challenge & Solution — ScrollTransform cards */}
        <Scene duration="250vh">
          <div style={sectionCenter}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "64px",
                maxWidth: "1000px",
                width: "100%",
                padding: "0 24px",
                textAlign: "left",
              }}
            >
              <ScrollTransform
                from={{ y: 60, opacity: 0, scale: 0.95 }}
                to={{ y: 0, opacity: 1, scale: 1 }}
                at={0.1}
                span={0.3}
                easing="ease-out"
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "#ef4444",
                      marginBottom: "16px",
                    }}
                  >
                    The Challenge
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(1rem, 2vw, 1.25rem)",
                      lineHeight: 1.7,
                      color: "rgba(255, 255, 255, 0.7)",
                      margin: 0,
                    }}
                  >
                    {challenge}
                  </p>
                </div>
              </ScrollTransform>
              <ScrollTransform
                from={{ y: 60, opacity: 0, scale: 0.95 }}
                to={{ y: 0, opacity: 1, scale: 1 }}
                at={0.4}
                span={0.3}
                easing="ease-out"
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "#22c55e",
                      marginBottom: "16px",
                    }}
                  >
                    The Solution
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(1rem, 2vw, 1.25rem)",
                      lineHeight: 1.7,
                      color: "rgba(255, 255, 255, 0.7)",
                      margin: 0,
                    }}
                  >
                    {solution}
                  </p>
                </div>
              </ScrollTransform>
            </div>
          </div>
        </Scene>

        {/* Results */}
        {results.length > 0 && (
          <Scene duration="150vh">
            <div style={sectionCenter}>
              <Reveal at={0.1} animation="fade">
                <p
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "rgba(255, 255, 255, 0.35)",
                    marginBottom: "48px",
                  }}
                >
                  Results
                </p>
              </Reveal>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "64px",
                }}
              >
                {results.map((result, i) => (
                  <div key={result.metric} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      <Counter
                        from={0}
                        to={result.value}
                        at={0.2 + i * 0.15}
                        span={0.35}
                        format={result.format}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.5)",
                        marginTop: "8px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {result.metric}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Scene>
        )}

        {/* Results Marquee Ticker */}
        {tickerItems.length > 0 && (
          <div
            style={{
              borderTop: "0.5px solid rgba(255,255,255,0.08)",
              borderBottom: "0.5px solid rgba(255,255,255,0.08)",
              padding: "20px 0",
            }}
          >
            <Marquee speed={30}>
              {tickerItems.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </span>
              ))}
            </Marquee>
          </div>
        )}

        {/* Next Project */}
        {nextProject && (
          <div style={sectionCenter}>
            <p
              style={{
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(255, 255, 255, 0.35)",
                margin: "0 0 24px",
              }}
            >
              Next Project
            </p>
            <a
              href={nextProject.href}
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "#ffffff",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                transition: "opacity 150ms ease",
                lineHeight: 1.2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              {nextProject.title} &rarr;
            </a>
          </div>
        )}
      </Kino>
    </div>
  );
}
