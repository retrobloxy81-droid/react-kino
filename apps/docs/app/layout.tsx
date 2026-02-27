import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "react-kino",
    template: "%s | react-kino",
  },
  description:
    "Cinematic scroll-driven storytelling for React. Apple-style scroll experiences in under 3 KB.",
  openGraph: {
    title: "react-kino",
    description:
      "Cinematic scroll-driven storytelling for React. Apple-style scroll experiences in under 3 KB.",
    images: ["/og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "react-kino",
    description:
      "Cinematic scroll-driven storytelling for React. Apple-style scroll experiences in under 3 KB.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
