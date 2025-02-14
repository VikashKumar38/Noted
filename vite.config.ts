import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://nowted-server.remotestate.com", // Replace with your API URL
  //       changeOrigin: true,
  //       secure: true, // Set to true if the API uses HTTPS
  //       rewrite: (path) => path.replace(/^\/api/, ""), // Optional rewrite
  //     },
  //   },
  // },
});
