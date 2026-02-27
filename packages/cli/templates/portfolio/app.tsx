import { Kino, Scene, ScrollFade, ScrollReveal } from "react-kino";

export default function __PROJECT_NAME__() {
  return (
    <Kino>
      {/* Intro */}
      <Scene duration="150vh">
        <ScrollFade>
          <div style={{ padding: "30vh 2rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "3.5rem", fontWeight: 700 }}>__PROJECT_NAME__</h1>
            <p style={{ fontSize: "1.25rem", opacity: 0.6, marginTop: "1rem" }}>
              Designer &amp; Developer
            </p>
          </div>
        </ScrollFade>
      </Scene>

      {/* Project Grid */}
      <Scene duration="300vh">
        <ScrollReveal stagger={0.12}>
          <section style={{ maxWidth: 960, margin: "0 auto", padding: "10vh 2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Selected Work</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>
              <ProjectCard title="Project Alpha" category="Web Design" />
              <ProjectCard title="Project Beta" category="Mobile App" />
              <ProjectCard title="Project Gamma" category="Brand Identity" />
              <ProjectCard title="Project Delta" category="Motion Design" />
            </div>
          </section>
        </ScrollReveal>
      </Scene>

      {/* About */}
      <Scene duration="200vh">
        <ScrollReveal>
          <section style={{ maxWidth: 640, margin: "0 auto", padding: "10vh 2rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>About</h2>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.8, opacity: 0.8 }}>
              Write a short bio here. Describe your background, what drives your work,
              and what you are looking for.
            </p>
          </section>
        </ScrollReveal>
      </Scene>

      {/* Contact */}
      <Scene duration="100vh">
        <ScrollFade>
          <div style={{ textAlign: "center", padding: "20vh 2rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700 }}>Get in Touch</h2>
            <p style={{ marginTop: "1rem", opacity: 0.6 }}>hello@example.com</p>
          </div>
        </ScrollFade>
      </Scene>
    </Kino>
  );
}

function ProjectCard({ title, category }: { title: string; category: string }) {
  return (
    <div style={{ background: "#f5f5f5", borderRadius: 12, padding: "2rem", aspectRatio: "4/3", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>{title}</h3>
      <p style={{ fontSize: "0.875rem", opacity: 0.5, marginTop: "0.25rem" }}>{category}</p>
    </div>
  );
}
