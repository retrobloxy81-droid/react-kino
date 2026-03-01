import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { BRAND, FONT_BODY, FONT_CODE, FONT_DISPLAY } from "../theme";

const FRAME_COUNT = 16;
const FILMSTRIP_WIDTH = 1200;
const FILMSTRIP_HEIGHT = 350;
const FRAME_WIDTH = 70;
const FRAME_HEIGHT = 50;
const FRAME_GAP = 8;
const SPROCKET_SIZE = 8;

export const VideoScrollDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagSpring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 200 },
  });

  // Playhead advances left to right across the filmstrip
  const playheadX = interpolate(frame, [4, 100], [0, FILMSTRIP_WIDTH], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  // Progress bar fill (0..1)
  const progressFill = playheadX / FILMSTRIP_WIDTH;

  // Which frame thumbnail is currently active (0-indexed)
  const totalFrameAreaWidth = FRAME_COUNT * (FRAME_WIDTH + FRAME_GAP) - FRAME_GAP;
  const frameStartX = (FILMSTRIP_WIDTH - totalFrameAreaWidth) / 2;
  const activeFrameIndex = Math.min(
    FRAME_COUNT - 1,
    Math.max(
      0,
      Math.floor((playheadX - frameStartX) / (FRAME_WIDTH + FRAME_GAP)),
    ),
  );

  // Frame counter display (1-indexed)
  const displayFrame = activeFrameIndex + 1;

  // Sprocket positions: one above + one below each frame column
  const sprocketPositions = Array.from({ length: FRAME_COUNT }, (_, i) => {
    return frameStartX + i * (FRAME_WIDTH + FRAME_GAP) + FRAME_WIDTH / 2;
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg }}>
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: FONT_DISPLAY,
          fontSize: 18,
          fontWeight: 600,
          color: BRAND.textDim,
          letterSpacing: 5,
          textTransform: "uppercase",
          opacity: tagSpring,
          whiteSpace: "nowrap",
        }}
      >
        Frame-by-Frame Scrubbing
      </div>

      {/* Filmstrip area */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: FILMSTRIP_WIDTH,
          height: FILMSTRIP_HEIGHT,
        }}
      >
        {/* Top sprocket holes row */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 0,
            width: "100%",
            height: SPROCKET_SIZE,
            display: "flex",
            alignItems: "center",
          }}
        >
          {sprocketPositions.map((cx, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: cx - SPROCKET_SIZE / 2,
                width: SPROCKET_SIZE,
                height: SPROCKET_SIZE,
                borderRadius: "50%",
                backgroundColor: BRAND.textDimmer,
              }}
            />
          ))}
        </div>

        {/* Bottom sprocket holes row */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 0,
            width: "100%",
            height: SPROCKET_SIZE,
            display: "flex",
            alignItems: "center",
          }}
        >
          {sprocketPositions.map((cx, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: cx - SPROCKET_SIZE / 2,
                width: SPROCKET_SIZE,
                height: SPROCKET_SIZE,
                borderRadius: "50%",
                backgroundColor: BRAND.textDimmer,
              }}
            />
          ))}
        </div>

        {/* Frame thumbnails */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: frameStartX,
            transform: "translateY(-50%)",
            display: "flex",
            gap: FRAME_GAP,
            alignItems: "center",
          }}
        >
          {Array.from({ length: FRAME_COUNT }, (_, i) => {
            const isActive = i === activeFrameIndex;
            return (
              <div
                key={i}
                style={{
                  width: FRAME_WIDTH,
                  height: FRAME_HEIGHT,
                  backgroundColor: BRAND.bgCard,
                  border: `1px solid ${isActive ? BRAND.red : BRAND.border}`,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: 4,
                  boxSizing: "border-box",
                  boxShadow: isActive
                    ? `0 0 12px ${BRAND.redGlow}, inset 0 0 8px ${BRAND.redGlow}`
                    : "none",
                  transition: "box-shadow 0s",
                  flexShrink: 0,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Subtle inner detail lines to suggest film content */}
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 6,
                    right: 6,
                    height: 2,
                    backgroundColor: isActive
                      ? `${BRAND.red}40`
                      : BRAND.textDimmer,
                    borderRadius: 1,
                    opacity: 0.5,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 10,
                    right: 10,
                    height: 2,
                    backgroundColor: isActive
                      ? `${BRAND.red}30`
                      : BRAND.textDimmer,
                    borderRadius: 1,
                    opacity: 0.3,
                  }}
                />
                {/* Frame number */}
                <span
                  style={{
                    fontFamily: FONT_CODE,
                    fontSize: 11,
                    color: isActive ? BRAND.red : BRAND.textDimmer,
                    letterSpacing: 1,
                    lineHeight: 1,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {String(i + 1).padStart(3, "0")}
                </span>
              </div>
            );
          })}
        </div>

        {/* Playhead vertical line */}
        <div
          style={{
            position: "absolute",
            left: playheadX,
            top: 0,
            width: 3,
            height: "100%",
            backgroundColor: BRAND.red,
            transform: "translateX(-1.5px)",
            boxShadow: `0 0 10px ${BRAND.redGlow}`,
          }}
        >
          {/* Triangle marker pointing down from top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: `10px solid ${BRAND.red}`,
            }}
          />
        </div>

        {/* Frame counter bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            fontFamily: FONT_CODE,
            fontSize: 14,
            color: BRAND.textDim,
            letterSpacing: 2,
          }}
        >
          Frame:{" "}
          <span style={{ color: BRAND.red }}>
            {String(displayFrame).padStart(3, "0")}
          </span>{" "}
          /{" "}
          <span style={{ color: BRAND.textDimmer }}>
            {String(FRAME_COUNT).padStart(3, "0")}
          </span>
        </div>
      </div>

      {/* Progress bar below the filmstrip */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, ${FILMSTRIP_HEIGHT / 2 + 24}px)`,
          width: FILMSTRIP_WIDTH,
          height: 4,
          backgroundColor: BRAND.border,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progressFill * 100}%`,
            height: "100%",
            backgroundColor: BRAND.red,
            borderRadius: 2,
            boxShadow: `0 0 8px ${BRAND.redGlow}`,
          }}
        />
      </div>

      {/* Component tag bottom-left */}
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
          backgroundColor: `${BRAND.red}12`,
          padding: "6px 16px",
          borderRadius: 6,
          border: `1px solid ${BRAND.red}30`,
        }}
      >
        {"<VideoScroll>"}
      </div>
    </AbsoluteFill>
  );
};
