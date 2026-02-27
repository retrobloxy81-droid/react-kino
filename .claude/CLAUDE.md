# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

react-kino is a React component library for cinematic scroll-driven storytelling (Apple-style scroll experiences). The full specification lives in `PLAN.md`.

## Monorepo Structure (Turborepo + pnpm)

```
kino/
├── packages/
│   ├── core/       # @kino/core — framework-agnostic scroll engine (pure TS, zero deps)
│   ├── react/      # react-kino — React components and hooks (the npm-published package)
│   └── cli/        # @kino/cli — future scaffolding CLI
├── apps/
│   ├── docs/       # Vite + React marketing/demo site
│   └── playground/ # future interactive playground
└── tooling/        # shared ESLint, TypeScript, and tsup configs
```

**Key architectural split:** `@kino/core` contains all scroll math, progress calculation, easing, and pinning logic as pure JS. `react-kino` (packages/react) wraps core with React components and hooks.

## Commands

```bash
pnpm install              # install all dependencies
pnpm build                # build all packages in dependency order (core → react → docs)
pnpm dev                  # run all dev scripts in parallel (tsup --watch + vite dev)
pnpm lint                 # lint all packages
pnpm test                 # run tests (depends on build)
pnpm typecheck            # type-check all packages
pnpm clean                # clean all dist dirs and node_modules
```

Build order enforced by Turborepo: `@kino/core` → `react-kino` → `apps/docs`.

## Build & Test Tooling

- **Package manager:** pnpm 9.15.0 with workspaces
- **Monorepo:** Turborepo v2 (`turbo.json` defines task pipeline)
- **Package builds:** tsup v8 (ESM + CJS + `.d.ts`)
- **Docs app:** Vite v6 + @vitejs/plugin-react
- **Tests:** Vitest + @testing-library/react + jsdom
- **TypeScript:** strict mode, ES2020 target, `bundler` module resolution

## Conventions

- **File naming:** kebab-case for all files (`compare-slider.tsx`, `use-scroll-progress.ts`)
- **Export naming:** PascalCase for React components (`<CompareSlider>`), camelCase for hooks (`useScrollProgress`)
- **SSR safety:** All scroll logic in `useEffect` (client-side only). Components render children on server. Use `useIsClient()` guard for scroll-dependent calculations.
- **Next.js compatibility:** Components use `"use client"` directive for App Router
- **Accessibility:** Respect `prefers-reduced-motion` — render content immediately without animation when preferred
- **Bundle target:** Under 8KB gzipped for core components
- **Dependencies:** Zero required runtime deps. React is a peer dep. Framer Motion is an optional peer dep.

## Animation Engine Priority

1. CSS Scroll Timeline API (Chrome 115+, Firefox 121+) — native, best perf
2. Web Animations API (WAAPI) — JS-controlled but GPU-accelerated fallback
3. Framer Motion — optional enhancement if installed

## Pinning Strategy

`<Scene>` uses CSS `position: sticky` with a tall spacer div (height = duration). Progress = scroll position through spacer / spacer height. Same technique as GSAP ScrollTrigger without the dependency.

## Publishing

Uses changesets for independent package versioning. GitHub Actions: `ci.yml` (lint + test on PR), `publish.yml` (npm publish on release tag).
