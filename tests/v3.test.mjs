import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat, readdir } from "node:fs/promises";
import sharp from "sharp";
import { render, routes } from "../dist-ssr/entry-server.js";
import { gzipSync } from "node:zlib";

test("eight generated source assets have valid responsive AVIF and WebP variants", async () => {
  const manifest = JSON.parse(
    await readFile(
      new URL("../design/v3-assets.json", import.meta.url),
      "utf8",
    ),
  );
  assert.deepEqual(
    new Set(manifest.map((a) => a.id)),
    new Set([
      "product",
      "editorial",
      "app-editorial",
      "lifestyle",
      "entertainment",
      "ctv-room",
      "sports",
      "culture",
    ]),
  );
  for (const asset of manifest) {
    assert.equal(asset.variants.length, 4);
    assert.ok(
      (
        await stat(
          new URL(`../design/v3-originals/${asset.id}.png`, import.meta.url),
        )
      ).size > 1000,
    );
    for (const variant of asset.variants) {
      const path = new URL(`../public${variant.path}`, import.meta.url);
      const meta = await sharp(await readFile(path)).metadata();
      assert.equal(meta.width, variant.width, variant.path);
      assert.equal(meta.height, variant.height, variant.path);
      assert.ok((await stat(path)).size > 1000, variant.path);
    }
  }
  const heroAssets = manifest.filter((a) =>
    ["product", "editorial"].includes(a.id),
  );
  assert.ok(
    heroAssets.reduce(
      (sum, a) =>
        sum + a.variants.find((v) => v.path.endsWith("-1280.avif")).bytes,
      0,
    ) < 250000,
    "combined desktop critical image budget",
  );
  assert.ok(
    heroAssets.reduce(
      (sum, a) =>
        sum + a.variants.find((v) => v.path.endsWith("-640.avif")).bytes,
      0,
    ) < 140000,
    "combined mobile critical image budget",
  );
});

test("the first server-rendered hero has finished content, live labels and animation controls", () => {
  const html = render("/");
  const hero = html.slice(
    html.indexOf("signal-hero"),
    html.indexOf("property-bar"),
  );
  for (const marker of [
    "signal-publication",
    "signal-ad-plane",
    "Publisher content",
    "Ad placement",
    "TRAIL SUPPLY",
    "editorial-640",
    "product-640",
    "Pause impression sequence",
    "Replay impression sequence",
    "Impression sequence stages",
  ])
    assert.ok(hero.includes(marker), marker);
  assert.ok(
    hero.includes("ELIGIBLE DEMAND / ILLUSTRATIVE"),
    "the cutaway must distinguish fictional demand from live activity",
  );
  const adPlane = hero.slice(
    hero.indexOf('class="signal-ad-plane"'),
    hero.indexOf('class="signal-trace"'),
  );
  assert.ok(
    !adPlane.includes("opacity:0"),
    "finished ad is visible before animation",
  );
  assert.ok(!html.includes("landscape-hill"));
  assert.ok(html.indexOf("how-it-works") >= 0);
});

test("all prerendered image sources resolve and generated contexts differ across platform pages", async () => {
  for (const route of routes) {
    const html = render(route.path);
    const sources = [...html.matchAll(/\bsrc="(\/images\/v3\/[^"]+)"/g)].map(
      (m) => m[1],
    );
    for (const src of sources)
      assert.ok(
        (await stat(new URL(`../public${src}`, import.meta.url))).size > 0,
        route.path + src,
      );
    assert.ok(!html.includes("landscape-sun"));
  }
  assert.match(render("/jiohotstar-ads"), /sports-640/);
  assert.match(render("/zee5-ads"), /culture-640/);
  assert.match(render("/prime-video-ads"), /entertainment-640/);
  assert.match(render("/youtube-ads"), /app-editorial-640/);
});

test("typography and compressed client sizes stay within the delivery budget", async () => {
  for (const file of ["archivo-latin.woff2", "instrument-latin.woff2"])
    assert.ok(
      (await stat(new URL("../public/fonts/" + file, import.meta.url))).size >
        10000,
    );
  const files = await readdir(new URL("../dist/assets/", import.meta.url));
  const js = files.filter((f) => f.endsWith(".js"));
  const total = (
    await Promise.all(
      js.map(
        async (f) =>
          gzipSync(
            await readFile(new URL("../dist/assets/" + f, import.meta.url)),
          ).length,
      ),
    )
  ).reduce((a, b) => a + b, 0);
  assert.ok(total < 200000, `Initial compressed JS: ${total}`);
});
