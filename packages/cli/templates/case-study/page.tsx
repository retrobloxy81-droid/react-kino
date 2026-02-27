"use client";

import { Kino, Scene, ScrollFade, ScrollReveal } from "react-kino";

export default function __PROJECT_NAME__Page() {
  return (
    <Kino>
      {/* Title card */}
      <Scene duration="150vh">
        <ScrollFade>
          <div style={{ padding: "30vh 2rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.5 }}>
              Case Study
            </p>
            <h1 style={{ fontSize: "3.5rem", fontWeight: 700, marginTop: "1rem" }}>
              __PROJECT_NAME__
            </h1>
          </div>
        </ScrollFade>
      </Scene>

      {/* The Challenge */}
      <Scene duration="200vh">
        <ScrollReveal>
          <section style={{ maxWidth: 720, margin: "0 auto", padding: "10vh 2rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>The Challenge</h2>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.8, opacity: 0.8 }}>
              Describe the problem your team set out to solve. What were the constraints?
              What made this project unique?
            </p>
          </section>
        </ScrollReveal>
      </Scene>

      {/* The Solution */}
      <Scene duration="200vh">
        <ScrollReveal>
          <section style={{ maxWidth: 720, margin: "0 auto", padding: "10vh 2rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>The Solution</h2>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.8, opacity: 0.8 }}>
              Walk through your approach. Highlight key decisions, technologies used,
              and creative breakthroughs.
            </p>
          </section>
        </ScrollReveal>
      </Scene>

      {/* Results */}
      <Scene duration="250vh">
        <ScrollReveal stagger={0.2}>
          <section style={{ maxWidth: 720, margin: "0 auto", padding: "10vh 2rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Results</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", textAlign: "center" }}>
              <Stat value="3x" label="Performance Gain" />
              <Stat value="40%" label="Cost Reduction" />
              <Stat value="99.9%" label="Uptime" />
            </div>
          </section>
        </ScrollReveal>
      </Scene>
    </Kino>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div style={{ fontSize: "3rem", fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: "0.875rem", opacity: 0.6, marginTop: "0.5rem" }}>{label}</div>
    </div>
  );
}
