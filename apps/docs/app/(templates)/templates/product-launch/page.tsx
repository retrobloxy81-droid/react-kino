"use client";

import { ProductLaunch } from "@react-kino/templates";
import { BackButton } from "../back-button";

export default function ProductLaunchPage() {
  return (
    <>
      <BackButton />
      <ProductLaunch
        name="Nebula"
        tagline="The developer platform that turns ideas into production-ready apps in minutes, not months."
        accentColor="#8b5cf6"
        heroBackground="linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%)"
        navItems={[
          { label: "Features" },
          { label: "Pricing" },
          { label: "Docs" },
        ]}
        stats={[
          { value: 10, label: "Times faster", format: (n) => `${n}x` },
          {
            value: 99.9,
            label: "Uptime",
            format: (n) => `${n.toFixed(1)}%`,
          },
          {
            value: 50000,
            label: "Developers",
            format: (n) => n.toLocaleString() + "+",
          },
        ]}
        features={[
          {
            title: "Instant Deploy",
            description:
              "Push to git and watch your app go live in seconds. Zero config, zero friction.",
            icon: "\u26A1",
          },
          {
            title: "Edge-First",
            description:
              "Run at the edge by default. Sub-50ms latency for every user, everywhere.",
            icon: "\uD83C\uDF0D",
          },
          {
            title: "AI-Native",
            description:
              "Built-in AI primitives for inference, embeddings, and RAG pipelines.",
            icon: "\uD83E\uDDE0",
          },
        ]}
        marqueeItems={[
          "Instant Deploy",
          "Edge Runtime",
          "AI-Native",
          "Type-Safe",
          "Auto-Scale",
          "Zero Config",
        ]}
      />
    </>
  );
}
