import { Scene, CompareSlider } from "react-kino";

function BeforePanel() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "12px",
          background: "#333333",
        }}
      />
      <div
        style={{
          width: "120px",
          height: "12px",
          borderRadius: "6px",
          background: "#333333",
        }}
      />
      <div
        style={{
          width: "180px",
          height: "8px",
          borderRadius: "4px",
          background: "#2a2a2a",
        }}
      />
      <div
        style={{
          width: "160px",
          height: "8px",
          borderRadius: "4px",
          background: "#2a2a2a",
        }}
      />
      <p
        style={{
          position: "absolute",
          bottom: "24px",
          fontSize: "13px",
          color: "#555555",
          textTransform: "uppercase" as const,
          letterSpacing: "0.08em",
        }}
      >
        Before
      </p>
    </div>
  );
}

function AfterPanel() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #7c3aed 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
          boxShadow: "0 8px 32px rgba(124,58,237,0.4)",
        }}
      />
      <div
        style={{
          width: "120px",
          height: "12px",
          borderRadius: "6px",
          background: "rgba(255,255,255,0.3)",
        }}
      />
      <div
        style={{
          width: "180px",
          height: "8px",
          borderRadius: "4px",
          background: "rgba(255,255,255,0.15)",
        }}
      />
      <div
        style={{
          width: "160px",
          height: "8px",
          borderRadius: "4px",
          background: "rgba(255,255,255,0.1)",
        }}
      />
      <p
        style={{
          position: "absolute",
          bottom: "24px",
          fontSize: "13px",
          color: "rgba(255,255,255,0.6)",
          textTransform: "uppercase" as const,
          letterSpacing: "0.08em",
        }}
      >
        After
      </p>
    </div>
  );
}

export function CompareDemo() {
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
          Before. After. Scroll.
        </h2>
        <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#888888" }}>
          Scroll-driven comparison slider. No dragging required.
        </p>
      </div>

      <Scene duration="200vh">
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
                maxWidth: "600px",
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #2a2a2a",
              }}
            >
              <CompareSlider
                scrollDriven
                progress={progress}
                before={
                  <div style={{ width: "100%", height: "400px", position: "relative" }}>
                    <BeforePanel />
                  </div>
                }
                after={
                  <div style={{ width: "100%", height: "400px", position: "relative" }}>
                    <AfterPanel />
                  </div>
                }
              />
            </div>
          </div>
        )}
      </Scene>
    </section>
  );
}
