import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  continueRender,
  delayRender,
} from "remotion";
import { BRAND, FONT_DISPLAY, FONT_BODY, FONT_CODE, waitForFonts } from "../theme";

// ─── Section timing (frames at 30fps) ────────────────────────────────────────
const INTRO_START = 0;
const INTRO_END = 75; // 2.5s

const DEMO1_START = 75;
const DEMO1_END = 165; // 3s

const DEMO2_START = 165;
const DEMO2_END = 255; // 3s

const DEMO3_START = 255;
const DEMO3_END = 345; // 3s

const OUTRO_START = 345;
const OUTRO_END = 450; // 3.5s

const FADE_FRAMES = 5;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Opacity for a section given absolute frame, with crossfade at boundaries */
function sectionOpacity(
  frame: number,
  start: number,
  end: number,
): number {
  return interpolate(frame, [start, start + FADE_FRAMES, end - FADE_FRAMES, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

// ─── Section: Intro Card ─────────────────────────────────────────────────────

const IntroCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 200 },
  });
  const subY = interpolate(subSpring, [0, 1], [20, 0]);

  const glowOpacity = interpolate(frame, [10, 35], [0, 0.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Red ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.redGlow}, transparent 65%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -3,
            color: BRAND.text,
            lineHeight: 1,
          }}
        >
          react-
          <span style={{ color: BRAND.red }}>kino</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 26,
            fontWeight: 300,
            color: BRAND.textDim,
            marginTop: 24,
            letterSpacing: 5,
            textTransform: "uppercase" as const,
            opacity: subSpring,
            transform: `translateY(${subY}px)`,
            textAlign: "center" as const,
          }}
        >
          Scroll-Driven Storytelling
        </div>
      </div>

      {/* Decorative red line */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          width: interpolate(frame, [30, 55], [0, 300], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 2,
          backgroundColor: BRAND.red,
          borderRadius: 1,
          opacity: interpolate(frame, [28, 32], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Section: Demo 1 — TextReveal ────────────────────────────────────────────

const TEXT = "Every pixel tells a story";
const WORDS = TEXT.split(" ");

const Demo1TextReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 200 },
  });

  const REVEAL_START = 10;
  const REVEAL_SPAN = 50;

  const progress = interpolate(frame, [REVEAL_START, REVEAL_START + REVEAL_SPAN], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const revealedCount = Math.floor(progress * WORDS.length);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(220,38,38,0.08), transparent 70%)`,
        }}
      />

      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 100,
          fontFamily: FONT_DISPLAY,
          fontSize: 22,
          fontWeight: 600,
          color: BRAND.textDim,
          letterSpacing: 6,
          textTransform: "uppercase" as const,
          opacity: tagSpring,
          textAlign: "center" as const,
        }}
      >
        Word-by-Word Reveal
      </div>

      {/* Words */}
      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap" as const,
          justifyContent: "center",
          maxWidth: 900,
          padding: "0 60px",
        }}
      >
        {WORDS.map((word, i) => (
          <span
            key={word + i}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 76,
              fontWeight: 600,
              color: i < revealedCount ? BRAND.text : BRAND.textDimmer,
              display: "inline-block",
              lineHeight: 1.15,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 80,
          right: 80,
          height: 2,
          backgroundColor: BRAND.border,
          borderRadius: 1,
          opacity: tagSpring,
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: BRAND.red,
            borderRadius: 1,
          }}
        />
      </div>

      {/* Component tag */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: FONT_CODE,
          fontSize: 20,
          fontWeight: 500,
          color: BRAND.red,
          opacity: tagSpring,
          backgroundColor: "rgba(220,38,38,0.08)",
          padding: "10px 28px",
          borderRadius: 8,
          border: "1px solid rgba(220,38,38,0.22)",
          whiteSpace: "nowrap" as const,
        }}
      >
        {"<TextReveal>"}
      </div>
    </AbsoluteFill>
  );
};

// ─── Section: Demo 2 — Parallax ──────────────────────────────────────────────

const LAYERS = [
  {
    label: "Background",
    speed: 0.3,
    width: 820,
    height: 480,
    color: `${BRAND.redDark}28`,
    border: `${BRAND.redDark}50`,
    centerX: 540, // left offset to center in 1080
    startY: 820,
    delay: 4,
  },
  {
    label: "Midground",
    speed: 0.65,
    width: 640,
    height: 360,
    color: `${BRAND.red}22`,
    border: `${BRAND.red}44`,
    centerX: 220,
    startY: 880,
    delay: 8,
  },
  {
    label: "Foreground",
    speed: 1.3,
    width: 460,
    height: 260,
    color: `${BRAND.redLight}18`,
    border: `${BRAND.redLight}3c`,
    centerX: 310,
    startY: 950,
    delay: 12,
  },
];

const Demo2Parallax: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 200 },
  });

  const scrollAmount = interpolate(frame, [6, 60], [0, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg, overflow: "hidden" }}>
      {/* Faint grid */}
      <AbsoluteFill style={{ opacity: 0.04 }}>
        <svg width={1080} height={1920}>
          {Array.from({ length: 19 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * 60}
              y1={0}
              x2={i * 60}
              y2={1920}
              stroke={BRAND.red}
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: 33 }, (_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 60}
              x2={1080}
              y2={i * 60}
              stroke={BRAND.red}
              strokeWidth={0.5}
            />
          ))}
        </svg>
      </AbsoluteFill>

      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 110,
          width: "100%",
          textAlign: "center" as const,
          fontFamily: FONT_DISPLAY,
          fontSize: 22,
          fontWeight: 600,
          color: BRAND.textDim,
          letterSpacing: 6,
          textTransform: "uppercase" as const,
          opacity: tagSpring,
        }}
      >
        Depth & Motion
      </div>

      {/* Parallax layers */}
      {LAYERS.map((layer, i) => {
        const y = layer.startY - scrollAmount * layer.speed;
        const layerOpacity = interpolate(
          frame,
          [layer.delay, layer.delay + 10],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: layer.centerX,
              top: 0,
              width: layer.width,
              height: layer.height,
              backgroundColor: layer.color,
              border: `1px solid ${layer.border}`,
              borderRadius: 16,
              transform: `translateY(${y}px)`,
              opacity: layerOpacity,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 24,
                fontWeight: 600,
                color: BRAND.textDim,
                letterSpacing: 4,
                textTransform: "uppercase" as const,
              }}
            >
              {layer.label}
            </span>
            <span
              style={{
                position: "absolute",
                bottom: 16,
                right: 20,
                fontFamily: FONT_CODE,
                fontSize: 14,
                color: BRAND.textDimmer,
              }}
            >
              speed: {layer.speed}×
            </span>
          </div>
        );
      })}

      {/* Component tag */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: FONT_CODE,
          fontSize: 20,
          fontWeight: 500,
          color: BRAND.red,
          opacity: tagSpring,
          background: `rgba(220,38,38,0.08)`,
          padding: "10px 28px",
          borderRadius: 8,
          border: `1px solid rgba(220,38,38,0.22)`,
          whiteSpace: "nowrap" as const,
        }}
      >
        {"<Parallax>"}
      </div>
    </AbsoluteFill>
  );
};

// ─── Section: Demo 3 — Counters ───────────────────────────────────────────────

const COUNTERS = [
  { from: 0, to: 1, label: "KB gzipped", prefix: "<", suffix: "", delay: 6 },
  { from: 0, to: 12, label: "Components", prefix: "", suffix: "", delay: 16 },
  { from: 0, to: 5, label: "Hooks", prefix: "", suffix: "", delay: 26 },
  { from: 0, to: 0, label: "Zero Deps", prefix: "", suffix: "", delay: 36, display: "Zero" },
] as const;

const Demo3Counters: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 110,
          width: "100%",
          textAlign: "center" as const,
          fontFamily: FONT_DISPLAY,
          fontSize: 22,
          fontWeight: 600,
          color: BRAND.textDim,
          letterSpacing: 6,
          textTransform: "uppercase" as const,
          opacity: tagSpring,
        }}
      >
        Animated Counters
      </div>

      {/* 2×2 grid of counters */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px 80px",
          padding: "0 80px",
        }}
      >
        {COUNTERS.map((counter, i) => {
          const counterProgress = interpolate(
            frame,
            [counter.delay, counter.delay + 22],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          const value = Math.round(
            interpolate(counterProgress, [0, 1], [counter.from, counter.to]),
          );

          const displayValue = "display" in counter && counter.display
            ? counterProgress > 0.5
              ? counter.display
              : "—"
            : `${counter.prefix}${value}${counter.suffix}`;

          const entrySpring = spring({
            frame: frame - counter.delay,
            fps,
            config: { damping: 18, stiffness: 120, mass: 0.8 },
          });
          const scale = interpolate(entrySpring, [0, 1], [0.65, 1]);
          const entryY = interpolate(entrySpring, [0, 1], [40, 0]);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                opacity: entrySpring,
                transform: `scale(${scale}) translateY(${entryY}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 110,
                  fontWeight: 700,
                  color: BRAND.text,
                  lineHeight: 1,
                  letterSpacing: -3,
                  minWidth: 180,
                  textAlign: "center" as const,
                }}
              >
                {displayValue}
              </div>
              <div
                style={{
                  width: 48,
                  height: 3,
                  backgroundColor: BRAND.red,
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 20,
                  fontWeight: 400,
                  color: BRAND.textDim,
                  textTransform: "uppercase" as const,
                  letterSpacing: 3,
                  textAlign: "center" as const,
                }}
              >
                {counter.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Component tag */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: FONT_CODE,
          fontSize: 20,
          fontWeight: 500,
          color: BRAND.red,
          opacity: tagSpring,
          backgroundColor: "rgba(220,38,38,0.08)",
          padding: "10px 28px",
          borderRadius: 8,
          border: "1px solid rgba(220,38,38,0.22)",
          whiteSpace: "nowrap" as const,
        }}
      >
        {"<Counter>"}
      </div>
    </AbsoluteFill>
  );
};

// ─── Section: Outro Card ──────────────────────────────────────────────────────

const INSTALL_CMD = "npm install react-kino";

const OutroCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 200 },
  });
  const logoY = interpolate(logoSpring, [0, 1], [20, 0]);

  const typeStart = 18;
  const typeEnd = 38;
  const charsVisible = Math.floor(
    interpolate(frame, [typeStart, typeEnd], [0, INSTALL_CMD.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const typedText = INSTALL_CMD.slice(0, charsVisible);
  const cursorVisible = frame > typeStart && frame % 10 < 6;

  const taglineSpring = spring({
    frame: frame - 36,
    fps,
    config: { damping: 200 },
  });

  const glowOpacity = interpolate(frame, [8, 28], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 0,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.redGlow}, transparent 65%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Logo */}
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 100,
          fontWeight: 700,
          letterSpacing: -3,
          color: BRAND.text,
          opacity: logoSpring,
          transform: `translateY(${logoY}px)`,
          lineHeight: 1,
        }}
      >
        react-<span style={{ color: BRAND.red }}>kino</span>
      </div>

      {/* Install command code pill */}
      <div
        style={{
          marginTop: 60,
          fontFamily: FONT_CODE,
          fontSize: 26,
          fontWeight: 400,
          color: BRAND.textDim,
          backgroundColor: BRAND.bgCard,
          border: `1px solid ${BRAND.border}`,
          padding: "18px 40px",
          borderRadius: 12,
          opacity: interpolate(frame, [typeStart - 4, typeStart], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          minWidth: 520,
          textAlign: "center" as const,
        }}
      >
        <span style={{ color: BRAND.textDimmer }}>$ </span>
        <span style={{ color: BRAND.text }}>{typedText}</span>
        <span
          style={{
            color: BRAND.red,
            opacity: cursorVisible ? 1 : 0,
          }}
        >
          |
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 44,
          fontFamily: FONT_BODY,
          fontSize: 26,
          fontWeight: 300,
          color: BRAND.textDim,
          letterSpacing: 4,
          textTransform: "uppercase" as const,
          opacity: taglineSpring,
          transform: `translateY(${interpolate(taglineSpring, [0, 1], [14, 0])}px)`,
        }}
      >
        Built for the scroll era
      </div>

      {/* Decorative accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          width: interpolate(frame, [50, 80], [0, 240], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 2,
          backgroundColor: BRAND.red,
          borderRadius: 1,
          opacity: interpolate(frame, [48, 52], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Root Composition ─────────────────────────────────────────────────────────

export const SocialHighlight: React.FC = () => {
  const [handle] = useState(() => delayRender("Loading fonts…"));

  useEffect(() => {
    waitForFonts()
      .then(() => continueRender(handle))
      .catch((err) => {
        console.error("Font loading failed", err);
        continueRender(handle);
      });
  }, [handle]);

  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg }}>
      {/* ── 1. Intro card ── */}
      <AbsoluteFill style={{ opacity: sectionOpacity(frame, INTRO_START, INTRO_END) }}>
        <Sequence from={INTRO_START} durationInFrames={INTRO_END - INTRO_START}>
          <IntroCard />
        </Sequence>
      </AbsoluteFill>

      {/* ── 2. TextReveal demo ── */}
      <AbsoluteFill style={{ opacity: sectionOpacity(frame, DEMO1_START, DEMO1_END) }}>
        <Sequence from={DEMO1_START} durationInFrames={DEMO1_END - DEMO1_START}>
          <Demo1TextReveal />
        </Sequence>
      </AbsoluteFill>

      {/* ── 3. Parallax demo ── */}
      <AbsoluteFill style={{ opacity: sectionOpacity(frame, DEMO2_START, DEMO2_END) }}>
        <Sequence from={DEMO2_START} durationInFrames={DEMO2_END - DEMO2_START}>
          <Demo2Parallax />
        </Sequence>
      </AbsoluteFill>

      {/* ── 4. Counters demo ── */}
      <AbsoluteFill style={{ opacity: sectionOpacity(frame, DEMO3_START, DEMO3_END) }}>
        <Sequence from={DEMO3_START} durationInFrames={DEMO3_END - DEMO3_START}>
          <Demo3Counters />
        </Sequence>
      </AbsoluteFill>

      {/* ── 5. Outro card ── */}
      <AbsoluteFill style={{ opacity: sectionOpacity(frame, OUTRO_START, OUTRO_END) }}>
        <Sequence from={OUTRO_START} durationInFrames={OUTRO_END - OUTRO_START}>
          <OutroCard />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
