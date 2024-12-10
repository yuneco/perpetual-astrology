import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import KumaUI from "@kuma-ui/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), KumaUI()],
});
