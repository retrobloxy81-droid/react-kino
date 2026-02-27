import { HorizontalScroll, Panel } from "react-kino";

const FEATURES = [
  {
    icon: "//",
    title: "Zero dependencies",
    description: "Only React as a peer dependency. Nothing else.",
  },
  {
    icon: "<>",
    title: "Declarative API",
    description: "Compose scenes and animations like JSX.",
  },
  {
    icon: ">>",
    title: "GPU accelerated",
    description: "CSS transforms and will-change for 60fps.",
  },
  {
    icon: "a11y",
    title: "Accessible",
    description: "Respects prefers-reduced-motion out of the box.",
  },
];

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        border: "1px solid #2a2a2a",
        borderRadius: "16px",
        padding: "48px 40px",
        maxWidth: "360px",
        width: "100%",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          color: "#7c3aed",
          marginBottom: "20px",
          fontWeight: 700,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "22px",
          fontWeight: 600,
          marginBottom: "8px",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "#888888",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  );
}

export function HorizontalDemo() {
  return (
    <section>
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "120px 24px 60px",
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
          Features worth scrolling for.
        </h2>
        <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#888888" }}>
          Vertical scroll, horizontal motion. Keep scrolling.
        </p>
      </div>

      <HorizontalScroll>
        {FEATURES.map((feature) => (
          <Panel key={feature.title}>
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
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          </Panel>
        ))}
      </HorizontalScroll>
    </section>
  );
}
