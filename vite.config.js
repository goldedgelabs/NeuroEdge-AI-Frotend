import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",        // <-- REQUIRED for Vercel static hosting
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true, // <-- Correctly placed property
  },                   // <-- Correct closing of the 'build' object
});
