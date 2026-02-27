import { useState } from "react";
import { Scene } from "react-kino";
import { SliderControl } from "../controls/slider-control";
import { ToggleControl } from "../controls/toggle-control";

export function VideoScrollDemo() {
  const [progress, setProgress] = useState(0.3);
  const [pin, setPin] = useState(true);

  const code = `<VideoScroll\n  src="/hero.mp4"\n  duration="300vh"\n  pin={${pin}}\n/>`;

  return {
    controls: (
      <>
        <SliderControl
          label="Progress"
          value={progress}
          min={0}
          max={1}
          step={0.01}
          onChange={setProgress}
        />
        <ToggleControl label="Pin" value={pin} onChange={setPin} />
      </>
    ),
    preview: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: "80vh",
          padding: 40,
        }}
      >
        <Scene duration="200vh" pin={pin}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              gap: 24,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 600,
                aspectRatio: "16/9",
                background: `linear-gradient(135deg, hsl(${progress * 360}, 70%, 25%), hsl(${progress * 360 + 60}, 70%, 35%))`,
                borderRadius: 12,
                border: "1px solid #2a2a2a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 12,
                transition: "background 100ms linear",
              }}
            >
              <div style={{ fontSize: 14, color: "#888" }}>
                VideoScroll placeholder
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: "#fff",
                }}
              >
                {(progress * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: 12, color: "#666", textAlign: "center", maxWidth: 300 }}>
                In production, pass a video src to scrub through frames as the user scrolls.
              </div>
            </div>
            <div style={{ color: "#888", fontSize: 13 }}>
              pin: {pin ? "true" : "false"} | progress: {progress.toFixed(2)}
            </div>
          </div>
        </Scene>
      </div>
    ),
    code,
  };
}
