import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsClient } from "../hooks/use-is-client";

describe("useIsClient", () => {
  it("returns true after mount (useEffect fires in test environment)", () => {
    const { result } = renderHook(() => useIsClient());
    // After renderHook completes, useEffect has fired, so isClient should be true
    expect(result.current).toBe(true);
  });
});
