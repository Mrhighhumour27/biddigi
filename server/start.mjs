import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createEnquiryHandler } from "./enquiries.mjs";
import { createYieldCopilotHandler } from "./yield-copilot.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../dist");
// This standalone entry is a production server; Vite mounts the handler separately for development.
process.env.NODE_ENV ||= "production";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
const enquiryHandler = createEnquiryHandler();
const yieldCopilotHandler = createYieldCopilotHandler();
const server = createServer(async (req, res) => {
  try {
    if (await enquiryHandler(req, res)) return;
    if (await yieldCopilotHandler(req, res)) return;
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405, { Allow: "GET, HEAD" });
      res.end();
      return;
    }
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
    } catch {
      res.writeHead(400);
      res.end("Bad request");
      return;
    }
    let target = resolve(root, `.${pathname}`);
    if (target !== root && !target.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    let status = 200;
    try {
      if ((await stat(target)).isDirectory())
        target = resolve(target, "index.html");
      await stat(target);
    } catch {
      status = 404;
      target = resolve(root, "404.html");
    }
    let bytes;
    try {
      bytes = await readFile(target);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page not found");
      return;
    }
    res.writeHead(status, {
      "Content-Type": types[extname(target)] || "application/octet-stream",
      "Content-Length": bytes.length,
      "Cache-Control": target.includes(`${sep}assets${sep}`)
        ? "public, max-age=31536000, immutable"
        : "no-cache",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    res.end(req.method === "HEAD" ? undefined : bytes);
  } catch {
    if (!res.headersSent) res.writeHead(500);
    res.end("Unable to serve this request.");
  }
});
server.requestTimeout = 30000;
server.headersTimeout = 15000;
server.listen(
  Number(process.env.PORT || 4173),
  process.env.HOST || "127.0.0.1",
  () =>
    console.log(`Biddigi server listening on port ${process.env.PORT || 4173}`),
);
