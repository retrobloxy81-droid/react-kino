import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Sequence,
  continueRender,
  delayRender,
} from "remotion";
import { BRAND, FONT_DISPLAY, FONT_BODY, FONT_CODE, waitForFonts } from "../theme";

// ── Section boundaries (frames at 30fps) ────────────────────────────────────
const SEC1_START = 0;   // Title
const SEC1_END = 60;    // 2s
const SEC2_START = 60;  // Code comparison
const SEC2_END = 300;   // 8s
const SEC3_START = 300; // Bundle comparison
const SEC3_END = 450;   // 5s
const SEC4_START = 450; // CTA
const SEC4_END = 600;   // 5s

const FADE_FRAMES = 15;

// ── Code snippets ────────────────────────────────────────────────────────────
const GSAP_CODE = `gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true,
  },
  opacity: 0,
  y: -100,
});`;

const KINO_CODE = `<Scene height="200vh">
  {({ progress }) => (
    <div style={{
      opacity: 1 - progress,
      transform: \`translateY(\${
        -progress * 100
      }px)\`,
    }}>
      <Hero />
    </div>
  )}
</Scene>`;

// ── Helpers ──────────────────────────────────────────────────────────────────
function sectionOpacity(frame: number, start: number, end: number) {
  const fadeIn = interpolate(frame, [start, start + FADE_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [end - FADE_FRAMES, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(fadeIn, fadeOut);
}

// ── Section 1: Title ─────────────────────────────────────────────────────────
const TitleSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = sectionOpacity(frame + SEC1_START, SEC1_START, SEC1_END);

  const titleSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  const subtitleSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
  });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [20, 0]);

  const glowOpacity = interpolate(frame, [10, 28], [0, 0.3], {
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
        opacity,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(220,38,38,0.12), transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Title */}
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: -2,
          color: BRAND.text,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <span style={{ color: BRAND.textDim }}>GSAP</span>
        <span style={{ color: BRAND.textDimmer, margin: "0 24px" }}>vs</span>
        <span>react-</span>
        <span style={{ color: BRAND.red }}>kino</span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          marginTop: 20,
          fontFamily: FONT_BODY,
          fontSize: 22,
          fontWeight: 300,
          color: BRAND.textDim,
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: subtitleSpring,
          transform: `translateY(${subtitleY}px)`,
        }}
      >
        Scroll Animation Comparison
      </div>
    </AbsoluteFill>
  );
};

// ── Code block component ──────────────────────────────────────────────────────
interface CodeBlockProps {
  code: string;
  visibleChars: number;
  dimmed?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, visibleChars, dimmed = false }) => {
  const visibleCode = code.slice(0, visibleChars);

  return (
    <div
      style={{
        backgroundColor: BRAND.bgCard,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 12,
        padding: 24,
        minHeight: 280,
        opacity: dimmed ? 0.7 : 1,
      }}
    >
      <pre
        style={{
          fontFamily: FONT_CODE,
          fontSize: 14,
          fontWeight: 400,
          color: BRAND.text,
          margin: 0,
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {visibleCode}
      </pre>
    </div>
  );
};

// ── Section 2: Code comparison ────────────────────────────────────────────────
const CodeSection: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = sectionOpacity(frame + SEC2_START, SEC2_START, SEC2_END);
  const localFrame = frame; // frame within this Sequence

  // GSAP typewriter starts at local frame 15
  const gsapChars = Math.floor(
    interpolate(localFrame, [15, 90], [0, GSAP_CODE.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.ease),
    }),
  );

  // Kino typewriter starts ~30 frames later (local frame 45)
  const kinoChars = Math.floor(
    interpolate(localFrame, [45, 120], [0, KINO_CODE.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.ease),
    }),
  );

  // Header label opacity
  const headerOpacity = interpolate(localFrame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Kino side red glow
  const kinoGlowOpacity = interpolate(localFrame, [50, 80], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.bg,
        opacity,
      }}
    >
      {/* Subtle kino-side glow */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          background: `radial-gradient(ellipse at 80% 50%, rgba(220,38,38,0.08), transparent 70%)`,
          opacity: kinoGlowOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Vertical divider */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 60,
          bottom: 60,
          width: 1,
          backgroundColor: BRAND.border,
          transform: "translateX(-50%)",
        }}
      />

      {/* Left: GSAP */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px 0 100px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 4,
            color: BRAND.textDimmer,
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: headerOpacity,
          }}
        >
          GSAP + ScrollTrigger
        </div>
        <CodeBlock code={GSAP_CODE} visibleChars={gsapChars} dimmed />
      </div>

      {/* Right: react-kino */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 100px 0 80px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 4,
            color: BRAND.red,
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: headerOpacity,
            textShadow: `0 0 20px ${BRAND.redGlow}`,
          }}
        >
          react-kino
        </div>
        <CodeBlock code={KINO_CODE} visibleChars={kinoChars} dimmed={false} />
      </div>
    </AbsoluteFill>
  );
};

// ── Section 3: Bundle comparison ─────────────────────────────────────────────
const BAR_MAX_WIDTH = 440; // px, corresponds to ~45KB (GSAP)
const GSAP_KB = 45;
const KINO_KB = 3;
const GSAP_BAR_WIDTH = BAR_MAX_WIDTH;
const KINO_BAR_WIDTH = Math.round((KINO_KB / GSAP_KB) * BAR_MAX_WIDTH); // ~29px

const BundleSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = sectionOpacity(frame + SEC3_START, SEC3_START, SEC3_END);
  const localFrame = frame;

  const titleSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 200 },
  });

  // GSAP bar spring (starts at local frame 18)
  const gsapBarSpring = spring({
    frame: localFrame - 18,
    fps,
    config: { damping: 22, stiffness: 80, mass: 1 },
  });
  const gsapBarWidth = interpolate(gsapBarSpring, [0, 1], [0, GSAP_BAR_WIDTH]);

  // Kino bar spring (starts at local frame 30)
  const kinoBarSpring = spring({
    frame: localFrame - 30,
    fps,
    config: { damping: 22, stiffness: 80, mass: 1 },
  });
  const kinoBarWidth = interpolate(kinoBarSpring, [0, 1], [0, KINO_BAR_WIDTH]);

  // "15x smaller" callout — appears after bars fill (~frame 55)
  const calloutSpring = spring({
    frame: localFrame - 55,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.7 },
  });
  const calloutY = interpolate(calloutSpring, [0, 1], [24, 0]);

  // Deps line
  const depsOpacity = interpolate(localFrame, [60, 75], [0, 1], {
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
        opacity,
      }}
    >
      {/* Glow behind kino bar */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "52%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(220,38,38,0.07), transparent 70%)`,
        }}
      />

      {/* Section title */}
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: 5,
          color: BRAND.textDim,
          textTransform: "uppercase",
          marginBottom: 60,
          opacity: titleSpring,
        }}
      >
        Bundle Size Comparison
      </div>

      {/* Bar chart */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        {/* GSAP bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              height: 36,
              width: gsapBarWidth,
              backgroundColor: BRAND.textDimmer,
              borderRadius: 4,
              minWidth: 2,
            }}
          />
          <div
            style={{
              fontFamily: FONT_CODE,
              fontSize: 14,
              color: BRAND.textDim,
              paddingLeft: 4,
            }}
          >
            GSAP + ScrollTrigger — ~{GSAP_KB} KB gzipped
          </div>
        </div>

        {/* react-kino bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              height: 36,
              width: kinoBarWidth,
              backgroundColor: BRAND.red,
              borderRadius: 4,
              minWidth: 2,
              boxShadow: `0 0 16px ${BRAND.redGlow}`,
            }}
          />
          <div
            style={{
              fontFamily: FONT_CODE,
              fontSize: 14,
              color: BRAND.red,
              paddingLeft: 4,
            }}
          >
            react-kino — ~{KINO_KB} KB gzipped
          </div>
        </div>
      </div>

      {/* "15x smaller" callout */}
      <div
        style={{
          marginTop: 52,
          fontFamily: FONT_DISPLAY,
          fontSize: 40,
          fontWeight: 700,
          color: BRAND.red,
          opacity: calloutSpring,
          transform: `translateY(${calloutY}px)`,
          textShadow: `0 0 30px ${BRAND.redGlow}`,
          letterSpacing: -1,
        }}
      >
        15x smaller
      </div>

      {/* Dependencies comparison */}
      <div
        style={{
          marginTop: 28,
          display: "flex",
          gap: 60,
          opacity: depsOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_CODE,
            fontSize: 14,
            color: BRAND.textDim,
            textAlign: "center",
          }}
        >
          <span style={{ color: BRAND.textDimmer }}>GSAP </span>2 packages
        </div>
        <div
          style={{
            fontFamily: FONT_CODE,
            fontSize: 14,
            color: BRAND.text,
            textAlign: "center",
          }}
        >
          <span style={{ color: BRAND.red }}>react-kino </span>Zero dependencies
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Section 4: CTA ───────────────────────────────────────────────────────────
const CTASection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = sectionOpacity(frame + SEC4_START, SEC4_START, SEC4_END);
  const localFrame = frame;

  // Logo spring (starts at local frame 8)
  const logoSpring = spring({
    frame: localFrame - 8,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });
  const logoY = interpolate(logoSpring, [0, 1], [30, 0]);

  // "npm install react-kino" typewriter
  const INSTALL_CMD = "npm install react-kino";
  const typeStart = 22;
  const typeEnd = 46;
  const charsVisible = Math.floor(
    interpolate(localFrame, [typeStart, typeEnd], [0, INSTALL_CMD.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const typedText = INSTALL_CMD.slice(0, charsVisible);
  const cursorVisible = localFrame > typeStart && localFrame % 10 < 6;

  const pillOpacity = interpolate(localFrame, [typeStart - 4, typeStart], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline spring (starts at local frame 48)
  const taglineSpring = spring({
    frame: localFrame - 48,
    fps,
    config: { damping: 200 },
  });
  const taglineY = interpolate(taglineSpring, [0, 1], [16, 0]);

  // Ambient glow opacity
  const glowOpacity = interpolate(localFrame, [10, 30], [0, 0.4], {
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
        opacity,
      }}
    >
      {/* Red ambient glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 450,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(220,38,38,0.14), transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Logo */}
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: -2,
          color: BRAND.text,
          opacity: logoSpring,
          transform: `translateY(${logoY}px)`,
        }}
      >
        react-<span style={{ color: BRAND.red }}>kino</span>
      </div>

      {/* Code pill: npm install react-kino */}
      <div
        style={{
          marginTop: 44,
          fontFamily: FONT_CODE,
          fontSize: 22,
          fontWeight: 400,
          color: BRAND.textDim,
          backgroundColor: BRAND.bgCard,
          border: `1px solid ${BRAND.border}`,
          padding: "16px 36px",
          borderRadius: 12,
          opacity: pillOpacity,
        }}
      >
        <span style={{ color: BRAND.textDimmer }}>$ </span>
        <span style={{ color: BRAND.text }}>{typedText}</span>
        <span style={{ color: BRAND.red, opacity: cursorVisible ? 1 : 0 }}>|</span>
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 40,
          fontFamily: FONT_BODY,
          fontSize: 24,
          fontWeight: 300,
          color: BRAND.textDim,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: taglineSpring,
          transform: `translateY(${taglineY}px)`,
        }}
      >
        Built for React. Not bolted on.
      </div>
    </AbsoluteFill>
  );
};

// ── Root composition ─────────────────────────────────────────────────────────
export const VsGSAP: React.FC = () => {
  const [handle] = useState(() => delayRender("Loading fonts..."));

  useEffect(() => {
    waitForFonts()
      .then(() => continueRender(handle))
      .catch((err) => {
        console.error("Font loading failed", err);
        continueRender(handle);
      });
  }, [handle]);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg }}>
      {/* Section 1: Title (frames 0–60) */}
      <Sequence from={SEC1_START} durationInFrames={SEC1_END - SEC1_START}>
        <TitleSection />
      </Sequence>

      {/* Section 2: Code comparison (frames 60–300) */}
      <Sequence from={SEC2_START} durationInFrames={SEC2_END - SEC2_START}>
        <CodeSection />
      </Sequence>

      {/* Section 3: Bundle comparison (frames 300–450) */}
      <Sequence from={SEC3_START} durationInFrames={SEC3_END - SEC3_START}>
        <BundleSection />
      </Sequence>

      {/* Section 4: CTA (frames 450–600) */}
      <Sequence from={SEC4_START} durationInFrames={SEC4_END - SEC4_START}>
        <CTASection />
      </Sequence>
    </AbsoluteFill>
  );
};
