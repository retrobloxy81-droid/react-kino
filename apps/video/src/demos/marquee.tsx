import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND, FONT_BODY, FONT_CODE, FONT_DISPLAY } from "../theme";

const ITEMS = [
  "Scene",
  "Reveal",
  "Parallax",
  "Counter",
  "CompareSlider",
  "HorizontalScroll",
  "Progress",
  "VideoScroll",
  "TextReveal",
  "Marquee",
  "StickyHeader",
  "Kino",
];

// Approximate width per item: padding 10+24 each side = 68px, avg char ~11px * avg 9 chars ~99px + gap 16px
// We'll use a fixed estimate per item for offset calculation
const ITEM_WIDTH = 180; // px average including gap
const ITEM_GAP = 16;

// Duplicate 3x for seamless wrapping
const ROW1_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS];
const ROW2_ITEMS = [...[...ITEMS].reverse(), ...[...ITEMS].reverse(), ...[...ITEMS].reverse()];

const TOTAL_WIDTH = ITEMS.length * (ITEM_WIDTH + ITEM_GAP);

export const MarqueeDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagSpring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 200 },
  });

  // Row 1 scrolls left (negative x direction)
  const row1X = interpolate(frame, [0, 120], [0, -TOTAL_WIDTH]);

  // Row 2 scrolls right (positive x direction, starts offset so it fills the frame)
  const row2X = interpolate(frame, [0, 120], [-TOTAL_WIDTH, 0]);

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
          fontFamily: FONT_DISPLAY,
          fontSize: 18,
          fontWeight: 600,
          color: BRAND.textDim,
          letterSpacing: 5,
          textTransform: "uppercase",
          opacity: tagSpring,
        }}
      >
        Infinite Looping Ticker
      </div>

      {/* Marquee rows container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 60,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Row 1 — scrolls left */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: ITEM_GAP,
            transform: `translateX(${row1X}px)`,
            willChange: "transform",
          }}
        >
          {ROW1_ITEMS.map((name, i) => (
            <div
              key={`r1-${i}`}
              style={{
                flexShrink: 0,
                backgroundColor: BRAND.bgCard,
                border: `1px solid ${BRAND.border}`,
                borderRadius: 8,
                padding: "10px 24px",
                fontFamily: FONT_CODE,
                fontSize: 18,
                fontWeight: 400,
                color: i % 3 === 0 ? BRAND.red : BRAND.textDim,
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </div>
          ))}
        </div>

        {/* Row 2 — scrolls right (reversed items) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: ITEM_GAP,
            transform: `translateX(${row2X}px)`,
            willChange: "transform",
          }}
        >
          {ROW2_ITEMS.map((name, i) => (
            <div
              key={`r2-${i}`}
              style={{
                flexShrink: 0,
                backgroundColor: BRAND.bgCard,
                border: `1px solid ${BRAND.border}`,
                borderRadius: 8,
                padding: "10px 24px",
                fontFamily: FONT_CODE,
                fontSize: 18,
                fontWeight: 400,
                color: i % 3 === 0 ? BRAND.red : BRAND.textDim,
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Component tag — bottom-left */}
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
          backgroundColor: "rgba(220,38,38,0.07)",
          padding: "6px 16px",
          borderRadius: 6,
          border: "1px solid rgba(220,38,38,0.19)",
        }}
      >
        {"<Marquee>"}
      </div>
    </AbsoluteFill>
  );
};
