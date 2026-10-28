import { mkdir, readFile, writeFile } from "node:fs/promises";
import { render, routes } from "../dist-ssr/entry-server.js";
const base = new URL("../dist/", import.meta.url);
const template = await readFile(new URL("index.html", base), "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
function documentFor(path, title, description, missing = false) {
  const url = `https://biddigi.io${path === "/" ? "/" : path}`;
  return template
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)} | Biddigi</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?\s*>/,
      `<meta name="description" content="${escape(description)}" />`,
    )
    .replace(
      "</head>",
      `${missing ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`}\n<meta property="og:title" content="${escape(title)} | Biddigi" />\n<meta property="og:description" content="${escape(description)}" />\n<meta property="og:url" content="${url}" />\n<meta property="og:type" content="website" />\n<meta property="og:image" content="https://biddigi.io/brand-social.png" />\n<meta name="twitter:card" content="summary_large_image" />\n</head>`,
    );
}
for (const route of routes) {
  const folder = new URL(route.path === "/" ? "./" : `.${route.path}/`, base);
  await mkdir(folder, { recursive: true });
  await writeFile(
    new URL("index.html", folder),
    documentFor(route.path, route.title, route.description),
  );
}
await writeFile(
  new URL("404.html", base),
  documentFor("/404", "Page not found", "Find your way back to Biddigi.", true),
);
await writeFile(
  new URL("sitemap.xml", base),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>https://biddigi.io${route.path}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  new URL("robots.txt", base),
  "User-agent: *\nAllow: /\nSitemap: https://biddigi.io/sitemap.xml\n",
);
console.log(`Prerendered ${routes.length} pages, 404, sitemap and robots.`);
