import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import summarizeReviews from "./api/summarize-reviews.js";

const createReviewSummaryApi = (env) => ({
  name: "review-summary-api",
  configureServer(server) {
    if (env.LLM_KEY && !process.env.LLM_KEY) {
      process.env.LLM_KEY = env.LLM_KEY;
    }

    server.middlewares.use(
      "/api/summarize-reviews",
      async (request, response) => {
        const chunks = [];

        request.on("data", (chunk) => chunks.push(chunk));
        request.on("end", async () => {
          let body = {};

          try {
            body = chunks.length
              ? JSON.parse(Buffer.concat(chunks).toString())
              : {};
          } catch {
            response.statusCode = 400;
            response.setHeader("Content-Type", "application/json");
            response.end(
              JSON.stringify({ error: "Request body must be valid JSON" }),
            );
            return;
          }

          request.body = body;
          await summarizeReviews(request, {
            status(statusCode) {
              response.statusCode = statusCode;
              return this;
            },
            setHeader(name, value) {
              response.setHeader(name, value);
            },
            json(payload) {
              response.setHeader("Content-Type", "application/json");
              response.end(JSON.stringify(payload));
            },
          });
        });
      },
    );
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), createReviewSummaryApi(env)],
  };
});
