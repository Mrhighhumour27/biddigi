import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { act, createElement } from "react";
import { MediaHero } from "../dist-ssr/entry-server.js";

// This exercises the real React effect/event lifecycle with controlled platform
// signals. It does not render pixels or replace the pending Chrome visual QA.
test("hero lifecycle freezes on pause/offscreen/hidden, replays, and respects motion preference", async () => {
  const dom = new JSDOM(
    '<!doctype html><html><body><div id="root"></div></body></html>',
    { url: "http://localhost/", pretendToBeVisual: true },
  );
  const previous = new Map();
  function install(key, value) {
    previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, {
      configurable: true,
      writable: true,
      value,
    });
  }
  install("window", dom.window);
  install("document", dom.window.document);
  install("navigator", dom.window.navigator);
  install("IS_REACT_ACT_ENVIRONMENT", true);
  let hidden = false;
  Object.defineProperty(dom.window.document, "hidden", {
    configurable: true,
    get: () => hidden,
  });
  const mediaListeners = new Set();
  const motion = {
    matches: false,
    addEventListener: (_type, callback) => mediaListeners.add(callback),
    removeEventListener: (_type, callback) => mediaListeners.delete(callback),
  };
  dom.window.matchMedia = () => motion;
  const decoded = [];
  dom.window.HTMLImageElement.prototype.decode = function () {
    decoded.push(this.getAttribute("loading"));
    return this.getAttribute("loading") === "eager"
      ? Promise.resolve()
      : new Promise(() => {});
  };
  const observers = [];
  class Observer {
    constructor(callback) {
      this.callback = callback;
      this.disconnected = false;
      observers.push(this);
    }
    observe(element) {
      this.element = element;
    }
    disconnect() {
      this.disconnected = true;
    }
    emit(ratio) {
      this.callback([
        {
          isIntersecting: ratio > 0,
          intersectionRatio: ratio,
          target: this.element,
        },
      ]);
    }
  }
  install("IntersectionObserver", Observer);
  let sequence = 0;
  let timestamp = 0;
  const frames = new Map();
  install("requestAnimationFrame", (callback) => {
    const id = ++sequence;
    frames.set(id, callback);
    return id;
  });
  install("cancelAnimationFrame", (id) => frames.delete(id));
  const { createRoot } = await import("react-dom/client");
  const root = createRoot(dom.window.document.getElementById("root"));
  const hero = () => dom.window.document.querySelector(".media-installation");
  const button = (label) =>
    dom.window.document.querySelector(`button[aria-label="${label}"]`);
  async function click(label) {
    await act(async () =>
      button(label).dispatchEvent(
        new dom.window.MouseEvent("click", { bubbles: true }),
      ),
    );
  }
  async function step(count) {
    for (let i = 0; i < count; i++) {
      timestamp += 100;
      const pending = [...frames.values()];
      frames.clear();
      await act(async () => pending.forEach((callback) => callback(timestamp)));
    }
  }
  const observer = () => observers.findLast((item) => !item.disconnected);
  try {
    await act(async () => root.render(createElement(MediaHero)));
    assert.deepEqual(
      decoded,
      ["eager", "eager"],
      "hidden secondary images must not gate readiness",
    );
    assert.ok(
      hero().querySelector(".installation-ad img"),
      "complete ad artwork exists before playback",
    );
    assert.ok(hero().textContent.includes("Publisher content"));
    assert.equal(hero().dataset.running, "false");
    await act(async () => observer().emit(0.1));
    assert.equal(
      hero().dataset.running,
      "false",
      "less than25% visibility must not start",
    );
    await act(async () => observer().emit(0.9));
    assert.equal(hero().dataset.running, "true");
    await step(13);
    assert.equal(hero().dataset.phase, "1");
    await click("Pause hero animation");
    const pausedPhase = hero().dataset.phase;
    await step(60);
    assert.equal(hero().dataset.phase, pausedPhase);
    assert.equal(hero().dataset.complete, "false");
    assert.equal(
      frames.size,
      0,
      "paused hero must not keep a frame callback alive",
    );
    await click("Resume hero animation");
    await step(12);
    assert.equal(hero().dataset.phase, "2");
    await act(async () => observer().emit(0));
    const offscreenPhase = hero().dataset.phase;
    await step(40);
    assert.equal(hero().dataset.phase, offscreenPhase);
    assert.equal(hero().dataset.running, "false");
    await act(async () => observer().emit(0.9));
    await step(4);
    await act(async () => {
      hidden = true;
      dom.window.document.dispatchEvent(
        new dom.window.Event("visibilitychange"),
      );
    });
    const hiddenPhase = hero().dataset.phase;
    await step(40);
    assert.equal(hero().dataset.phase, hiddenPhase);
    assert.equal(hero().dataset.complete, "false");
    assert.equal(frames.size, 0);
    await act(async () => {
      hidden = false;
      dom.window.document.dispatchEvent(
        new dom.window.Event("visibilitychange"),
      );
    });
    await step(24);
    assert.equal(hero().dataset.complete, "true");
    assert.equal(hero().dataset.phase, "3");
    assert.equal(button("Pause hero animation").disabled, true);
    await click("Replay hero animation");
    assert.equal(hero().dataset.phase, "0");
    assert.equal(hero().dataset.complete, "false");
    assert.equal(hero().dataset.running, "true");
    await step(4);
    await act(async () => {
      motion.matches = true;
      mediaListeners.forEach((callback) => callback());
    });
    assert.equal(hero().dataset.complete, "true");
    assert.equal(hero().dataset.phase, "3");
    assert.equal(hero().dataset.running, "false");
    assert.equal(button("Replay hero animation").disabled, true);
    assert.equal(frames.size, 0);
    await act(async () => {
      motion.matches = false;
      mediaListeners.forEach((callback) => callback());
    });
    assert.equal(
      hero().dataset.complete,
      "true",
      "changing preference back must not unexpectedly autoplay",
    );
    await click("Replay hero animation");
    assert.equal(hero().dataset.running, "true");
  } finally {
    await act(async () => root.unmount());
    assert.equal(frames.size, 0, "unmount cancels the live frame");
    assert.equal(
      mediaListeners.size,
      0,
      "unmount removes preference listeners",
    );
    assert.ok(observers.every((item) => item.disconnected));
    dom.window.close();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
