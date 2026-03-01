import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <RootProvider>{children}</RootProvider>;
}
