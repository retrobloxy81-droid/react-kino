"use client";

import { CaseStudy } from "@react-kino/templates";
import { BackButton } from "../back-button";

export default function CaseStudyPage() {
  return (
    <>
      <BackButton />
      <CaseStudy
        title="Redesigning the Future of Digital Commerce"
        client="Meridian Labs"
        year={2024}
        overview="Meridian Labs needed a complete rethink of their digital commerce platform. The existing system was built on decade-old architecture that couldn't keep pace with modern consumer expectations. We partnered with their team to design and build a new experience from the ground up — one that feels as premium as the products it sells."
        challenge="The legacy platform suffered from 4-second load times, a fragmented mobile experience, and a checkout flow that lost 68% of users before completion. The engineering team was spending more time on maintenance than innovation, and the design system had no cohesive language."
        solution="We rebuilt the entire frontend on a modern stack with server-side rendering and edge caching. A new design system unified the brand across every touchpoint. The checkout was reimagined as a single, smooth scroll experience — reducing steps from 5 to 1. Real-time inventory and personalized recommendations brought the storefront to life."
        results={[
          {
            metric: "Faster load time",
            value: 3.2,
            format: (n) => `${n.toFixed(1)}x`,
          },
          {
            metric: "Conversion increase",
            value: 47,
            format: (n) => `+${n}%`,
          },
          {
            metric: "Revenue growth",
            value: 2.8,
            format: (n) => `${n.toFixed(1)}x`,
          },
          {
            metric: "Mobile engagement",
            value: 156,
            format: (n) => `+${n}%`,
          },
        ]}
        nextProject={{
          title: "Apex Health Rebrand",
          href: "#",
        }}
        marqueeItems={[
          "3.2x Faster",
          "+47% Conversions",
          "2.8x Revenue",
          "+156% Mobile",
        ]}
      />
    </>
  );
}
