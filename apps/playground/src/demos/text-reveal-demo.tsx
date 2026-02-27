import { useState } from "react";
import { TextReveal } from "react-kino";
import { SelectControl } from "../controls/select-control";
import { SliderControl } from "../controls/slider-control";

const MODE_OPTIONS = [
  { label: "Word", value: "word" },
  { label: "Char", value: "char" },
  { label: "Line", value: "line" },
];

const SAMPLE_TEXT =
  "Scroll-driven storytelling lets you craft immersive, cinematic web experiences. Every scroll tick reveals a new piece of the narrative, guiding the user through your content like frames in a film.";

export function TextRevealDemo() {
  const [mode, setMode] = useState("word");
  const [at, setAt] = useState(0);
  const [span, setSpan] = useState(0.8);
  const [progress, setProgress] = useState(0.5);

  const code = `<TextReveal\n  mode="${mode}"\n  at={${at}}\n  span={${span}}\n  progress={${progress}}\n>\n  ${SAMPLE_TEXT}\n</TextReveal>`;

  return {
    controls: (
      <>
        <SelectControl
          label="Mode"
          value={mode}
          options={MODE_OPTIONS}
          onChange={setMode}
        />
        <SliderControl
          label="at"
          value={at}
          min={0}
          max={1}
          step={0.05}
          onChange={setAt}
        />
        <SliderControl
          label="span"
          value={span}
          min={0.05}
          max={1}
          step={0.05}
          onChange={setSpan}
        />
        <SliderControl
          label="Progress"
          value={progress}
          min={0}
          max={1}
          step={0.01}
          onChange={setProgress}
        />
      </>
    ),
    preview: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: "60vh",
          padding: 40,
        }}
      >
        <TextReveal
          mode={mode as "word" | "char" | "line"}
          at={at}
          span={span}
          progress={progress}
        >
          {SAMPLE_TEXT}
        </TextReveal>
      </div>
    ),
    code,
  };
}
