import { Scene } from "react-kino";

export function SceneDemo() {
  return (
    <Scene duration="200vh">
      {(progress) => (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, rgba(124,58,237,${0.15 * progress}) 0%, #0a0a0a 100%)`,
            padding: "0 24px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#7c3aed",
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              marginBottom: "24px",
            }}
          >
            Scene Component
          </p>

          <div
            style={{
              fontSize: "clamp(80px, 15vw, 200px)",
              fontWeight: 700,
              fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', monospace",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: "16px",
              background: `linear-gradient(135deg, #ffffff ${100 - progress * 100}%, #7c3aed 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {Math.round(progress * 100)}%
          </div>

          <p
            style={{
              fontSize: "16px",
              color: "#555555",
              marginBottom: "48px",
            }}
          >
            scene progress
          </p>

          <code
            style={{
              display: "inline-block",
              fontSize: "14px",
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              padding: "16px 24px",
              color: "#888888",
              maxWidth: "100%",
              overflow: "auto",
            }}
          >
            <span style={{ color: "#7c3aed" }}>{"<Scene"}</span>
            <span style={{ color: "#a78bfa" }}>{' duration="200vh"'}</span>
            <span style={{ color: "#7c3aed" }}>{">"}</span>
            <span style={{ color: "#888888" }}>
              {"{(progress) => <span>{progress}</span>}"}
            </span>
            <span style={{ color: "#7c3aed" }}>{"</Scene>"}</span>
          </code>
        </div>
      )}
    </Scene>
  );
}
