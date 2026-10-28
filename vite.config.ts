import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { createEnquiryHandler } from "./server/enquiries.mjs";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  define: { __BUILD_YEAR__: new Date().getUTCFullYear() },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "biddigi-enquiries",
      configureServer(server) {
        const handler = createEnquiryHandler({
          env: { ...loadEnv(mode, process.cwd(), ""), ...process.env },
        });
        server.middlewares.use((req, res, next) => {
          handler(req, res)
            .then((handled) => {
              if (!handled) next();
            })
            .catch(next);
        });
      },
    },
  ],
}));
