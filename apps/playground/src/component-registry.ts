import { SceneDemo } from "./demos/scene-demo";
import { RevealDemo } from "./demos/reveal-demo";
import { ParallaxDemo } from "./demos/parallax-demo";
import { CounterDemo } from "./demos/counter-demo";
import { CompareSliderDemo } from "./demos/compare-slider-demo";
import { ProgressDemo } from "./demos/progress-demo";
import { HorizontalScrollDemo } from "./demos/horizontal-scroll-demo";
import { TextRevealDemo } from "./demos/text-reveal-demo";
import { VideoScrollDemo } from "./demos/video-scroll-demo";

export const COMPONENTS = [
  { id: "scene", label: "Scene", component: SceneDemo },
  { id: "reveal", label: "Reveal", component: RevealDemo },
  { id: "parallax", label: "Parallax", component: ParallaxDemo },
  { id: "counter", label: "Counter", component: CounterDemo },
  { id: "compare-slider", label: "CompareSlider", component: CompareSliderDemo },
  { id: "progress", label: "Progress", component: ProgressDemo },
  { id: "horizontal-scroll", label: "HorizontalScroll", component: HorizontalScrollDemo },
  { id: "text-reveal", label: "TextReveal", component: TextRevealDemo },
  { id: "video-scroll", label: "VideoScroll", component: VideoScrollDemo },
] as const;
