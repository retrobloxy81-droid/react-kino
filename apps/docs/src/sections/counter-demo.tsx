import { Scene, Counter } from "react-kino";

function StatCard({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div style={{ textAlign: "center", padding: "32px 16px" }}>
      <div
        style={{
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 700,
          color: "#a78bfa",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          marginBottom: "8px",
        }}
      >
        {children}
      </div>
      <span
        style={{
          fontSize: "15px",
          color: "#555555",
          textTransform: "uppercase" as const,
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function CounterDemo() {
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
          Numbers that move.
        </h2>
        <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#888888" }}>
          Animated counters that count up as you scroll into view.
        </p>
      </div>

      <Scene duration="150vh">
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
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "24px",
                maxWidth: "900px",
                width: "100%",
              }}
            >
              <StatCard label="Revenue tracked">
                <Counter
                  from={0}
                  to={10000}
                  at={0.2}
                  progress={progress}
                  format={(n) => `$${n.toLocaleString()}`}
                />
              </StatCard>
              <StatCard label="Satisfaction rate">
                <Counter
                  from={0}
                  to={99}
                  at={0.3}
                  progress={progress}
                  format={(n) => `${n}%`}
                />
              </StatCard>
              <StatCard label="Components shipped">
                <Counter
                  from={0}
                  to={2400}
                  at={0.4}
                  progress={progress}
                  format={(n) => `${n.toLocaleString()}+`}
                />
              </StatCard>
            </div>
          </div>
        )}
      </Scene>
    </section>
  );
}
