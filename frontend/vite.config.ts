import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@shared": path.resolve(import.meta.dirname, "../common"),
    },
  },
  server: {
    allowedHosts: ["economy-static-ribcage.ngrok-free.dev"],
  },
});
