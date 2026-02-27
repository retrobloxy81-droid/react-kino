import { Scene, Reveal } from "react-kino";

const PRESETS = [
  {
    animation: "fade" as const,
    label: "fade",
    description: "Simple opacity transition",
  },
  {
    animation: "fade-up" as const,
    label: "fade-up",
    description: "Slide up with opacity",
  },
  {
    animation: "fade-down" as const,
    label: "fade-down",
    description: "Slide down with opacity",
  },
  {
    animation: "scale" as const,
    label: "scale",
    description: "Scale in from 90%",
  },
  {
    animation: "blur" as const,
    label: "blur",
    description: "Blur to sharp reveal",
  },
];

function DemoCard({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        border: "1px solid #2a2a2a",
        borderRadius: "12px",
        padding: "32px",
        textAlign: "center",
      }}
    >
      <code
        style={{
          display: "inline-block",
          fontSize: "14px",
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          background: "rgba(124,58,237,0.15)",
          color: "#a78bfa",
          padding: "4px 12px",
          borderRadius: "6px",
          marginBottom: "12px",
        }}
      >
        {label}
      </code>
      <p style={{ fontSize: "15px", color: "#888888", lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
}

export function RevealDemo() {
  return (
    <section style={{ padding: "80px 0 0" }}>
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "0 24px 60px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(40px, 5vw, 72px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Scroll-triggered reveals.
        </h2>
        <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#888888" }}>
          Five animation presets. One{" "}
          <code
            style={{
              background: "#1a1a1a",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          >
            {"<Reveal>"}
          </code>{" "}
          component.
        </p>
      </div>

      <Scene duration="300vh">
        {(progress) => (
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 24px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                maxWidth: "1000px",
                width: "100%",
              }}
            >
              {PRESETS.map((preset, i) => (
                <Reveal
                  key={preset.label}
                  at={0.1 + i * 0.15}
                  animation={preset.animation}
                  progress={progress}
                >
                  <DemoCard
                    label={preset.label}
                    description={preset.description}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Scene>
    </section>
  );
}
