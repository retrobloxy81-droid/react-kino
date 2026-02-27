import { describe, it, expect } from "vitest";
import { lerp } from "../lerp";

describe("lerp", () => {
  it("returns a when t is 0", () => {
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(5, 20, 0)).toBe(5);
  });

  it("returns b when t is 1", () => {
    expect(lerp(0, 10, 1)).toBe(10);
    expect(lerp(5, 20, 1)).toBe(20);
  });

  it("returns midpoint when t is 0.5", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(-10, 10, 0.5)).toBe(0);
  });

  it("handles negative values", () => {
    expect(lerp(-10, -5, 0)).toBe(-10);
    expect(lerp(-10, -5, 1)).toBe(-5);
    expect(lerp(-10, -5, 0.5)).toBe(-7.5);
  });

  it("extrapolates when t is outside [0,1]", () => {
    // lerp does NOT clamp — it extrapolates
    expect(lerp(0, 10, 2)).toBe(20);
    expect(lerp(0, 10, -1)).toBe(-10);
  });

  it("returns a when a === b regardless of t", () => {
    expect(lerp(5, 5, 0)).toBe(5);
    expect(lerp(5, 5, 0.5)).toBe(5);
    expect(lerp(5, 5, 1)).toBe(5);
  });
});
