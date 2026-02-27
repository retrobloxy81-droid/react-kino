import { createPreset } from "fumadocs-ui/tailwind-plugin";
import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  presets: [createPreset()],
  content: [
    "./node_modules/fumadocs-ui/dist/**/*.js",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {},
  },
} satisfies Config;

export default config;
