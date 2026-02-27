import { Parallax } from "react-kino";

export function ParallaxDemo() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "120px 24px",
      }}
    >
      {/* Slow background layer */}
      <Parallax speed={0.2}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(120px, 20vw, 300px)",
            fontWeight: 800,
            color: "rgba(255,255,255,0.03)",
            letterSpacing: "-0.04em",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          DEPTH
        </div>
      </Parallax>

      {/* Mid layer decorative circles */}
      <Parallax speed={0.6}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "clamp(200px, 30vw, 400px)",
            height: "clamp(200px, 30vw, 400px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "5%",
            width: "clamp(150px, 20vw, 300px)",
            height: "clamp(150px, 20vw, 300px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </Parallax>

      {/* Foreground content */}
      <Parallax speed={1.4}>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: "700px",
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
            Create depth.
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#888888",
              marginBottom: "40px",
            }}
          >
            Move layers at different speeds with the{" "}
            <code
              style={{
                background: "#1a1a1a",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            >
              speed
            </code>{" "}
            prop. Below 1 drifts slower, above 1 races ahead.
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
            }}
          >
            <span style={{ color: "#7c3aed" }}>{"<Parallax"}</span>
            <span style={{ color: "#a78bfa" }}>{" speed={0.5}"}</span>
            <span style={{ color: "#7c3aed" }}>{">"}</span>
            <span style={{ color: "#888888" }}>{"<img />"}</span>
            <span style={{ color: "#7c3aed" }}>{"</Parallax>"}</span>
          </code>
        </div>
      </Parallax>
    </section>
  );
}
