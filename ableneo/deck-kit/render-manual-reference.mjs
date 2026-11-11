// Reference sheet: the design manual's stat-card + carousel templates rebuilt from deck-kit modules only.
// Proves the kit covers the manual; use it as the visual index when picking a scheme. node render-manual-reference.mjs
import { resolve } from 'path';
import { createRequire } from 'module';
import { page, head, ghost, ghostOutline, arrow, variants, rhythm, statBento, iconCircle, block, pill, SKY, supergraphic, LIME, CHARCOAL } from './deck-kit.mjs';
import { puppeteer as kitPuppeteer } from './deck-kit.mjs'; const puppeteer = await kitPuppeteer();

const stats = [{ n: '99%', l: 'Automation rate' }, { n: '92%', l: 'Document accuracy' }, { k: 'Significant', t: 'Time Savings' }];
const bentos = ['dark', 'dark-violet', 'sky', 'violet'].map(s => statBento(stats, s, 420)).join('');

const TAG = 'Webinar · Protocols', h = (sz, c, t) => `<div class="h-light" style="font-size:${sz}px;color:${c};">${t}</div>`;
const body = [
  v => `${supergraphic('#fff', .05)}<div class="pad"><div>${v.logo}</div><div class="fill">${h(104, '#fff', 'Most companies see protocols as barriers.')}<div style="margin-top:60px;">${block(h(56, CHARCOAL, 'The smartest see them as <b>enablers</b>.'))}</div></div></div>`,
  v => `${ghostOutline('01', 'rgba(29,32,36,.08)')}<div class="pad">${head(TAG, '02', v.ink)}<div class="fill">${block(h(76, CHARCOAL, 'Without protocols, AI agents can’t integrate, talk, or <b>scale across your business</b>.'), SKY)}</div></div>`,
  v => `${ghostOutline('02', '#fff', 'right:-40px;top:120px;')}<div class="pad">${head(TAG, '03', v.ink)}<div class="fill" style="justify-content:flex-end;">${block(h(70, CHARCOAL, 'Protocols are the glue that <b>binds agentic AI ecosystems</b>.'))}</div></div>`,
  v => `${ghost('03', '#262A2F', 'right:-60px;bottom:40px;')}<div class="pad">${head(TAG, '04', 'rgba(255,255,255,.7)')}<div class="fill">${h(90, '#fff', 'The right protocol <b style="color:' + LIME + '">unlocks</b>:')}<div style="display:flex;flex-direction:column;gap:40px;margin-top:70px;">${['Seamless integration', 'Platform independence', 'Faster scaling'].map(t => `<div style="display:flex;gap:30px;align-items:center;font-size:40px;color:#fff;">${iconCircle('check', { d: 80 })}${t}</div>`).join('')}</div></div></div>`,
  v => `<div class="pad">${head(TAG, '05', CHARCOAL)}<div class="fill" style="align-items:center;text-align:center;">${iconCircle('wifi', { fill: CHARCOAL, ink: '#fff', d: 230 })}${h(84, CHARCOAL, `<br>Think of protocols as the ${pill('Wi-Fi')} for your AI agents.`)}</div></div>`,
  v => `${supergraphic('#fff', .05)}<div class="pad"><div>${v.logo}</div><div class="fill">${h(90, '#fff', 'Curious how protocol-first thinking <b style="color:' + LIME + '">accelerates AI adoption</b>?')}<div style="margin-top:60px;display:flex;gap:24px;align-items:center;">${arrow('#fff')}<span class="pillbtn" style="background:${LIME};color:${CHARCOAL};font-size:34px;padding:26px 48px;">Watch the full webinar</span></div></div></div>`,
];
const strip = rhythm.primary.map((k, i) => { const v = variants[k];
  return `<div class="slide" style="background:${v.bg};">${v.grid}${body[i](v)}${i % 5 ? `<div class="foot">${v.logo}${arrow(v.arrowInk)}</div>` : ''}</div>`; }).join('');

const css = `html,body{width:auto!important;height:auto!important;overflow:visible!important;background:#fff}
.sheet{padding:60px;font-family:'Ableneo';} .sheet h2{font-weight:400;font-size:40px;margin:0 0 30px;color:${CHARCOAL}}
.row{display:flex;gap:40px;margin-bottom:80px;} .strip{display:flex;gap:30px;zoom:.42;} .strip .slide{flex:none} .h-light b{font-weight:700}`;
const html = page(`<div class="sheet"><h2>Stat cards: dark · dark + violet · sky · violet</h2><div class="row">${bentos}</div>
<h2>Carousel: primary + accent (sky), rhythm.primary</h2><div class="strip">${strip}</div></div>`, css);

const b = await puppeteer.launch({ headless: true }), p = await b.newPage();
await p.setViewport({ width: 2100, height: 1000, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: 'load' }); await p.waitForFunction(() => document.body.dataset.fit);
const out = resolve('../outputs/deck-kit-manual-reference.png');
await p.screenshot({ path: out, fullPage: true }); await b.close(); console.log(out);
