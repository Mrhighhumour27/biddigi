import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { act, createElement } from 'react';
import { CampaignAtlas } from '../dist-ssr/entry-server.js';

test('platform galleries preserve media, keyboard focus, failure recovery and enquiry context', async () => {
  const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
  const prior = new Map();
  for (const [key, value] of Object.entries({ window: dom.window, document: dom.window.document, navigator: dom.window.navigator, IS_REACT_ACT_ENVIRONMENT: true })) {
    prior.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  const { createRoot } = await import('react-dom/client');
  const root = createRoot(document.getElementById('root'));
  const tabs = () => [...document.querySelectorAll('.atlas-selector [role=tab]')];
  const image = () => document.querySelector('.placement-media img');
  const click = async node => act(async () => node.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true })));
  try {
    await act(async () => root.render(createElement(CampaignAtlas)));
    assert.match(image().getAttribute('src'), /jiohotstar-pre-roll/);
    assert.equal(document.querySelector('video'), null, 'a video is never loaded before a play request');
    assert.equal(image().getAttribute('loading'), 'lazy');
    await click(document.querySelector('.placement-gallery-tabs button:nth-child(2)'));
    assert.match(image().getAttribute('src'), /mid-roll/);
    const old = image();
    await click(tabs()[1]);
    assert.match(image().getAttribute('src'), /prime-interactive/);
    await act(async () => old.dispatchEvent(new dom.window.Event('error')));
    assert.equal(document.querySelector('[role=status]'), null, 'an abandoned platform cannot fail the current media');
    await click(tabs()[4]);
    assert.match(image().getAttribute('src'), /zee5-formats-2022/);
    assert.match(document.querySelector('.placement-limitation').textContent, /Historical interface/);
    assert.match(document.querySelector('.atlas-enquire').getAttribute('href'), /platform=zee5/);
    await act(async () => image().dispatchEvent(new dom.window.Event('error')));
    assert.match(document.querySelector('[role=status]').textContent, /could not be loaded/);
    assert.equal(image(), null);
    await click(document.querySelector('.placement-media-error button'));
    assert.ok(image());
    assert.equal(document.activeElement, document.querySelector('.placement-media'));
    await act(async () => tabs()[4].dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Home', bubbles: true })));
    assert.equal(document.activeElement, tabs()[0]);
    assert.match(image().getAttribute('src'), /jiohotstar-pre-roll/);
    await click(document.querySelector('.placement-play'));
    assert.match(document.querySelector('video').getAttribute('src'), /pre-roll.mp4/);
    assert.equal(document.querySelector('video').hasAttribute('controls'), true);
    await click(tabs()[3]);
    assert.equal(document.querySelector('video'), null, 'switching platform removes the old player');
    const formats = [...document.querySelectorAll('.placement-gallery-tabs button')];
    await act(async () => formats[0].dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'End', bubbles: true })));
    assert.equal(document.activeElement, formats[2]);
    assert.match(image().getAttribute('src'), /youtube-shorts/);
    assert.match(document.querySelector('.atlas-enquire').getAttribute('href'), /platform=youtube/);
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
    for (const [key, value] of prior) { if (value) Object.defineProperty(globalThis, key, value); else delete globalThis[key]; }
  }
});
