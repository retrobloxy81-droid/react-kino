# react-kino

**Cinematic scroll-driven storytelling components for React.**

[![npm version](https://img.shields.io/npm/v/react-kino.svg)](https://www.npmjs.com/package/react-kino)
[![license](https://img.shields.io/npm/l/react-kino.svg)](https://github.com/bilaltahir/react-kino/blob/main/LICENSE)

Build Apple-style scroll experiences with declarative React components. Pin sections, animate on scroll progress, reveal elements, and orchestrate cinematic sequences — all with zero runtime dependencies.

## Install

```bash
npm install react-kino
```

## Quick Start

```tsx
import { Kino, Scene, Reveal } from "react-kino";

function App() {
  return (
    <Kino>
      <Scene duration="200vh">
        {(progress) => (
          <div style={{ opacity: progress }}>
            <h1>Welcome</h1>
          </div>
        )}
      </Scene>

      <Reveal animation="fade-up">
        <p>This content fades in as you scroll.</p>
      </Reveal>
    </Kino>
  );
}
```

## Components

| Component | Description |
| --- | --- |
| `<Kino>` | Root provider — wraps your scroll experience |
| `<Scene>` | Pinned scroll section with progress-driven children |
| `<Reveal>` | Animate-in when element enters viewport |
| `<Parallax>` | Depth-based parallax layers |
| `<Sequence>` | Orchestrate ordered child animations |
| `<StickyText>` | Pin text while background scrolls |
| `<CompareSlider>` | Before/after comparison driven by scroll |
| `<Counter>` | Animate numbers on scroll |

## Documentation

Full docs site coming soon.

## License

MIT
