import { Composition } from "remotion";
import { LaunchVideo } from "./launch/launch-video";
import { TextRevealDemo } from "./demos/text-reveal";
import { ParallaxDemo } from "./demos/parallax";
import { CompareDemo } from "./demos/compare-slider";
import { HorizontalScrollDemo } from "./demos/horizontal-scroll";
import { ProgressDemo } from "./demos/progress";
import { CounterDemo } from "./demos/counter";
import { SceneDemo } from "./demos/scene";
import { RevealDemo } from "./demos/reveal";
import { MarqueeDemo } from "./demos/marquee";
import { StickyHeaderDemo } from "./demos/sticky-header";
import { VideoScrollDemo } from "./demos/video-scroll";
import { SocialHighlight } from "./social/highlight-reel";
import { VsGSAP } from "./comparison/vs-gsap";
import {
  FPS,
  WIDTH,
  HEIGHT,
  SCENES,
  DEMO_DURATION,
  SOCIAL_WIDTH,
  SOCIAL_HEIGHT,
  SOCIAL_DURATION,
  COMPARISON_DURATION,
} from "./theme";

const TOTAL =
  SCENES.INTRO +
  SCENES.TAGLINE +
  SCENES.TEXT_REVEAL +
  SCENES.PARALLAX +
  SCENES.COMPARE +
  SCENES.HORIZONTAL_SCROLL +
  SCENES.PROGRESS +
  SCENES.COUNTER +
  SCENES.GRID +
  SCENES.STATS +
  SCENES.OUTRO -
  10 * SCENES.TRANSITION;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── Launch video ── */}
      <Composition
        id="LaunchVideo"
        component={LaunchVideo}
        durationInFrames={TOTAL}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* ── Individual demo clips ── */}
      <Composition
        id="Demo-TextReveal"
        component={TextRevealDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo-Parallax"
        component={ParallaxDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo-CompareSlider"
        component={CompareDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo-HorizontalScroll"
        component={HorizontalScrollDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo-Progress"
        component={ProgressDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo-Counter"
        component={CounterDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo-Scene"
        component={SceneDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo-Reveal"
        component={RevealDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo-Marquee"
        component={MarqueeDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo-StickyHeader"
        component={StickyHeaderDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo-VideoScroll"
        component={VideoScrollDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* ── Social highlight reel (vertical) ── */}
      <Composition
        id="SocialHighlight"
        component={SocialHighlight}
        durationInFrames={SOCIAL_DURATION}
        fps={FPS}
        width={SOCIAL_WIDTH}
        height={SOCIAL_HEIGHT}
      />

      {/* ── Comparison video ── */}
      <Composition
        id="VsGSAP"
        component={VsGSAP}
        durationInFrames={COMPARISON_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
