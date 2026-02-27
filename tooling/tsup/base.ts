import type { Options } from "tsup";

export const baseConfig: Options = {
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  minify: true,
};
