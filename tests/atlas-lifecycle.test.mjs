import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { act, createElement } from "react";
import { CampaignAtlas } from "../dist-ssr/entry-server.js";

// Real component events, with image completion/failure controlled at the DOM
// boundary. Pixel quality and network transfer remain separate browser checks.
test("atlas selected artwork loads eagerly, ignores stale events, and recovers from a failed context", async () => {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: "http://localhost/", pretendToBeVisual: true,
  });
  const prior = new Map();
  function install(key, value) {
    prior.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  install("window", dom.window);
  install("document", dom.window.document);
  install("navigator", dom.window.navigator);
  install("IS_REACT_ACT_ENVIRONMENT", true);
  const { createRoot } = await import("react-dom/client");
  const root = createRoot(dom.window.document.getElementById("root"));
  const doc = dom.window.document;
  const panel = () => doc.querySelector('[role="tabpanel"]');
  const current = () => doc.querySelector(".atlas-image-current img");
  const tab = (name) => [...doc.querySelectorAll('[role="tab"]')].find((node) => node.textContent.includes(name));
  async function click(element) {
    assert.ok(element, "requested control exists");
    await act(async () => element.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true })));
  }
  async function imageEvent(element, type) {
    await act(async () => element.dispatchEvent(new dom.window.Event(type, { bubbles: false })));
  }
  try {
    await act(async () => root.render(createElement(CampaignAtlas)));
    assert.equal(current().getAttribute("loading"), "lazy", "initial below-fold photograph may be deferred");
    await imageEvent(current(), "load");

    await click(tab("Prime Video"));
    const abandonedImage = current();
    assert.equal(abandonedImage.getAttribute("loading"), "eager", "a deliberately selected image must load even while clipped for its entrance");
    assert.equal(panel().getAttribute("aria-busy"), "true");
    await click(tab("ZEE5"));
    const failedImage = current();
    assert.match(failedImage.getAttribute("src"), /culture/);
    assert.equal(failedImage.getAttribute("loading"), "eager");

    await imageEvent(abandonedImage, "load");
    await imageEvent(abandonedImage, "error");
    assert.equal(panel().getAttribute("aria-busy"), "true", "an obsolete asset cannot finish or fail the current selection");
    assert.equal(doc.querySelector(".atlas-image-failure"), null);
    assert.equal(current(), failedImage);

    await imageEvent(failedImage, "error");
    assert.equal(panel().getAttribute("aria-busy"), "false", "a terminal asset failure ends the loading announcement");
    assert.equal(doc.querySelectorAll(".atlas-screen img").length, 0, "failure must remove the previous platform scene as well as the broken photograph");
    const failure = doc.querySelector('[role="status"]');
    assert.match(failure.textContent, /ZEE5/);
    assert.match(failure.textContent, /Illustration unavailable/);
    assert.match(failure.textContent, /food and culture photograph/);
    assert.equal(doc.querySelector(".atlas-screen-copy"), null, "a failed scene must not masquerade as rendered artwork");
    assert.match(doc.querySelector(".atlas-screen-bottom").textContent, /IMAGE UNAVAILABLE/);
    assert.match(doc.querySelector(".atlas-enquire").getAttribute("href"), /platform=zee5/);

    const retry = [...doc.querySelectorAll("button")].find((node) => node.textContent.includes("Retry ZEE5"));
    retry.focus();
    await click(retry);
    const retryImage = current();
    assert.notEqual(retryImage, failedImage, "retry creates a fresh image request");
    assert.equal(retryImage.getAttribute("loading"), "eager");
    assert.equal(doc.activeElement, tab("ZEE5"), "focus survives removal of the Retry control");
    assert.equal(panel().getAttribute("aria-busy"), "true");
    assert.equal(doc.querySelector(".atlas-image-previous"), null, "retry cannot bring back an unrelated old scene");

    await imageEvent(failedImage, "load");
    await imageEvent(failedImage, "error");
    assert.equal(panel().getAttribute("aria-busy"), "true", "late events from the failed request cannot complete its replacement");
    assert.equal(doc.querySelector(".atlas-image-failure"), null);
    await imageEvent(retryImage, "load");
    assert.equal(panel().getAttribute("aria-busy"), "false");
    assert.equal(doc.querySelector(".atlas-image-current").dataset.ready, "true");
    assert.match(doc.querySelector(".atlas-screen-copy").textContent, /Stories that/);
    assert.equal(doc.querySelector(".atlas-image-failure"), null);

    await act(async () => tab("ZEE5").dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Home", bubbles: true })));
    assert.equal(doc.activeElement, tab("JioHotstar"));
    assert.equal(tab("JioHotstar").getAttribute("aria-selected"), "true");
    assert.equal(current().getAttribute("loading"), "eager");
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
    for (const [key, descriptor] of prior) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
