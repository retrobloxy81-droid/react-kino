import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND, FONT_BODY, FONT_CODE, FONT_DISPLAY } from "../theme";

const CARDS = [
  { label: "Fade", delay: 8 },
  { label: "Fade Up", delay: 18 },
  { label: "Fade Down", delay: 28 },
  { label: "Scale", delay: 38 },
  { label: "Blur", delay: 48 },
];

export const RevealDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagSpring = spring({
    frame: frame - 2,
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
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(220,38,38,0.06), transparent 70%)`,
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
        Scroll-Triggered Entrances
      </div>

      {/* Cards row */}
      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "center",
        }}
      >
        {CARDS.map((card, i) => {
          const cardSpring = spring({
            frame: frame - card.delay,
            fps,
            config: { damping: 18, stiffness: 120 },
          });

          let opacity = 1;
          let transform = "none";

          if (card.label === "Fade") {
            opacity = cardSpring;
            transform = "none";
          } else if (card.label === "Fade Up") {
            const y = interpolate(cardSpring, [0, 1], [40, 0]);
            opacity = cardSpring;
            transform = `translateY(${y}px)`;
          } else if (card.label === "Fade Down") {
            const y = interpolate(cardSpring, [0, 1], [-40, 0]);
            opacity = cardSpring;
            transform = `translateY(${y}px)`;
          } else if (card.label === "Scale") {
            const scale = interpolate(cardSpring, [0, 1], [0.5, 1]);
            opacity = cardSpring;
            transform = `scale(${scale})`;
          } else if (card.label === "Blur") {
            opacity = cardSpring;
            transform = "none";
          }

          return (
            <div
              key={card.label}
              style={{
                width: 200,
                height: 260,
                backgroundColor: BRAND.bgCard,
                border: `1px solid ${BRAND.border}`,
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 18,
                opacity,
                transform,
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: "rgba(220,38,38,0.15)",
                  border: `1px solid rgba(220,38,38,0.35)`,
                }}
              />

              {/* Effect name */}
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 16,
                  fontWeight: 500,
                  color: BRAND.text,
                }}
              >
                {card.label}
              </span>

              {/* Small label */}
              <span
                style={{
                  fontFamily: FONT_CODE,
                  fontSize: 12,
                  color: BRAND.textDim,
                }}
              >
                reveal
              </span>
            </div>
          );
        })}
      </div>

      {/* Component tag */}
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
        {"<Reveal>"}
      </div>
    </AbsoluteFill>
  );
};
