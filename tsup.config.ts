import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],

  format: ["esm"],

  target: "esnext",

  outDir: "dist",
  clean: true,

  bundle: true,
  splitting: false,

  sourcemap: true,

  dts: true, // optional but recommended for TypeScript projects

  banner: {
    js: `"use strict";`,
  },
});