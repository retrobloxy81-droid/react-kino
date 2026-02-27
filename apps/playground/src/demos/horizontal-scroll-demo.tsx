import { HorizontalScroll, Panel } from "react-kino";

const PANELS = [
  { label: "Panel 1", bg: "#1a1a2e" },
  { label: "Panel 2", bg: "#16213e" },
  { label: "Panel 3", bg: "#0f3460" },
  { label: "Panel 4", bg: "#1a1a3e" },
];

export function HorizontalScrollDemo() {
  const code = `<HorizontalScroll>\n${PANELS.map(
    (p) =>
      `  <Panel style={{ background: "${p.bg}" }}>\n    ${p.label}\n  </Panel>`
  ).join("\n")}\n</HorizontalScroll>`;

  return {
    controls: (
      <div style={{ color: "#888", fontSize: 13 }}>
        Scroll inside the preview to see horizontal movement.
      </div>
    ),
    preview: (
      <HorizontalScroll>
        {PANELS.map((p) => (
          <Panel
            key={p.label}
            style={{
              background: p.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {p.label}
          </Panel>
        ))}
      </HorizontalScroll>
    ),
    code,
  };
}
