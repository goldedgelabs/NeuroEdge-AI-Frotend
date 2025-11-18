import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./", // required so that Vercel loads assets correctly
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),         // root alias
      "@components": path.resolve(__dirname, "./components"),
      "@pages": path.resolve(__dirname, "./pages"),
      "@utils": path.resolve(__dirname, "./utils"),
      "@context": path.resolve(__dirname, "./context"),
    },
  },

  server: {
    port: 5173,
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
