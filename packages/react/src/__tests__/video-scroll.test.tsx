import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { VideoScroll } from "../video-scroll";

// Mock @kino/core to avoid real scroll tracking in tests
vi.mock("@kino/core", () => ({
  ScrollTracker: class {
    subscribe() {
      return () => {};
    }
    start() {}
    stop() {}
  },
  calcSceneProgress: vi.fn(() => 0),
  parseDuration: vi.fn(() => 2400),
}));

describe("VideoScroll", () => {
  it("renders the spacer div", () => {
    const { container } = render(
      <VideoScroll src="/test-video.mp4" />
    );
    const spacer = container.firstElementChild as HTMLElement;
    expect(spacer).toBeTruthy();
    expect(spacer.style.position).toBe("relative");
    expect(spacer.style.height).toBe("2400px");
  });

  it("renders a video element", () => {
    const { container } = render(
      <VideoScroll src="/test-video.mp4" />
    );
    const video = container.querySelector("video");
    expect(video).toBeTruthy();
    expect(video!.getAttribute("src")).toBe("/test-video.mp4");
    expect(video!.muted).toBe(true);
  });

  it("does not autoplay", () => {
    const { container } = render(
      <VideoScroll src="/test-video.mp4" />
    );
    const video = container.querySelector("video");
    expect(video).toBeTruthy();
    expect(video!.autoplay).toBe(false);
  });

  it("accepts poster prop", () => {
    const { container } = render(
      <VideoScroll src="/test-video.mp4" poster="/poster.jpg" />
    );
    const video = container.querySelector("video");
    expect(video).toBeTruthy();
    expect(video!.getAttribute("poster")).toBe("/poster.jpg");
  });

  it("renders overlay children", () => {
    const { container } = render(
      <VideoScroll src="/test-video.mp4">
        <div data-testid="overlay">Overlay content</div>
      </VideoScroll>
    );
    const overlay = container.querySelector("[data-testid='overlay']");
    expect(overlay).toBeTruthy();
    expect(overlay!.textContent).toBe("Overlay content");
  });

  it("applies custom className to the spacer", () => {
    const { container } = render(
      <VideoScroll src="/test-video.mp4" className="custom-video" />
    );
    const spacer = container.firstElementChild as HTMLElement;
    expect(spacer.className).toBe("custom-video");
  });
});
