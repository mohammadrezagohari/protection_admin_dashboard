import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    // server: {
    //     proxy: {
    //         '/api':'https://product.gandom.link/'
    //     }
    // },
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
