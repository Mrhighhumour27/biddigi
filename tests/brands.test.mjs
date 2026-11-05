import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { render, routes } from '../dist-ssr/entry-server.js';

test('every brand image used by the thirteen pages resolves to a local image asset', async () => {
  const assets = new Set();
  for (const route of routes) {
    const doc = new JSDOM(render(route.path)).window.document;
    assert.equal(doc.body.textContent.includes('PROD-US-EAST'), false);
    const footerLogos = doc.querySelectorAll('.footer-platforms img');
    assert.equal(footerLogos.length, 5, route.path);
    for (const img of doc.querySelectorAll('img[src^="/brands/"]')) {
      assert.ok(img.hasAttribute('alt'));
      assert.ok(img.getAttribute('width') && img.getAttribute('height'));
      assets.add(img.getAttribute('src'));
    }
  }
  for (const asset of assets) {
    assert.ok((await stat(new URL(`../public${asset}`, import.meta.url))).size > 100, asset);
    const bytes = await readFile(new URL(`../public${asset}`, import.meta.url));
    assert.ok(asset.endsWith('.svg') ? bytes.toString().includes('<svg') : bytes[0] === 137 || bytes[0] === 255 || bytes.toString('ascii',0,4) === 'RIFF', asset);
  }
  assert.equal(assets.size, 10);
});

test('platform identities, early platform discovery and scenario disclosure survive prerendering', () => {
  for (const slug of ['/jiohotstar-ads','/sonyliv-ads','/prime-video-ads','/youtube-ads','/zee5-ads']) {
    const doc = new JSDOM(render(slug)).window.document;
    assert.ok(doc.querySelector('.platform-hero .brand-identity-hero img'), slug);
  }
  const ott = render('/ott-ads');
  assert.ok(ott.indexOf('id="platforms"') < ott.indexOf('id="ctv-cutaway-lab"'));
  assert.match(render('/publishers'), /Revenue scenario explorer/);
  assert.match(render('/publishers'), /Calculated locally|Figures are illustrative/);
  assert.doesNotMatch(render('/publishers'), /GCP Monthly Credit|38MS INFERENCE/);
});
