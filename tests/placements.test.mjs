import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import sharp from 'sharp';
import { JSDOM } from 'jsdom';
import { placementExamples, render } from '../dist-ssr/entry-server.js';

test('publisher references are complete and all original media previews resolve', async () => {
  assert.equal(Object.keys(placementExamples).length, 5);
  for (const [platform, examples] of Object.entries(placementExamples)) {
    assert.ok(examples.length);
    for (const example of examples) {
      assert.equal(example.platformId, platform);
      for (const key of ['publisher','sourcePage','originalMedia','retrieved','limitation','format','description']) assert.ok(example[key], platform + key);
      assert.ok(new URL(example.sourcePage).protocol === 'https:');
      assert.ok((await stat(new URL('../public' + example.poster, import.meta.url))).size > 500);
      const meta = await sharp(await readFile(new URL('../public' + example.poster, import.meta.url))).metadata();
      assert.ok(meta.width && meta.height);
      if (example.video) assert.ok((await stat(new URL('../public' + example.video, import.meta.url))).size > 1000);
    }
  }
});

test('each service page uses original galleries and no generic platform scene', () => {
  for (const slug of ['jiohotstar','prime-video','sonyliv','youtube','zee5']) {
    const doc = new JSDOM(render('/' + slug + '-ads')).window.document;
    assert.equal(doc.querySelectorAll('.placement-gallery').length, 1);
    assert.equal(doc.querySelectorAll('.platform-hero .service-artwork,.platform-hero img[src^="/images/v3/"]').length, 0);
    assert.equal(doc.querySelectorAll('video').length, 0, 'SSR should contain posters only');
    assert.ok(doc.querySelector('.brand-logo-platform'));
  }
  const ott = new JSDOM(render('/ott-ads')).window.document;
  assert.equal(ott.querySelectorAll('.platform-list .placement-poster').length, 5);
  assert.equal(ott.querySelectorAll('.platform-list img[src^="/images/v3/"]').length, 0);
  assert.match(ott.body.textContent, /campaign execution/);
  assert.doesNotMatch(ott.body.textContent, /official partner badge/i);
});
