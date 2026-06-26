// Example: build on-brand slides using only the deck-kit.
// Render: node example.mjs  (needs puppeteer; path below points at the repo's copy)
import { writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { createRequire } from 'module';
import { page, head, arrow, ghost, variants, TOKENS, LIME, CHARCOAL, PERI } from './deck-kit.mjs';
const require = createRequire(import.meta.url);
const puppeteer = require('../../ableneo event promo/slides/netousek/node_modules/puppeteer');
const dir = resolve('.');
const TAG = '[ ableneo deck-kit · example ]';

// Slide A — dark cover
const v = variants.dark;
const slideA = page(`<div class="slide" style="background:${v.bg};">${v.grid}<div class="topbar"></div>
  <div class="pad"><div style="z-index:3;">${v.logo}</div>
    <div class="fill">
      <div class="h-light" style="font-size:104px;color:${v.ink};">On-brand by</div>
      <div class="h-bold" style="font-size:104px;color:${LIME};">construction.</div>
      <div class="body" style="font-size:32px;color:${v.sub};margin-top:46px;max-width:840px;">Jeden kit: tokens, Ableneo font, logo, grid, farebné varianty.</div>
    </div>
  </div>
  <div class="foot"><span class="body" style="color:${v.sub};font-size:26px;">${TAG}</span>${arrow(v.arrowInk)}</div></div>`);

// Slide B — lime statement with periwinkle emphasis block
const l = variants.lime;
const slideB = page(`<div class="slide" style="background:${l.bg};">${ghost('A', 'rgba(29,32,36,0.07)', 'left:-30px;top:60px;')}
  <div class="pad">${head(TAG, 'A', CHARCOAL)}
    <div class="fill">
      <div class="h-light" style="font-size:92px;color:${CHARCOAL};">Komponenty, ktoré</div>
      <div style="align-self:flex-start;margin-top:16px;background:${PERI};padding:10px 26px;border-radius:8px;"><span class="h-bold" style="font-size:92px;color:${CHARCOAL};">sedia na brand.</span></div>
      <div class="body" style="font-size:33px;color:${l.sub};margin-top:44px;max-width:840px;">page(), head(), arrow(), ghost(), variants. Importni a skladaj.</div>
    </div>
  </div>
  <div class="foot">${l.logo}${arrow(l.arrowInk)}</div></div>`);

const browser = await puppeteer.launch({ headless: true });
const pg = await browser.newPage();
await pg.setViewport({ width: TOKENS.layout.width, height: TOKENS.layout.height, deviceScaleFactor: 2 });
for (const [name, html] of [['example-1', slideA], ['example-2', slideB]]) {
  writeFileSync(join(dir, name + '.html'), html);
  await pg.setContent(html, { waitUntil: 'load' });
  await pg.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 500));
  await pg.screenshot({ path: join(dir, name + '.png'), clip: { x: 0, y: 0, width: TOKENS.layout.width, height: TOKENS.layout.height } });
  console.log('OK ' + name);
}
await browser.close();
