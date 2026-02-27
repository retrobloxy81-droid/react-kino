# react-kino

**Cinematic scroll-driven storytelling components for React.**

Think: Apple product page experiences as copy-paste components. Scroll-pinned sections, parallax layers, progressive reveals, animated counters, before/after sliders — all declarative, all composable.

---

## Why This Exists

Every marketing site, product launch, and portfolio wants the "Apple scroll effect." Currently, developers either:

1. Hand-roll it with GSAP/ScrollTrigger (days of work, fragile)
2. Use Framer Motion + IntersectionObserver (limited, no pinning)
3. Pay for Webflow/Framer (not React, not code-owned)

React Bits (32K stars), Magic UI (19K stars), and Aceternity UI all proved animated React component libraries go viral — but **none of them do scroll-driven storytelling**. They're all static viewport components (cards, backgrounds, text effects). The scroll orchestration layer is completely missing.

react-kino fills that gap.

---

## Core Components (MVP)

### 1. `<Kino>` — Root Provider
Wraps the scroll-storytelling experience. Manages scroll position state, provides context to children.

```tsx
<Kino>
  {/* scenes go here */}
</Kino>
```

### 2. `<Scene>` — Pinned Scroll Section
The core building block. Pins an element to the viewport while the user scrolls through a defined scroll distance. Children receive a `progress` value (0→1) representing how far through the scene the user has scrolled.

```tsx
<Scene pin duration="200vh">
  {(progress) => (
    <div>You are {Math.round(progress * 100)}% through this scene</div>
  )}
</Scene>
```

Key props:
- `pin` — whether to pin (sticky) the section
- `duration` — how much scroll distance this scene spans (e.g. "200vh", "300vh")
- `children` — render prop receiving `progress` (0-1) OR static children with sub-components

### 3. `<Reveal>` — Scroll-Triggered Entrance
Animates children into view when scroll progress reaches a threshold. Supports fade, slide, scale, blur, and custom variants.

```tsx
<Scene pin duration="200vh">
  <Reveal at={0.2} animation="fade-up">
    <h1>First thing you see</h1>
  </Reveal>
  <Reveal at={0.5} animation="fade-up">
    <p>Then this appears</p>
  </Reveal>
</Scene>
```

Key props:
- `at` — progress value (0-1) when animation triggers
- `animation` — preset name or custom keyframes
- `duration` — animation duration in ms
- `stagger` — delay between children if multiple

### 4. `<Parallax>` — Speed-Shifted Layer
Moves at a different rate than scroll, creating depth. Can be used inside or outside `<Scene>`.

```tsx
<Parallax speed={0.5}>
  <img src="/background.jpg" />
</Parallax>
<Parallax speed={1.5}>
  <h1>Foreground text</h1>
</Parallax>
```

Key props:
- `speed` — multiplier (1 = normal, <1 = slower/background, >1 = faster/foreground)
- `direction` — "vertical" (default) or "horizontal"

### 5. `<Counter>` — Animated Number
Counts from one number to another as the user scrolls through a scene.

```tsx
<Scene pin duration="150vh">
  <Counter from={0} to={10000} at={0.3} format={(n) => `$${n.toLocaleString()}`} />
</Scene>
```

Key props:
- `from` / `to` — start and end values
- `at` — progress value when counting begins
- `duration` — how much progress the count spans (default: 0.3)
- `format` — formatting function

### 6. `<CompareSlider>` — Before/After
A draggable before/after comparison slider that can also be scroll-driven.

```tsx
<CompareSlider
  before={<img src="/before.jpg" />}
  after={<img src="/after.jpg" />}
  scrollDriven  // optional: slider follows scroll progress instead of drag
/>
```

### 7. `<HorizontalScroll>` — Horizontal Scroll Section
Converts vertical scroll into horizontal movement. Classic Apple-style horizontal panels.

```tsx
<HorizontalScroll>
  <Panel>Slide 1</Panel>
  <Panel>Slide 2</Panel>
  <Panel>Slide 3</Panel>
</HorizontalScroll>
```

### 8. `<Progress>` — Visual Scroll Indicator
A progress bar or custom indicator tied to scene or page progress.

```tsx
<Progress type="bar" position="top" />
```

---

## Technical Approach

### Animation Engine (Priority Order)
1. **CSS Scroll Timeline API** — native browser API, best performance, no JS needed for animations. Progressive enhancement: use where supported (Chrome 115+, Firefox 121+).
2. **Web Animations API (WAAPI)** — for browsers without Scroll Timeline. Controlled via JS but GPU-accelerated.
3. **Framer Motion** — optional peer dependency for enhanced animations. If installed, react-kino uses it; if not, falls back to WAAPI/CSS.

### Scroll Position Tracking
- Use `IntersectionObserver` for trigger detection (when scenes enter/exit viewport)
- Use passive `scroll` event listener with `requestAnimationFrame` for continuous progress tracking
- Debounce/throttle as needed for performance
- Provide a `useScrollProgress()` hook for custom use

### Pinning Strategy
- Use CSS `position: sticky` as the foundation
- The `<Scene>` component renders a tall "spacer" div (height = duration) with a sticky inner container
- Progress is calculated based on how far through the spacer the user has scrolled
- This is the same technique GSAP ScrollTrigger uses, but without the dependency

### SSR / Next.js Compatibility
- All scroll logic runs client-side only (useEffect)
- Components render their children immediately on server (no flash of empty content)
- Use `useIsClient()` guard for scroll-dependent calculations
- Compatible with Next.js App Router (RSC: components are client components via "use client")

---

## Project Structure (Turborepo Monorepo)

The repo uses Turborepo so we can scale to multiple packages (templates, CLI, studio) and apps (docs, playground) over time. The shared scroll math/logic lives in a framework-agnostic `@kino/core` package that the React components import.

```
kino/
├── turbo.json                    # Turborepo pipeline config
├── package.json                  # root — workspaces, shared scripts
├── pnpm-workspace.yaml           # workspace definitions
├── tsconfig.base.json            # shared TS config all packages extend
├── LICENSE                       # MIT
├── README.md
│
├── packages/
│   ├── core/                     # @kino/core — framework-agnostic scroll engine
│   │   ├── src/
│   │   │   ├── index.ts          # public exports
│   │   │   ├── scroll-tracker.ts # scroll position tracking, progress calc
│   │   │   ├── pin-engine.ts     # sticky/spacer pinning logic
│   │   │   ├── easing.ts         # easing functions
│   │   │   ├── lerp.ts           # linear interpolation
│   │   │   ├── clamp.ts          # value clamping
│   │   │   └── types.ts          # shared types (SceneConfig, ProgressData, etc.)
│   │   ├── tsup.config.ts
│   │   ├── tsconfig.json         # extends ../../tsconfig.base.json
│   │   └── package.json          # name: "@kino/core"
│   │
│   ├── react/                    # react-kino — the React package (MVP)
│   │   ├── src/
│   │   │   ├── index.ts          # public exports
│   │   │   ├── kino.tsx          # root provider
│   │   │   ├── scene.tsx         # pinned scroll section
│   │   │   ├── reveal.tsx        # scroll-triggered entrance
│   │   │   ├── parallax.tsx      # speed-shifted layer
│   │   │   ├── counter.tsx       # animated number
│   │   │   ├── compare-slider.tsx # before/after slider
│   │   │   ├── horizontal-scroll.tsx
│   │   │   ├── progress.tsx      # scroll progress indicator
│   │   │   └── hooks/
│   │   │       ├── use-scroll-progress.ts
│   │   │       ├── use-scene-progress.ts
│   │   │       └── use-is-client.ts
│   │   ├── tsup.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json          # name: "react-kino", deps: @kino/core
│   │
│   └── cli/                      # @kino/cli — future CLI for scaffolding scroll pages
│       └── ...                   # (empty scaffold for now)
│
├── apps/
│   ├── docs/                     # Vite + React — THE marketing/demo site
│   │   ├── src/
│   │   │   ├── app.tsx           # Apple-style scroll showcase
│   │   │   ├── main.tsx
│   │   │   └── sections/         # each section demos a component
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json          # deps: react-kino (workspace:*)
│   │
│   └── playground/               # future: interactive component playground
│       └── ...
│
├── tooling/                      # shared dev configs (optional, clean)
│   ├── eslint/
│   │   └── base.js
│   ├── typescript/
│   │   └── base.json
│   └── tsup/
│       └── base.ts
│
└── .github/
    └── workflows/
        ├── ci.yml                # lint + test on PR
        └── publish.yml           # npm publish on release tag
```

### Why This Structure

- **`@kino/core`** — All scroll math, progress calculation, easing, and pinning logic is pure JS with zero framework deps. This keeps the React package lightweight and lets us reuse logic if we ever extract a headless layer.
- **`react-kino`** (packages/react) — The React wrapper. Imports `@kino/core` for the engine, exports React components and hooks. This is what users `npm install`.
- **`apps/docs`** — The marketing/docs site. Uses `workspace:*` to reference `react-kino` directly from source during dev — instant HMR, no build step needed.
- **`tooling/`** — Shared ESLint, TS, and tsup configs. Keeps individual package configs thin.
- **Future packages** could include: `@kino/cli` (scaffold a new scroll page from templates), `@kino/studio` (visual timeline editor), or `@kino/templates` (pre-built full-page scroll experiences users can copy).

---

## Build & Tooling Setup

### Package Manager: pnpm
Turborepo works best with pnpm workspaces. Fast, disk-efficient, strict dependency resolution.

**pnpm-workspace.yaml:**
```yaml
packages:
  - "packages/*"
  - "apps/*"
  - "tooling/*"
```

### Turborepo Pipeline

**turbo.json:**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "persistent": true,
      "cache": false
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    }
  }
}
```

The `"dependsOn": ["^build"]` ensures `@kino/core` builds before `react-kino`, which builds before `apps/docs`. Turbo handles the graph automatically.

### Root package.json
```json
{
  "name": "kino",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^2",
    "typescript": "^5"
  },
  "packageManager": "pnpm@9.15.0"
}
```

### @kino/core package.json
```json
{
  "name": "@kino/core",
  "version": "0.1.0",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "clean": "rm -rf dist"
  },
  "devDependencies": {
    "tsup": "^8",
    "typescript": "^5"
  }
}
```

### react-kino (packages/react) package.json
```json
{
  "name": "react-kino",
  "version": "0.1.0",
  "description": "Cinematic scroll-driven storytelling components for React",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@kino/core": "workspace:*"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "peerDependenciesMeta": {
    "framer-motion": {
      "optional": true
    }
  },
  "devDependencies": {
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "react": "^19",
    "react-dom": "^19",
    "tsup": "^8",
    "typescript": "^5"
  },
  "keywords": [
    "react", "scroll", "animation", "storytelling", "parallax",
    "scroll-driven", "apple", "cinematic", "pinned", "sticky"
  ],
  "license": "MIT"
}
```

### tsup config (shared pattern for both packages)

**packages/core/tsup.config.ts:**
```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  minify: true,
});
```

**packages/react/tsup.config.ts:**
```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  external: ["react", "react-dom", "framer-motion"],
  minify: true,
});
```

### Shared TypeScript Config

**tsconfig.base.json (root):**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  }
}
```

Each package extends it:
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

### Docs Site: Vite + React
```bash
cd apps/docs && pnpm create vite . --template react-ts
```

**apps/docs/vite.config.ts:**
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // In a Turborepo with pnpm workspaces, react-kino resolves
  // automatically via workspace:* — no alias needed.
});
```

**apps/docs/package.json:**
```json
{
  "name": "@kino/docs",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19",
    "react-dom": "^19",
    "react-kino": "workspace:*"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4",
    "vite": "^6"
  }
}
```

### Testing: Vitest
```bash
pnpm add -D vitest @testing-library/react jsdom --filter @kino/core --filter react-kino
```

Unit test scroll math in `@kino/core`. Integration test React components in `packages/react` with mocked IntersectionObserver and scroll events.

---

## Development Workflow

### Initial Setup
```bash
git clone <repo>
cd kino
pnpm install
pnpm build          # builds @kino/core → react-kino → docs (in dependency order)
```

### Daily Dev
```bash
pnpm dev            # turbo runs all dev scripts in parallel:
                    #   - @kino/core: tsup --watch
                    #   - react-kino: tsup --watch
                    #   - docs: vite dev server
```

Edit components in `packages/react/src/`, scroll engine in `packages/core/src/`, see changes live in the docs site at `localhost:5173`. Turbo handles the watch cascade automatically.

### Adding a New Package (e.g. templates)
```bash
mkdir packages/templates
# scaffold package.json with @kino/templates
# add pre-built full-page scroll experiences as exportable components
# these import from react-kino (workspace:*)
```

### Publishing
Packages are published independently. Use changesets for versioning:
```bash
pnpm add -D -w @changesets/cli
pnpm changeset init
pnpm changeset       # create a changeset
pnpm changeset version  # bump versions
pnpm publish -r      # publish all changed packages
```

---

## MVP Milestones

### Week 1: Foundation + Core Engine
- [ ] Turborepo scaffolding (pnpm workspaces, turbo.json, shared tsconfigs)
- [ ] `@kino/core`: scroll-tracker (scroll position + progress calculation)
- [ ] `@kino/core`: pin-engine (sticky + spacer pattern logic)
- [ ] `@kino/core`: easing, lerp, clamp utils
- [ ] `react-kino`: `<Kino>` provider
- [ ] `react-kino`: `<Scene>` with pinning (consumes core pin-engine)
- [ ] `react-kino`: `useScrollProgress` hook
- [ ] Basic docs site shell (Vite, working import from workspace)

### Week 2: Core Components
- [ ] `react-kino`: `<Reveal>` with 5 animation presets (fade, fade-up, fade-down, scale, blur)
- [ ] `react-kino`: `<Parallax>` with speed multiplier
- [ ] `react-kino`: `<Counter>` with easing and formatting
- [ ] `react-kino`: `<CompareSlider>` (drag + optional scroll-driven)
- [ ] Unit tests for `@kino/core` scroll math

### Week 3: Polish & Ship
- [ ] `react-kino`: `<HorizontalScroll>` section
- [ ] `react-kino`: `<Progress>` indicator
- [ ] Docs site: Apple-style scroll experience showcasing all components
- [ ] README with examples, API docs, GIF demos
- [ ] Changesets setup for versioning
- [ ] Publish `@kino/core` + `react-kino` to npm
- [ ] Post to Reddit (r/reactjs, r/webdev), Hacker News, X/Twitter

### Post-MVP
- [ ] shadcn registry support (copy-paste install)
- [ ] More animation presets
- [ ] `<VideoScroll>` — scrub through a video on scroll (like AirPods Pro page)
- [ ] `<TextReveal>` — word-by-word text reveal on scroll
- [ ] `@kino/templates` — pre-built full-page scroll experiences (product launch, case study, portfolio)
- [ ] `@kino/cli` — `npx kino init` scaffolds a scroll page from a template
- [ ] Performance profiling & optimization
- [ ] Interactive playground app (`apps/playground`)
- [ ] `@kino/studio` — visual timeline editor for designing scroll sequences (long-term)

---

## Key Design Decisions

1. **Kebab-case file names everywhere** — All component files, hooks, and utilities use kebab-case (`scene.tsx`, `compare-slider.tsx`, `use-scroll-progress.ts`). No PascalCase or camelCase file names. Exports are still PascalCase for components (`<Scene>`) and camelCase for hooks (`useScrollProgress`).
2. **Zero required dependencies** — only React as peer dep. Framer Motion is optional enhancement.
2. **Progressive enhancement** — CSS Scroll Timeline where supported, JS fallback everywhere else.
3. **Render prop + declarative** — `<Scene>` works both as render prop (for custom progress-driven UI) and as a container with declarative sub-components (`<Reveal>`, `<Counter>`, etc.)
4. **SSR safe** — everything renders on server, scroll logic activates on client.
5. **Small bundle** — target under 8KB gzipped for core components.
6. **Accessible** — respect `prefers-reduced-motion`. When reduced motion is preferred, content renders immediately without scroll-driven animation.

---

## Naming & Branding

**react-kino** — "Kino" means cinema in many languages. Evokes the cinematic, storytelling nature of the library. Short, memorable, available on npm.

Tagline: *"Cinematic scroll experiences for React."*

---

## Competitive Landscape

| Tool | What It Does | Gap |
|------|-------------|-----|
| GSAP ScrollTrigger | Full scroll animation engine | Not React-native, heavy (45KB), paid license for some uses |
| Framer Motion | React animation library | No scroll pinning, no scene orchestration |
| React Bits | Animated React components | Static components, no scroll-driven storytelling |
| Magic UI | Landing page animation components | Same — viewport animations, no scroll scenes |
| Locomotive Scroll | Smooth scroll + parallax | jQuery-era API, not React, unmaintained |
| react-scroll-parallax | Basic parallax only | No pinning, no scenes, limited |

react-kino is the only library that combines **pinned scroll sections + declarative scene orchestration + React-native API + zero dependencies**.

---

## Launch Strategy

1. **The docs site IS the marketing** — build an Apple-quality scroll experience that showcases every component. This is what people will share.
2. **GIF/video demos** — record short clips of each component in action for README and social posts.
3. **Reddit first** — r/reactjs (1.2M members), r/webdev (2.3M members). "I built an open-source library for Apple-style scroll experiences in React."
4. **Twitter/X** — short video demo, tag React influencers.
5. **Hacker News** — "Show HN: react-kino — Cinematic scroll storytelling for React"
6. **shadcn registry** — get listed so devs can `npx shadcn add` components directly.