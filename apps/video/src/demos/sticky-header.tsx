import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { BRAND, FONT_BODY, FONT_CODE, FONT_DISPLAY } from "../theme";

/* Content bars that simulate page body text */
const CONTENT_BARS = [
  { width: 580, height: 14, marginTop: 0 },
  { width: 520, height: 14, marginTop: 10 },
  { width: 560, height: 14, marginTop: 10 },
  { width: 480, height: 14, marginTop: 10 },
  { width: 540, height: 14, marginTop: 28 },
  { width: 500, height: 14, marginTop: 10 },
  { width: 560, height: 14, marginTop: 10 },
  { width: 420, height: 14, marginTop: 10 },
  { width: 540, height: 14, marginTop: 28 },
  { width: 510, height: 14, marginTop: 10 },
  { width: 580, height: 14, marginTop: 10 },
  { width: 460, height: 14, marginTop: 10 },
];

export const StickyHeaderDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagSpring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 200 },
  });

  /* Simulate scroll: content moves up over time */
  const scrollY = interpolate(frame, [6, 100], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  /* Header background opacity: transitions as content scrolls past hero */
  const headerBgOpacity = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  /* Header text/nav fades in slightly with bg */
  const navOpacity = interpolate(frame, [14, 52], [0.45, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* Browser mockup dimensions */
  const BROWSER_W = 700;
  const BROWSER_H = 500;
  const CHROME_H = 30;
  const PAGE_H = BROWSER_H - CHROME_H;
  const HEADER_H = 50;

  /* Hero section height inside the page */
  const HERO_H = 160;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_DISPLAY,
          fontSize: 18,
          fontWeight: 600,
          color: BRAND.textDim,
          letterSpacing: 5,
          textTransform: "uppercase",
          opacity: tagSpring,
        }}
      >
        Scroll-Aware Header
      </div>

      {/* Browser mockup */}
      <div
        style={{
          width: BROWSER_W,
          height: BROWSER_H,
          borderRadius: 10,
          overflow: "hidden",
          border: `1px solid ${BRAND.border}`,
          boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px ${BRAND.border}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Browser chrome bar */}
        <div
          style={{
            height: CHROME_H,
            backgroundColor: "#161616",
            borderBottom: `1px solid ${BRAND.border}`,
            display: "flex",
            alignItems: "center",
            paddingLeft: 14,
            paddingRight: 14,
            gap: 7,
            flexShrink: 0,
          }}
        >
          {/* Traffic-light dots */}
          {(["#ef4444", "#f59e0b", "#22c55e"] as const).map((color, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: color,
                opacity: 0.85,
              }}
            />
          ))}

          {/* URL bar */}
          <div
            style={{
              flex: 1,
              marginLeft: 14,
              marginRight: 14,
              height: 18,
              backgroundColor: "#1e1e1e",
              borderRadius: 4,
              border: `1px solid ${BRAND.border}`,
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <span
              style={{
                fontFamily: FONT_CODE,
                fontSize: 10,
                color: BRAND.textDimmer,
                letterSpacing: 0.5,
              }}
            >
              react-kino.dev/docs
            </span>
          </div>
        </div>

        {/* Page area */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#0d0d0d",
          }}
        >
          {/* Sticky header — sits on top, always at y:0 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: HEADER_H,
              zIndex: 10,
              /* Solid bg transitions from transparent to bgCard */
              backgroundColor: `rgba(17,17,17,${headerBgOpacity})`,
              borderBottom: headerBgOpacity > 0.05
                ? `1px solid rgba(26,26,26,${headerBgOpacity})`
                : "1px solid transparent",
              display: "flex",
              alignItems: "center",
              paddingLeft: 24,
              paddingRight: 24,
              backdropFilter: headerBgOpacity > 0.1 ? "blur(12px)" : "none",
              transition: "none",
            }}
          >
            {/* Logo / brand */}
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 16,
                fontWeight: 700,
                color: BRAND.text,
                letterSpacing: 1,
                opacity: navOpacity,
              }}
            >
              react-kino
            </div>

            {/* Nav items */}
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: navOpacity,
              }}
            >
              {["Docs", "Components", "GitHub"].map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 13,
                    color: BRAND.textDim,
                    letterSpacing: 0.3,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Scrolling content — translates upward as scrollY increases */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              transform: `translateY(${-scrollY}px)`,
            }}
          >
            {/* Hero section */}
            <div
              style={{
                height: HERO_H,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: HEADER_H,
                gap: 10,
                background: `linear-gradient(180deg, ${BRAND.red}08 0%, transparent 100%)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 28,
                  fontWeight: 700,
                  color: BRAND.text,
                  letterSpacing: -0.5,
                }}
              >
                Cinematic Scroll
              </div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 13,
                  color: BRAND.textDim,
                  letterSpacing: 0.5,
                }}
              >
                Scroll-driven animations for React
              </div>
              {/* CTA button placeholder */}
              <div
                style={{
                  marginTop: 8,
                  height: 28,
                  width: 110,
                  borderRadius: 5,
                  backgroundColor: BRAND.red,
                  opacity: 0.85,
                }}
              />
            </div>

            {/* Content body — rows of gray bars simulating paragraphs */}
            <div
              style={{
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {CONTENT_BARS.map((bar, i) => (
                <div
                  key={i}
                  style={{
                    width: bar.width,
                    height: bar.height,
                    marginTop: bar.marginTop,
                    backgroundColor: BRAND.border,
                    borderRadius: 4,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Subtle vignette at bottom of page area */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 40,
              background: `linear-gradient(to bottom, transparent, #0d0d0d)`,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Header state annotation */}
      <div
        style={{
          position: "absolute",
          right: "calc(50% - 390px)",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          opacity: tagSpring,
        }}
      >
        {/* Transparent state */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: 1 - headerBgOpacity,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: BRAND.textDimmer,
            }}
          />
          <span
            style={{
              fontFamily: FONT_CODE,
              fontSize: 12,
              color: BRAND.textDimmer,
            }}
          >
            transparent
          </span>
        </div>

        {/* Solid state */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: headerBgOpacity,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: BRAND.red,
            }}
          />
          <span
            style={{
              fontFamily: FONT_CODE,
              fontSize: 12,
              color: BRAND.red,
            }}
          >
            solid
          </span>
        </div>
      </div>

      {/* Component tag — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 80,
          fontFamily: FONT_CODE,
          fontSize: 16,
          fontWeight: 500,
          color: BRAND.red,
          opacity: tagSpring,
          background: `${BRAND.red}12`,
          padding: "6px 16px",
          borderRadius: 6,
          border: `1px solid ${BRAND.red}30`,
        }}
      >
        {"<StickyHeader>"}
      </div>
    </AbsoluteFill>
  );
};
