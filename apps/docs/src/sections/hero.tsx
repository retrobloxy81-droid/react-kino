import { Parallax } from "react-kino";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background grid pattern */}
      <Parallax speed={0.3}>
        <div
          style={{
            position: "absolute",
            inset: "-50%",
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 60%), " +
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 80px 80px, 80px 80px",
            backgroundPosition: "center, center, center",
          }}
        />
      </Parallax>

      {/* Foreground content */}
      <Parallax speed={1.1}>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: "900px",
            padding: "0 24px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(56px, 8vw, 120px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: "24px",
            }}
          >
            Cinematic scroll
            <br />
            <span style={{ color: "#7c3aed" }}>for React.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.7,
              color: "#888888",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Scroll-pinned scenes. Parallax layers. Animated counters.
            Zero&nbsp;dependencies.
          </p>

          <a
            href="https://github.com/bilaltahir/react-kino"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "12px 32px",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "999px",
              fontSize: "16px",
              fontWeight: 500,
              color: "#ffffff",
              transition: "border-color 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#7c3aed";
              e.currentTarget.style.background = "rgba(124,58,237,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            View on GitHub
          </a>
        </div>
      </Parallax>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "14px",
          color: "#555555",
          letterSpacing: "0.05em",
        }}
      >
        Scroll to explore ↓
      </div>
    </section>
  );
}
