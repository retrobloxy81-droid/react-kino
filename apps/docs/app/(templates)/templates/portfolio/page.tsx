"use client";

import { Portfolio } from "@react-kino/templates";
import { BackButton } from "../back-button";

export default function PortfolioPage() {
  return (
    <>
      <BackButton />
      <Portfolio
        name="Alex Rivera"
        role="Design Engineer"
        bio="I craft digital experiences at the intersection of design and engineering. With a decade of building for the web, I focus on motion, interaction, and the invisible details that make interfaces feel alive."
        accentColor="#3b82f6"
        projects={[
          {
            title: "Luminary Dashboard",
            description:
              "A real-time analytics dashboard with GPU-accelerated charts and spatial data visualization for enterprise clients.",
            year: 2024,
            tags: ["React", "WebGL", "D3"],
          },
          {
            title: "Wavelength",
            description:
              "A collaborative music production tool in the browser — real-time MIDI, waveform editing, and multiplayer sessions.",
            year: 2023,
            tags: ["Web Audio", "Canvas", "WebRTC"],
          },
          {
            title: "Terraform Studio",
            description:
              "A visual infrastructure builder that turns drag-and-drop diagrams into production IaC configurations.",
            year: 2023,
            tags: ["TypeScript", "SVG", "DSL"],
          },
          {
            title: "Opal Design System",
            description:
              "A comprehensive component library and design token system serving 12 product teams across the organization.",
            year: 2022,
            tags: ["Design Systems", "Tokens", "Storybook"],
          },
        ]}
        skills={[
          "React",
          "TypeScript",
          "Next.js",
          "Framer Motion",
          "WebGL",
          "Figma",
          "CSS",
          "Node.js",
          "Rust",
        ]}
        contactEmail="alex@rivera.dev"
      />
    </>
  );
}
