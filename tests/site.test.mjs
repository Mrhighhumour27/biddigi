import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { render, routes } from "../dist-ssr/entry-server.js";
import { revenue } from "../src/redesign/revenue.ts";
import { normalizePath } from "../src/redesign/routes.ts";
import { JSDOM } from "jsdom";

test("all thirteen routes contain substantive HTML and unique primary headings", async () => {
  assert.equal(routes.length, 13);
  const headings = new Set();
  for (const route of routes) {
    const html = render(route.path);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, route.path);
    const heading = html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1];
    assert.ok(!headings.has(heading), route.path);
    headings.add(heading);
    const mainText =
      html.match(/<main[^>]*>(.*?)<\/main>/s)?.[1].replace(/<[^>]+>/g, "") ??
      "";
    assert.ok(
      mainText.length > 300,
      `Expected real page content for ${route.path}`,
    );
    const file = await readFile(
      new URL(
        `../dist${route.path === "/" ? "" : route.path}/index.html`,
        import.meta.url,
      ),
      "utf8",
    );
    assert.ok(file.includes('rel="canonical"'), route.path);
    assert.ok(file.includes('property="og:title"'), route.path);
    assert.ok(file.includes(heading), route.path);
    assert.ok(
      !file.includes("mrhighhumour@gmail.com"),
      "recipient must remain private",
    );
    const document = new JSDOM(file).window.document;
    for (
      let element = document.querySelector("h1");
      element;
      element = element.parentElement
    ) {
      assert.ok(
        !element.hidden && element.getAttribute("aria-hidden") !== "true",
        `primary content hidden: ${route.path}`,
      );
      assert.notEqual(
        element.style.opacity,
        "0",
        `primary content transparent: ${route.path}`,
      );
    }
  }
});

test("static markup preserves explanatory actors, sample labels and no fake receipt", () => {
  const html = render("/");
  assert.match(html, /Biddigi connects your ad space with buyers/);
  assert.match(html, /Publisher content/);
  assert.match(html, /ELIGIBLE DEMAND \/ ILLUSTRATIVE/);
  assert.match(render("/publishers"), /Configured auction selects/);
  assert.match(render("/publishers"), /not a live auction/);
  assert.ok(!html.includes("38.4%"));
  assert.ok(!html.includes("12 business hours"));
  assert.ok(!html.includes("Request Received!"));
  assert.match(render("/missing"), /404/);
});

test("every internal navigation and fragment target resolves without duplicate page ids", () => {
  const pages = new Map(
    routes.map((route) => [
      route.path,
      new JSDOM(render(route.path)).window.document,
    ]),
  );
  for (const [path, document] of pages) {
    const ids = [...document.querySelectorAll("[id]")].map(
      (element) => element.id,
    );
    assert.equal(new Set(ids).size, ids.length, `Duplicate IDs on ${path}`);
    for (const anchor of document.querySelectorAll("a[href]")) {
      const url = new URL(
        anchor.getAttribute("href"),
        `https://biddigi.io${path}`,
      );
      if (url.origin !== "https://biddigi.io") continue;
      const target = pages.get(normalizePath(url.pathname));
      assert.ok(target, `${path}: unresolved route ${url.pathname}`);
      if (url.hash)
        assert.ok(
          target.getElementById(decodeURIComponent(url.hash.slice(1))),
          `${path}: unresolved fragment ${url.pathname}${url.hash}`,
        );
    }
  }
});

test("revenue arithmetic handles zero, decimals, bounds and invalid values", () => {
  assert.equal(revenue("100000", "2.5"), 250);
  assert.equal(revenue("0", "2.5"), 0);
  assert.equal(revenue("1000", "0"), 0);
  assert.equal(revenue("1000", "2.75"), 2.75);
  for (const [count, rate] of [
    ["", "1"],
    ["100", ""],
    ["-1", "1"],
    ["1.5", "1"],
    ["NaN", "1"],
    ["1", "Infinity"],
    ["1", "-1"],
    ["1000000000001", "1"],
    ["100", "10001"],
  ])
    assert.equal(revenue(count, rate), null);
});

test("direct index documents use the same route as their static HTML", () => {
  assert.equal(normalizePath("/publishers/index.html"), "/publishers");
  assert.equal(normalizePath("/index.html"), "/");
  assert.equal(normalizePath("/jiohotstar-ads/"), "/jiohotstar-ads");
});
