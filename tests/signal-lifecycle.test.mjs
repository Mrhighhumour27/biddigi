import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { act, createElement } from "react";

// Real component + real Motion renderer, with controlled browser signals.
// This verifies lifecycle and generated style values, not pixels or frame pacing.
test("signal cutaway freezes, resumes from its actual pose, handles interruptions and reduced motion", async () => {
  const dom = new JSDOM('<!doctype html><div id="root"></div>', {
    url: "http://localhost/", pretendToBeVisual: true,
  });
  const previous = new Map();
  function install(key, value) {
    previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  for (const key of ["window", "document", "navigator", "HTMLElement", "Element", "SVGElement"])
    install(key, dom.window[key]);
  install("IS_REACT_ACT_ENVIRONMENT", true);
  install("getComputedStyle", dom.window.getComputedStyle.bind(dom.window));
  let hidden = false;
  Object.defineProperty(dom.window.document, "hidden", { configurable: true, get: () => hidden });
  const media = new Map();
  function query(text) {
    if (!media.has(text)) {
      const listeners = new Set();
      const legacy = new Set();
      media.set(text, {
        matches: false, listeners, legacy,
        addEventListener: (_type, fn) => listeners.add(fn),
        removeEventListener: (_type, fn) => listeners.delete(fn),
        addListener: (fn) => legacy.add(fn),
        removeListener: (fn) => legacy.delete(fn),
      });
    }
    return media.get(text);
  }
  install("matchMedia", query);
  dom.window.matchMedia = query;
  const decoded = [];
  dom.window.HTMLImageElement.prototype.decode = function () {
    decoded.push(this.getAttribute("loading"));
    return Promise.resolve();
  };
  const observers = [];
  class Observer {
    constructor(callback) { this.callback = callback; this.disconnected = false; observers.push(this); }
    observe(element) { this.element = element; }
    disconnect() { this.disconnected = true; }
    emit(ratio) { this.callback([{ isIntersecting: ratio > 0, intersectionRatio: ratio, target: this.element }]); }
  }
  install("IntersectionObserver", Observer);
  dom.window.IntersectionObserver = Observer;
  let sequence = 0;
  let timestamp = 0;
  const frames = new Map();
  const raf = (callback) => { const id = ++sequence; frames.set(id, callback); return id; };
  const caf = (id) => frames.delete(id);
  install("requestAnimationFrame", raf);
  install("cancelAnimationFrame", caf);
  dom.window.requestAnimationFrame = raf;
  dom.window.cancelAnimationFrame = caf;
  const { SignalHero } = await import("../dist-ssr/entry-server.js");
  const { createRoot } = await import("react-dom/client");
  const root = createRoot(dom.window.document.getElementById("root"));
  const hero = () => dom.window.document.querySelector(".signal-hero");
  const publication = () => dom.window.document.querySelector(".signal-publication");
  const pose = () => [publication().style.transform, dom.window.document.querySelector(".signal-ad-plane").style.transform];
  const button = (label) => dom.window.document.querySelector(`button[aria-label="${label}"]`);
  async function clickElement(element) {
    assert.ok(element, "requested control exists");
    await act(async () => element.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true })));
  }
  const click = (label) => clickElement(button(label));
  const stage = (index) => clickElement(dom.window.document.querySelectorAll(".signal-stage-buttons button")[index]);
  async function step(count) {
    for (let index = 0; index < count; index++) {
      timestamp += 16;
      const pending = [...frames.values()];
      frames.clear();
      await act(async () => pending.forEach((callback) => callback(timestamp)));
    }
  }
  const observer = () => observers.findLast((item) => !item.disconnected);
  const x = () => Number(publication().style.transform.match(/translateX\((-?[\d.]+)px\)/)?.[1] ?? 0);
  try {
    await act(async () => root.render(createElement(SignalHero)));
    assert.deepEqual(decoded, ["eager", "eager"]);
    assert.ok(dom.window.document.querySelector(".signal-ad-plane img"), "initial composition includes finished advertisement");
    assert.equal(hero().dataset.running, "false");
    assert.equal(observer().element.className, "signal-theatre", "visibility follows artwork, not the entire tall mobile section");
    await act(async () => observer().emit(0.9));
    await step(100);
    assert.equal(hero().dataset.stage, "1");
    assert.ok(pose().some((value) => value && value !== "none"), "real Motion renderer changes the cutaway transforms");
    await click("Pause impression sequence");
    await step(3);
    const frozen = pose();
    await step(80);
    assert.deepEqual(pose(), frozen, "paused transforms remain frozen");
    assert.equal(hero().dataset.running, "false");
    await click("Play impression sequence");
    await step(95);
    assert.equal(hero().dataset.stage, "2");
    await act(async () => observer().emit(0));
    await step(3);
    const offscreen = pose();
    await step(50);
    assert.deepEqual(pose(), offscreen, "offscreen artwork does not advance");
    await act(async () => observer().emit(0.9));
    await step(10);
    await act(async () => { hidden = true; dom.window.document.dispatchEvent(new dom.window.Event("visibilitychange")); });
    await step(3);
    const hiddenPose = pose();
    await step(50);
    assert.deepEqual(pose(), hiddenPose, "hidden document suspends the sequence");
    await act(async () => { hidden = false; dom.window.document.dispatchEvent(new dom.window.Event("visibilitychange")); });
    await step(250);
    assert.equal(hero().dataset.motion, "complete");
    await click("Replay impression sequence");
    await step(10);
    await stage(2);
    await step(9);
    const beforeResumeX = x();
    assert.ok(beforeResumeX < -1, "manual transition reaches a measurable intermediate cutaway pose");
    await click("Play impression sequence");
    await step(2);
    assert.ok(x() <= beforeResumeX + 0.5, "resume continues forward rather than jumping to the old autoplay clock");
    assert.notEqual(hero().dataset.stage, "0");
    await click("Replay impression sequence");
    await step(10);
    await stage(2);
    await step(9);
    await act(async () => observer().emit(0));
    await step(3);
    const manualFrozenX = x();
    await step(50);
    assert.equal(x(), manualFrozenX);
    await act(async () => observer().emit(0.9));
    await step(2);
    assert.ok(x() <= manualFrozenX + 0.5, "manual recovery does not rewind to its original starting pose");
    await stage(0);
    await step(3);
    await stage(1);
    await step(3);
    await stage(3);
    await step(60);
    assert.equal(hero().dataset.stage, "3", "latest rapid stage selection wins");
    assert.ok(pose().every((value) => !value.includes("NaN")));
    const reduced = query("(prefers-reduced-motion: reduce)");
    await act(async () => { reduced.matches = true; [...reduced.listeners, ...reduced.legacy].forEach((fn) => fn()); });
    await step(3);
    assert.equal(hero().dataset.motion, "reduced");
    assert.equal(hero().dataset.running, "false");
    assert.equal(button("Replay impression sequence").disabled, true);
    assert.equal(button("Play impression sequence"), null);
    await stage(1);
    await step(3);
    assert.equal(hero().dataset.stage, "1", "manual explanations remain available with reduced motion");
    const reducedPose = pose();
    await step(50);
    assert.deepEqual(pose(), reducedPose);
  } finally {
    await act(async () => root.unmount());
    await step(4);
    assert.ok(observers.every((item) => item.disconnected), "observers are disconnected on unmount");
    assert.ok([...media.values()].every((item) => item.listeners.size === 0), "component preference listeners are removed");
    assert.equal(frames.size, 0, "component and Motion frame work are drained after unmount");
    dom.window.close();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
