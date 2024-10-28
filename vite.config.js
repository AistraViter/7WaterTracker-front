import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    target: "esnext", // Підтримка новіших функцій, включаючи top-level await
  },
  plugins: [react()],
});
