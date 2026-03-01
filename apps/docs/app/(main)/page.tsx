"use client";

import {
  Kino,
  Scene,
  Reveal,
  Parallax,
  Counter,
  CompareSlider,
  HorizontalScroll,
  Panel,
  TextReveal,
  Progress,
  Marquee,
  StickyHeader,
} from "react-kino";
import Link from "next/link";
import { useState } from "react";

/* ─── Hero ─── */
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Deep red glow orb */}
      <Parallax speed={0.15}>
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.03) 40%, transparent 70%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
      </Parallax>

      {/* Grid pattern */}
      <Parallax speed={0.3}>
        <div
          style={{
            position: "absolute",
            inset: "-60%",
            backgroundImage:
              "linear-gradient(rgba(220, 38, 38, 0.03) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(220, 38, 38, 0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
      </Parallax>

      {/* Diamond accent shapes */}
      <Parallax speed={0.5}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "15%",
            width: "80px",
            height: "80px",
            border: "1px solid rgba(220, 38, 38, 0.1)",
            transform: "rotate(45deg)",
            pointerEvents: "none",
          }}
        />
      </Parallax>
      <Parallax speed={0.7}>
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            left: "12%",
            width: "50px",
            height: "50px",
            border: "1px solid rgba(220, 38, 38, 0.08)",
            transform: "rotate(45deg)",
            pointerEvents: "none",
          }}
        />
      </Parallax>

      {/* Main content */}
      <Parallax speed={1.1}>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: "900px",
            padding: "0 24px",
          }}
        >
          <h1
            className="section-heading"
            style={{
              fontSize: "clamp(64px, 10vw, 150px)",
              marginBottom: "20px",
              textShadow: "0 0 80px rgba(220, 38, 38, 0.15)",
            }}
          >
            react-
            <span
              style={{
                background:
                  "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              kino
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.7,
              color: "#777",
              maxWidth: "520px",
              margin: "0 auto 36px",
              fontWeight: 300,
            }}
          >
            Cinematic scroll-driven storytelling for React.
            <br />
            Apple-style scroll experiences in under 3&nbsp;KB.
          </p>

          <div style={{ marginBottom: "28px" }}>
            <code
              style={{
                display: "inline-block",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "14px",
                background: "rgba(220, 38, 38, 0.05)",
                border: "1px solid rgba(220, 38, 38, 0.15)",
                borderRadius: "6px",
                padding: "10px 20px",
                color: "#ef4444",
              }}
            >
              npm install react-kino
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "14px",
                  background: "#ef4444",
                  marginLeft: "4px",
                  verticalAlign: "middle",
                  animation: "blink-cursor 1s infinite",
                }}
              />
            </code>
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/docs" className="gamer-btn-primary">
              Documentation
            </Link>
            <a
              href="https://github.com/bilaltahir/react-kino"
              target="_blank"
              rel="noopener noreferrer"
              className="gamer-btn-outline"
            >
              GitHub
            </a>
          </div>
        </div>
      </Parallax>

      <div
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: "#444",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          animation: "bounce-down 2s ease-in-out infinite",
        }}
      >
        ↓ scroll to explore
      </div>
    </section>
  );
}

/* ─── Marquee Strip ─── */
function MarqueeStrip() {
  const names = [
    "Scene",
    "Reveal",
    "Parallax",
    "Counter",
    "TextReveal",
    "CompareSlider",
    "HorizontalScroll",
    "Progress",
    "VideoScroll",
    "Marquee",
    "StickyHeader",
    "Kino",
  ];
  return (
    <div
      style={{
        borderTop: "1px solid #141414",
        borderBottom: "1px solid #141414",
        padding: "18px 0",
        background: "rgba(220, 38, 38, 0.01)",
      }}
    >
      <Marquee speed={25} gap={56}>
        {names.map((n) => (
          <span
            key={n}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              color: "#2a2a2a",
              letterSpacing: "0.05em",
            }}
          >
            {"<"}
            <span style={{ color: "#3a1515" }}>{n}</span>
            {" />"}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ─── Scene Demo ─── */
function SceneDemo() {
  return (
    <Scene duration="120vh">
      {(progress) => (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: `radial-gradient(ellipse at 50% 50%, rgba(220, 38, 38, ${0.04 + 0.1 * progress}) 0%, #080808 65%)`,
            padding: "0 24px",
          }}
        >
          <span className="component-tag" style={{ marginBottom: "32px" }}>
            {"<Scene>"}
          </span>
          <div
            style={{
              fontSize: "clamp(80px, 15vw, 200px)",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: "20px",
              background: `linear-gradient(135deg, #ffffff ${Math.max(0, 70 - progress * 100)}%, #ef4444 ${100 - progress * 50}%, #7f1d1d 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow:
                progress > 0.3
                  ? `0 0 60px rgba(220, 38, 38, ${progress * 0.3})`
                  : "none",
              filter:
                progress > 0.3
                  ? `drop-shadow(0 0 40px rgba(220, 38, 38, ${progress * 0.25}))`
                  : "none",
            }}
          >
            {Math.round(progress * 100)}%
          </div>
          <p
            style={{
              fontSize: "13px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#444",
              letterSpacing: "0.08em",
            }}
          >
            scene progress
          </p>

          {/* Audio-bar visualizer */}
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "6px",
              alignItems: "end",
              height: "60px",
            }}
          >
            {[0.8, 1.2, 1.6, 1.2, 0.8, 1.4, 1.0, 0.6].map((mult, i) => (
              <div
                key={i}
                style={{
                  width: "4px",
                  height: `${8 + progress * 50 * mult}px`,
                  background: `linear-gradient(to top, rgba(220, 38, 38, ${0.2 + progress * 0.8}), rgba(239, 68, 68, ${0.1 + progress * 0.6}))`,
                  borderRadius: "2px",
                  boxShadow:
                    progress > 0.5
                      ? `0 0 8px rgba(220, 38, 38, ${progress * 0.3})`
                      : "none",
                  transition: "height 0.1s ease",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </Scene>
  );
}

/* ─── TextReveal Demo ─── */
function TextRevealDemo() {
  return (
    <Scene duration="150vh">
      {(progress) => (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          <span className="component-tag" style={{ marginBottom: "40px" }}>
            {"<TextReveal>"}
          </span>
          <div
            style={{
              maxWidth: "700px",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 600,
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            <TextReveal progress={progress} mode="word" at={0.0} span={0.75}>
              Scroll-driven storytelling components for React. Build cinematic
              experiences without the complexity.
            </TextReveal>
          </div>
        </div>
      )}
    </Scene>
  );
}

/* ─── Reveal Demo ─── */
function RevealDemo() {
  const animations = [
    "fade",
    "fade-up",
    "fade-down",
    "scale",
    "blur",
  ] as const;

  return (
    <Scene duration="200vh">
      {(progress) => (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          <span className="component-tag" style={{ marginBottom: "32px" }}>
            {"<Reveal>"}
          </span>
          <h2
            className="section-heading"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              marginBottom: "16px",
              textAlign: "center",
              opacity: Math.min(1, progress * 6),
            }}
          >
            Five entrance animations.
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#666",
              marginBottom: "48px",
              textAlign: "center",
              opacity: Math.min(1, progress * 5),
            }}
          >
            Each triggered by scroll progress.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "900px",
            }}
          >
            {animations.map((anim, i) => (
              <Reveal
                key={anim}
                animation={anim}
                progress={progress}
                at={0.15 + i * 0.1}
                duration={800}
              >
                <div
                  className="gamer-card"
                  style={{ padding: "28px 32px", minWidth: "150px", textAlign: "center" }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "13px",
                      color: "#ef4444",
                      marginBottom: "8px",
                    }}
                  >
                    {anim}
                  </div>
                  <div style={{ fontSize: "13px", color: "#555" }}>animation</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </Scene>
  );
}

/* ─── Counter Demo ─── */
function CounterDemo() {
  return (
    <Scene duration="120vh">
      {(progress) => (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          <span className="component-tag" style={{ marginBottom: "32px" }}>
            {"<Counter>"}
          </span>
          <h2
            className="section-heading"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              marginBottom: "12px",
              textAlign: "center",
              opacity: Math.min(1, progress * 8),
            }}
          >
            Numbers that move.
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#666",
              marginBottom: "56px",
              textAlign: "center",
              opacity: Math.min(1, progress * 6),
            }}
          >
            Animated counters driven by scroll progress.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              maxWidth: "800px",
              width: "100%",
            }}
          >
            {[
              {
                label: "Bundle Size",
                to: 3,
                fmt: (n: number) => `${n.toFixed(1)} KB`,
              },
              { label: "Dependencies", to: 0, fmt: (n: number) => `${n}` },
              { label: "Components", to: 12, fmt: (n: number) => `${n}` },
            ].map((stat, i) => (
              <div key={stat.label} style={{ textAlign: "center", padding: "24px 8px" }}>
                <div
                  style={{
                    fontSize: "clamp(36px, 5vw, 72px)",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    color: "#ef4444",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    marginBottom: "8px",
                    textShadow: `0 0 40px rgba(220, 38, 38, ${0.1 + progress * 0.3})`,
                  }}
                >
                  <Counter
                    from={0}
                    to={stat.to}
                    at={0.05 + i * 0.05}
                    span={0.5}
                    progress={progress}
                    format={stat.fmt}
                  />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#444",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Scene>
  );
}

/* ─── Compare Demo ─── */
function CompareDemo() {
  return (
    <Scene duration="150vh">
      {(progress) => (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          <span className="component-tag" style={{ marginBottom: "32px" }}>
            {"<CompareSlider>"}
          </span>
          <h2
            className="section-heading"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              marginBottom: "12px",
              textAlign: "center",
              opacity: Math.min(1, progress * 8),
            }}
          >
            Before &amp; After.
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#666",
              marginBottom: "40px",
              textAlign: "center",
              opacity: Math.min(1, progress * 6),
            }}
          >
            Scroll-driven comparison slider.
          </p>

          <div
            style={{
              maxWidth: "640px",
              width: "100%",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #1a1a1a",
              boxShadow: `0 0 40px rgba(220, 38, 38, ${progress * 0.08})`,
            }}
          >
            <CompareSlider
              scrollDriven
              progress={progress}
              before={
                <div
                  style={{
                    width: "100%",
                    height: "360px",
                    background: "#0c0c0c",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <div style={{ fontSize: "48px", opacity: 0.1 }}>{"{ }"}</div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#333",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Without react-kino
                  </div>
                  <div style={{ fontSize: "12px", color: "#222" }}>
                    Static content
                  </div>
                </div>
              }
              after={
                <div
                  style={{
                    width: "100%",
                    height: "360px",
                    background:
                      "linear-gradient(135deg, #120808 0%, #1a0a0a 30%, #2a0e0e 60%, #dc2626 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <div style={{ fontSize: "48px" }}>{"{ }"}</div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.8)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    With react-kino
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                    Cinematic scroll experience
                  </div>
                </div>
              }
            />
          </div>
        </div>
      )}
    </Scene>
  );
}

/* ─── Horizontal Demo ─── */
function HorizontalDemo() {
  const features = [
    {
      icon: "//",
      title: "Zero Dependencies",
      description: "Only React as a peer dependency. Nothing else.",
    },
    {
      icon: "<>",
      title: "Declarative API",
      description: "Compose scenes and animations like JSX.",
    },
    {
      icon: ">>",
      title: "GPU Accelerated",
      description: "CSS transforms and will-change for 60fps.",
    },
    {
      icon: "a11y",
      title: "Accessible",
      description: "Respects prefers-reduced-motion out of the box.",
    },
  ];

  return (
    <section>
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "100px 24px 40px",
        }}
      >
        <span className="component-tag" style={{ marginBottom: "32px", display: "inline-block" }}>
          {"<HorizontalScroll>"}
        </span>
        <h2
          className="section-heading"
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            marginBottom: "12px",
            marginTop: "24px",
          }}
        >
          Features worth scrolling for.
        </h2>
        <p style={{ fontSize: "16px", color: "#666" }}>
          Vertical scroll, horizontal motion. Keep scrolling.
        </p>
      </div>
      <HorizontalScroll>
        {features.map((f) => (
          <Panel key={f.title}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
              }}
            >
              <div
                className="gamer-card"
                style={{ padding: "48px 40px", maxWidth: "380px", width: "100%" }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#dc2626",
                    marginBottom: "20px",
                    fontWeight: 700,
                    textShadow: "0 0 20px rgba(220, 38, 38, 0.3)",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  className="section-heading"
                  style={{
                    fontSize: "22px",
                    marginBottom: "10px",
                    textTransform: "none",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.6 }}>
                  {f.description}
                </p>
              </div>
            </div>
          </Panel>
        ))}
      </HorizontalScroll>
    </section>
  );
}

/* ─── Component Gallery ─── */
function ComponentGallery() {
  const components = [
    { name: "Kino", code: "<Kino>", desc: "Root scroll tracker provider" },
    {
      name: "Scene",
      code: '<Scene duration="200vh">',
      desc: "Pinned scroll-driven scenes with progress",
    },
    {
      name: "Reveal",
      code: '<Reveal animation="fade-up">',
      desc: "Scroll-triggered entrance animations",
    },
    {
      name: "Parallax",
      code: "<Parallax speed={0.5}>",
      desc: "Depth-based scroll parallax effects",
    },
    {
      name: "TextReveal",
      code: '<TextReveal mode="word">',
      desc: "Progressive word-by-word text reveal",
    },
    {
      name: "Counter",
      code: "<Counter from={0} to={100}>",
      desc: "Scroll-animated number counters",
    },
    {
      name: "CompareSlider",
      code: "<CompareSlider>",
      desc: "Before & after comparison slider",
    },
    {
      name: "HorizontalScroll",
      code: "<HorizontalScroll>",
      desc: "Vertical scroll to horizontal motion",
    },
    {
      name: "Progress",
      code: '<Progress type="bar">',
      desc: "Global scroll progress indicators",
    },
    {
      name: "VideoScroll",
      code: '<VideoScroll src="…">',
      desc: "Frame-by-frame video scrubbing on scroll",
    },
    {
      name: "Marquee",
      code: "<Marquee speed={40}>",
      desc: "Infinite looping ticker animation",
    },
    {
      name: "StickyHeader",
      code: "<StickyHeader>",
      desc: "Scroll-aware fixed header with blur",
    },
  ];

  return (
    <section style={{ padding: "120px 24px 80px", maxWidth: "1040px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <h2
          className="section-heading"
          style={{ fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "16px" }}
        >
          The Full Arsenal.
        </h2>
        <p style={{ fontSize: "16px", color: "#666" }}>
          12 components &middot; 3 hooks &middot; Zero dependencies
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {components.map((c) => (
          <div
            key={c.name}
            className="gamer-card gallery-card"
            style={{ padding: "28px" }}
          >
            <code
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#dc2626",
                display: "block",
                marginBottom: "14px",
                opacity: 0.8,
              }}
            >
              {c.code}
            </code>
            <h3
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "6px",
                letterSpacing: "0.01em",
              }}
            >
              {c.name}
            </h3>
            <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.5 }}>
              {c.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Hooks row */}
      <div style={{ marginTop: "48px" }}>
        <h3
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "18px",
            fontWeight: 600,
            color: "#666",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Hooks
        </h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { name: "useScrollProgress", desc: "Global page scroll 0→1" },
            { name: "useSceneProgress", desc: "Per-element scroll tracking" },
            { name: "useIsClient", desc: "SSR hydration guard" },
          ].map((h) => (
            <div
              key={h.name}
              className="gamer-card"
              style={{
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <code
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "13px",
                  color: "#ef4444",
                }}
              >
                {h.name}()
              </code>
              <span style={{ fontSize: "13px", color: "#555" }}>{h.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install react-kino").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer
      style={{
        padding: "100px 24px 60px",
        textAlign: "center",
        borderTop: "1px solid #141414",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(220, 38, 38, 0.03) 0%, transparent 60%)",
      }}
    >
      <h2
        className="section-heading"
        style={{
          fontSize: "clamp(32px, 4vw, 56px)",
          marginBottom: "12px",
          textShadow: "0 0 60px rgba(220, 38, 38, 0.15)",
        }}
      >
        react-
        <span style={{ color: "#dc2626" }}>kino</span>
      </h2>
      <p
        style={{
          fontSize: "17px",
          color: "#666",
          lineHeight: 1.7,
          marginBottom: "40px",
        }}
      >
        Cinematic scroll-driven storytelling for React.
      </p>

      <button
        onClick={handleCopy}
        className="gamer-card"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 24px",
          cursor: "pointer",
          marginBottom: "32px",
          color: "#ffffff",
        }}
      >
        <code
          style={{
            fontSize: "14px",
            fontFamily: "'JetBrains Mono', monospace",
            color: "#ef4444",
          }}
        >
          npm install react-kino
        </code>
        <span
          style={{
            fontSize: "12px",
            color: copied ? "#ef4444" : "#444",
            fontFamily: "'JetBrains Mono', monospace",
            transition: "color 0.2s",
          }}
        >
          {copied ? "copied!" : "click to copy"}
        </span>
      </button>

      <div
        style={{
          display: "flex",
          gap: "24px",
          justifyContent: "center",
          marginBottom: "48px",
        }}
      >
        <Link href="/docs" className="nav-link" style={{ color: "#dc2626" }}>
          Documentation
        </Link>
        <a
          href="https://github.com/bilaltahir/react-kino"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          style={{ color: "#dc2626" }}
        >
          GitHub
        </a>
      </div>

      <p
        style={{
          fontSize: "12px",
          fontFamily: "'JetBrains Mono', monospace",
          color: "#222",
          letterSpacing: "0.05em",
        }}
      >
        built with react-kino
      </p>
    </footer>
  );
}

/* ─── Page ─── */
export default function LandingPage() {
  return (
    <div className="landing-page">
      <Kino>
        <StickyHeader threshold={60} background="rgba(8, 8, 8, 0.92)" blur>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 24px",
              height: "56px",
            }}
          >
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              react-<span style={{ color: "#dc2626" }}>kino</span>
            </span>
            <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
              <Link href="/docs" className="nav-link">
                Docs
              </Link>
              <a
                href="https://github.com/bilaltahir/react-kino"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                GitHub
              </a>
            </div>
          </div>
        </StickyHeader>
        <Progress type="bar" position="top" color="#dc2626" />
        <Hero />
        <MarqueeStrip />
        <SceneDemo />
        <TextRevealDemo />
        <RevealDemo />
        <CounterDemo />
        <CompareDemo />
        <MarqueeStrip />
        <HorizontalDemo />
        <ComponentGallery />
        <Footer />
      </Kino>
    </div>
  );
}
