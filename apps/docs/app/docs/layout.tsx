import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: "react-kino",
      }}
      links={[
        { text: "Home", url: "/" },
        {
          text: "GitHub",
          url: "https://github.com/bilaltahir/react-kino",
          external: true,
        },
      ]}
      githubUrl="https://github.com/bilaltahir/react-kino"
    >
      {children}
    </DocsLayout>
  );
}
