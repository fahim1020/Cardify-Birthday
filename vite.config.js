import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import env from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [env(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
