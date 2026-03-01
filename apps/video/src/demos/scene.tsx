import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND, FONT_BODY, FONT_CODE, FONT_DISPLAY } from "../theme";

const MOCKUP_W = 500;
const MOCKUP_H = 600;
const STICKY_H = 60;
const SECTION_H = 160;
const SECTION_GAP = 16;

const SECTIONS = [
  { label: "Hero", color: "rgba(220,38,38,0.14)", border: "rgba(220,38,38,0.28)" },
  { label: "Features", color: "rgba(153,27,27,0.12)", border: "rgba(153,27,27,0.25)" },
  { label: "Pricing", color: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.22)" },
  { label: "Contact", color: "rgba(220,38,38,0.08)", border: "rgba(220,38,38,0.18)" },
];

const SCROLL_START = 6;
const SCROLL_END = 100;

/* Total scrollable height inside the mockup content area */
const CONTENT_H = SECTIONS.length * (SECTION_H + SECTION_GAP);
const VISIBLE_CONTENT_H = MOCKUP_H - STICKY_H;
const MAX_SCROLL = CONTENT_H - VISIBLE_CONTENT_H;

export const SceneDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagSpring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 200 },
  });

  /* Simulated scroll progress 0→1 over the clip */
  const scrollProgress = interpolate(frame, [SCROLL_START, SCROLL_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* How many px the content strip has scrolled */
  const scrollY = scrollProgress * MAX_SCROLL;

  /* Mockup entrance: slides up from below */
  const mockupEntrance = spring({
    frame: frame - 1,
    fps,
    config: { damping: 180, stiffness: 80 },
  });
  const mockupOffsetY = interpolate(mockupEntrance, [0, 1], [60, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ambient red glow behind mockup */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(220,38,38,0.08), transparent 70%)`,
        }}
      />

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
        Pinned Scroll Sections
      </div>

      {/* ── Browser/phone mockup ── */}
      <div
        style={{
          position: "relative",
          width: MOCKUP_W,
          height: MOCKUP_H,
          backgroundColor: BRAND.bgCard,
          border: `1px solid ${BRAND.border}`,
          borderRadius: 16,
          overflow: "hidden",
          transform: `translateY(${mockupOffsetY}px)`,
          opacity: mockupEntrance,
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* ── Sticky pinned header ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: STICKY_H,
            backgroundColor: "rgba(220,38,38,0.13)",
            borderBottom: "1px solid rgba(220,38,38,0.30)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
            zIndex: 10,
            boxSizing: "border-box",
          }}
        >
          {/* Nav logo placeholder */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                backgroundColor: BRAND.red,
              }}
            />
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 15,
                fontWeight: 700,
                color: BRAND.text,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Site
            </div>
          </div>

          {/* Nav links placeholders */}
          <div style={{ display: "flex", gap: 16 }}>
            {[60, 50, 55].map((w, i) => (
              <div
                key={i}
                style={{
                  width: w,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: BRAND.textDimmer,
                }}
              />
            ))}
          </div>

          {/* "sticky" badge */}
          <div
            style={{
              fontFamily: FONT_CODE,
              fontSize: 11,
              color: BRAND.red,
              backgroundColor: "rgba(220,38,38,0.12)",
              padding: "3px 8px",
              borderRadius: 4,
              border: "1px solid rgba(220,38,38,0.22)",
            }}
          >
            sticky
          </div>
        </div>

        {/* ── Scrolling content area ── */}
        <div
          style={{
            position: "absolute",
            top: STICKY_H,
            left: 0,
            width: "100%",
            height: MOCKUP_H - STICKY_H,
            overflow: "hidden",
          }}
        >
          {/* Inner scrollable strip */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${-scrollY}px)`,
            }}
          >
            {SECTIONS.map((section, i) => {
              const sectionTop = i * (SECTION_H + SECTION_GAP);
              /* Fade each section in as it nears the viewport */
              const visibleAt = sectionTop / MAX_SCROLL;
              const sectionOpacity = interpolate(
                scrollProgress,
                [Math.max(0, visibleAt - 0.15), visibleAt + 0.05],
                [0.3, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );

              return (
                <div
                  key={i}
                  style={{
                    marginTop: i === 0 ? 12 : SECTION_GAP,
                    marginLeft: 12,
                    marginRight: 12,
                    height: SECTION_H,
                    backgroundColor: section.color,
                    border: `1px solid ${section.border}`,
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 12,
                    opacity: sectionOpacity,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 18,
                      fontWeight: 600,
                      color: BRAND.textDim,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                    }}
                  >
                    {section.label}
                  </div>
                  {/* Content bar placeholders */}
                  {[1, 0.72, 0.5].map((widthFactor, j) => (
                    <div
                      key={j}
                      style={{
                        width: 220 * widthFactor,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: BRAND.border,
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Progress bar on right edge of mockup ── */}
        <div
          style={{
            position: "absolute",
            top: STICKY_H + 8,
            right: 4,
            width: 3,
            height: MOCKUP_H - STICKY_H - 16,
            backgroundColor: BRAND.border,
            borderRadius: 2,
          }}
        >
          <div
            style={{
              width: "100%",
              height: `${scrollProgress * 100}%`,
              backgroundColor: BRAND.red,
              borderRadius: 2,
              boxShadow: `0 0 6px rgba(220,38,38,0.5)`,
            }}
          />
        </div>

        {/* Scroll position percentage readout inside mockup */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 16,
            fontFamily: FONT_CODE,
            fontSize: 11,
            color: BRAND.textDimmer,
          }}
        >
          {Math.round(scrollProgress * 100)}% scrolled
        </div>
      </div>

      {/* ── Scroll arrow annotations ── */}
      <div
        style={{
          position: "absolute",
          right: `calc(50% - ${MOCKUP_W / 2}px - 80px)`,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: tagSpring,
        }}
      >
        <div
          style={{
            fontFamily: FONT_CODE,
            fontSize: 12,
            color: BRAND.textDim,
            letterSpacing: 2,
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          scroll ↓
        </div>
        <div
          style={{
            width: 1,
            height: 80,
            background: `linear-gradient(to bottom, ${BRAND.red}60, transparent)`,
          }}
        />
      </div>

      {/* ── Left annotation: "pinned" label for the sticky bar ── */}
      <div
        style={{
          position: "absolute",
          left: `calc(50% - ${MOCKUP_W / 2}px - 110px)`,
          top: `calc(50% - ${MOCKUP_H / 2}px + ${STICKY_H / 2}px - 10px)`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: tagSpring,
        }}
      >
        <div
          style={{
            fontFamily: FONT_CODE,
            fontSize: 12,
            color: BRAND.red,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          position: sticky
        </div>
        <div
          style={{
            width: 40,
            height: 1,
            backgroundColor: `rgba(220,38,38,0.35)`,
          }}
        />
      </div>

      {/* ── Component tag — bottom-left ── */}
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
        {"<Scene>"}
      </div>

      {/* ── Progress readout — bottom-right ── */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 80,
          fontFamily: FONT_CODE,
          fontSize: 14,
          color: BRAND.textDim,
          opacity: tagSpring,
        }}
      >
        progress: {Math.round(scrollProgress * 100)}%
      </div>

      {/* ── Bottom accent line ── */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 80,
          right: 80,
          height: 2,
          backgroundColor: BRAND.border,
          borderRadius: 1,
        }}
      >
        <div
          style={{
            width: `${scrollProgress * 100}%`,
            height: "100%",
            backgroundColor: BRAND.red,
            borderRadius: 1,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
