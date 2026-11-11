// Ableneo Deck Kit — shared rendering engine for on-brand social/deck visuals.
// Pure module (no puppeteer). Import the tokens, CSS and helpers; compose slides;
// render with any HTML->PNG tool. Mirrors the official Figma carousel template.
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const KIT = dirname(fileURLToPath(import.meta.url));

// ── Design tokens (kept in sync with ableneo/knowledge/design-tokens.json) ──
export const TOKENS = {
  color: {
    lime: '#CDDE00', charcoal: '#1D2024', white: '#FFFFFF',
    light: '#F1F1EF',                 // light slide background
    panel: '#282C31',                 // card / panel on charcoal
    olive: '#1E2200',                 // text-on-lime / dark callout
    periwinkle: '#C3D3FD', violet: '#B6B0F2', skyBlue: '#C3D3FD',
    steel: '#49576A',
    limeTints: { 80: '#DCE84D', 70: '#E1EB66', 60: '#E6EF80' },
  },
  font: { family: 'Ableneo', webFallback: 'Poppins' },
  type: {           // weights: light headlines, bold emphasis (per reference)
    headlineWeight: 300, emphasisWeight: 700, bodyWeight: 400, labelWeight: 400,
  },
  layout: { width: 1080, height: 1350, margin: 90, radius: 18, pillRadius: 60 },
};
export const { lime: LIME, charcoal: CHARCOAL, white: WHITE, light: LIGHT,
  panel: PANEL, olive: OLIVE, periwinkle: PERI } = TOKENS.color;

// ── Fonts (embedded from assets/fonts; falls back to Poppins if missing) ──
function fontFace(weight, file) {
  const p = join(KIT, 'assets', 'fonts', file);
  if (!existsSync(p)) return '';
  const b64 = readFileSync(p).toString('base64');
  return `@font-face{font-family:'Ableneo';font-weight:${weight};src:url(data:font/otf;base64,${b64}) format('opentype');}`;
}
export const fontsCss = [
  fontFace(300, 'Ableneo-Light.otf'),
  fontFace(400, 'Ableneo-Regular.otf'),
  fontFace(500, 'Ableneo-Medium.otf'),
  fontFace(600, 'Ableneo-SemiBold.otf'),
  fontFace(700, 'Ableneo-Bold.otf'),
].join('\n') +
  `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');`;

// ── Logos (real wordmark + mark) ──
const readLogo = (f) => existsSync(join(KIT, 'assets', f))
  ? readFileSync(join(KIT, 'assets', f), 'utf8').replace('<svg ', '<svg class="logo" ') : '';
export const logoOnDark = readLogo('ableneo-logo-on-dark.svg');   // lime mark + white word
export const logoOnLight = readLogo('ableneo-logo-on-light.svg'); // all charcoal

// ── Background grid (signature device) ──
const grid = (stroke) => `<svg class="grid" width="1080" height="1350"><g stroke="${stroke}" stroke-width="1.5">
  <line x1="270" y1="0" x2="270" y2="1350"/><line x1="540" y1="0" x2="540" y2="1350"/><line x1="810" y1="0" x2="810" y2="1350"/>
  <line x1="0" y1="338" x2="1080" y2="338"/><line x1="0" y1="675" x2="1080" y2="675"/><line x1="0" y1="1012" x2="1080" y2="1012"/></g></svg>`;
export const gridDark = grid('rgba(255,255,255,0.05)');
export const gridLight = grid('rgba(0,0,0,0.05)');

// ── Base CSS (component system) ──
export const baseCss = `${fontsCss}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:'Ableneo','Poppins',sans-serif;}
.slide{width:1080px;height:1350px;position:relative;overflow:hidden;}
.grid{position:absolute;inset:0;z-index:0;pointer-events:none;}
.topbar{display:none;} /* ponytail: lime top bar retired 2026-10-19 (not in design manual, Peter); old renderers keep the empty div */
.pad{position:absolute;inset:0;padding:96px 90px 110px;z-index:3;display:flex;flex-direction:column;}
.head{display:flex;justify-content:space-between;align-items:center;font-family:'Ableneo';font-weight:400;font-size:27px;}
.head .tag{opacity:0.85;} .head .num{font-weight:500;}
.ghost{position:absolute;font-family:'Ableneo';font-weight:300;font-size:720px;line-height:1;z-index:1;user-select:none;}
.logo{height:46px;width:auto;display:block;}
.foot{position:absolute;left:90px;right:90px;bottom:64px;display:flex;align-items:center;justify-content:space-between;z-index:4;}
.arrowpill{border:2.5px solid;border-radius:50px;padding:18px 30px;display:inline-flex;align-items:center;}
.h-light{font-family:'Ableneo';font-weight:300;line-height:1.04;letter-spacing:-1px;}
.h-bold{font-family:'Ableneo';font-weight:700;line-height:1.04;letter-spacing:-1px;}
.body{font-family:'Ableneo';font-weight:400;line-height:1.4;}
.fill{flex:1;display:flex;flex-direction:column;justify-content:center;z-index:3;}
.pillbtn{font-family:'Ableneo';font-weight:700;border-radius:${TOKENS.layout.pillRadius}px;display:inline-block;}
.card{position:relative;background:${PANEL};border-radius:${TOKENS.layout.radius}px;overflow:hidden;}
.card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:7px;background:${LIME};}
`;

// ── Helpers ──
export const page = (bodyHtml, extraCss = '') =>
  `<!DOCTYPE html><html lang="sk"><head><meta charset="UTF-8"><style>${baseCss}${extraCss}</style></head><body>${bodyHtml}</body></html>`;
export const head = (tag, num, col) =>
  `<div class="head" style="color:${col};"><span class="tag">${tag}</span><span class="num">${num}</span></div>`;
export const ghost = (n, col, pos = 'right:-20px;bottom:80px;') =>
  `<div class="ghost" style="color:${col};${pos}">${n}</div>`;
export const arrow = (stroke) => `<div class="arrowpill" style="border-color:${stroke};">
  <svg width="48" height="20" viewBox="0 0 48 20" fill="none"><path d="M2 10h42M36 3l8 7-8 7" stroke="${stroke}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;

// Background presets: { bg, logo, ink, sub, arrowInk, gridSvg }
export const variants = {
  dark:  { bg: CHARCOAL, logo: logoOnDark,  ink: '#fff',    sub: 'rgba(255,255,255,0.7)', arrowInk: '#fff', grid: gridDark,  topbar: true },
  light: { bg: LIGHT,    logo: logoOnLight, ink: CHARCOAL,  sub: 'rgba(29,32,36,0.8)',    arrowInk: CHARCOAL, grid: gridLight, topbar: false },
  lime:  { bg: LIME,     logo: logoOnLight, ink: CHARCOAL,  sub: 'rgba(29,32,36,0.85)',   arrowInk: CHARCOAL, grid: '',       topbar: false },
};

// ── Manual modules (Design Guidelines 2025, carousel + stat-card templates) ──
// Shared helpers so renderers stop re-implementing them.
const { skyBlue: SKY, violet: VIOLET } = TOKENS.color;
export { SKY, VIOLET };
variants.sky    = { bg: SKY,    logo: logoOnLight, ink: CHARCOAL, sub: 'rgba(29,32,36,0.8)', arrowInk: CHARCOAL, grid: '', topbar: false };
variants.violet = { bg: VIOLET, logo: logoOnLight, ink: CHARCOAL, sub: 'rgba(29,32,36,0.8)', arrowInk: CHARCOAL, grid: '', topbar: false };

// Slide backgrounds per manual set: cover, statement, block, icon list, full-color, CTA.
// Primary + accent uses the same backgrounds; the accent (sky OR violet, one per carousel) enters
// as a block on a light slide. Only the photo set gives the accent a full slide.
export const rhythm = {
  primary: ['dark', 'light', 'light', 'dark', 'lime', 'dark'],
  photo:   (fam = 'violet') => ['dark', 'light', fam, 'dark', 'lime', 'dark'],
};

export const ghostOutline = (n, stroke = '#fff', pos = 'right:-40px;top:150px;') =>
  `<div class="ghost" style="color:transparent;-webkit-text-stroke:3px ${stroke};${pos}">${n}</div>`;

// Icons: rounded, one stroke weight, 24 grid. Solid circle = emphasis, outline = support.
export const ICONS = {
  car: '<path d="M5 16h14M6 16l1.6-5.2A2 2 0 0 1 9.5 9.4h5a2 2 0 0 1 1.9 1.4L18 16"/><path d="M4 16h16v2.5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1V18h-9v.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>',
  doc: '<path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20z"/><path d="M14 3.5V8h4M9.5 12.5h6M9.5 16h4"/>',
  db: '<ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6"/>',
  cpu: '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3"/>',
  user: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>',
  check: '<path d="M6 12.5l4 4 8-9"/>',
  book: '<path d="M4 5.5c2.7-1 5.3-1 8 .8 2.7-1.8 5.3-1.8 8-.8V19c-2.7-1-5.3-1-8 .8-2.7-1.8-5.3-1.8-8-.8z"/><path d="M12 6.3v13.5"/>',
  users: '<circle cx="8.5" cy="8.5" r="3"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M3 19c.6-3 2.8-4.7 5.5-4.7S13.4 16 14 19M14.5 14.6c2.6-.4 5 .9 5.8 4.4"/>',
  quiz: '<rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M8.5 8.5l1.2 1.2 2.3-2.4M8.5 14l1.2 1.2 2.3-2.4M14 8.5h2M14 14h2"/>',
  wifi: '<path d="M4 9.5a12 12 0 0 1 16 0M7 13a7.5 7.5 0 0 1 10 0M10 16.5a3 3 0 0 1 4 0"/><circle cx="12" cy="19" r=".6"/>',
};
export const icon = (k, stroke, size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[k] || k}</svg>`;
export const iconCircle = (k, { fill = LIME, ink = CHARCOAL, d = 96, outline = false } = {}) =>
  `<div style="width:${d}px;height:${d}px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;${outline ? `border:2.5px solid ${fill};` : `background:${fill};`}">${icon(k, outline ? fill : ink, d * 0.52)}</div>`;

// Statement block (color block holding the key line) and pill word.
export const block = (html, bg = LIME, ink = CHARCOAL, pad = '64px 60px') => `<div style="background:${bg};color:${ink};padding:${pad};">${html}</div>`;
export const pill = (word, bg = '#fff', ink = 'inherit') => `<span style="display:inline-block;border-radius:80px;padding:0 26px;margin:0 -4px;background:${bg};color:${ink};">${word}</span>`;

// Supergraphic: logo mark scaled up and cropped by the edge.
const markPath = (readLogo('ableneo-logo-on-light.svg').match(/<path d="([^"]+)"/) || [])[1] || '';
export const supergraphic = (col = '#fff', op = 0.05, pos = 'right:-520px;bottom:-260px;', w = 1300) =>
  `<svg style="position:absolute;${pos}z-index:1;opacity:${op}" width="${w}" viewBox="0 29.6 90 68.8"><path d="${markPath}" fill="${col}"/></svg>`;

// Dot matrix (1 dot = 1 %).
export const dotMatrix = (pct, on = LIME, off = CHARCOAL, d = 54) =>
  `<div style="display:grid;grid-template-columns:repeat(10,${d}px);gap:${d * 0.26}px;">${Array.from({ length: 100 }, (_, i) =>
    `<i style="width:${d}px;height:${d}px;border-radius:50%;display:block;${i < pct ? `background:${on};` : `border:3px solid ${off};opacity:.25;`}"></i>`).join('')}</div>`;

// Stat bento: 1:1 with Figma MARKETING-COMMS › Case_study (nodes 12:1105, 12:1132, 12:1159, 12:1186).
// Geometry is the Figma frame (1080×1350, absolute px). Colors are the Figma ones (violet #CBC6F6, sky frame #C7D6FD).
// stats = [{ n:'99%', l:'Automation rate' }, { n:'92%', l:'Document accuracy' }, { k:'Significant', t:'Time Savings' }]
// Number: digits Ableneo Medium + unit (% × …) Ableneo Light, 195px, shrunk in-page only if it overflows its tile.
const bentoSuper = existsSync(join(KIT, 'assets', 'stat-bento-supergraphic.svg'))
  ? readFileSync(join(KIT, 'assets', 'stat-bento-supergraphic.svg'), 'utf8').replace(/<svg [^>]*?>/, '<svg viewBox="0 0 2257 1848" preserveAspectRatio="none" width="100%" height="100%" fill="none">') : '';
export const statBento = (stats, scheme = 'dark', w = 1080) => {
  const C = {
    'dark':        { frame: CHARCOAL, hero: LIME, heroInk: CHARCOAL, box2: '#fff', num2: CHARCOAL, lab2: CHARCOAL, box3: '#C3D3FD', ink3: CHARCOAL, border: '#BAC7DA', logo: logoOnDark },
    'dark-violet': { frame: CHARCOAL, hero: LIME, heroInk: CHARCOAL, box2: '#fff', num2: CHARCOAL, lab2: CHARCOAL, box3: '#CBC6F6', ink3: CHARCOAL, border: '#BAC7DA', logo: logoOnDark },
    'sky':         { frame: '#C7D6FD', hero: '#fff', heroInk: CHARCOAL, box2: CHARCOAL, num2: LIME, lab2: '#fff', box3: '#49576A', ink3: '#fff', border: 'rgba(29,32,36,.3)', logo: logoOnLight },
    'violet':      { frame: '#CBC6F6', hero: '#fff', heroInk: CHARCOAL, box2: CHARCOAL, num2: LIME, lab2: '#fff', box3: '#49576A', ink3: '#fff', border: 'rgba(29,32,36,.3)', logo: logoOnLight },
  }[scheme];
  const [a, b, c] = stats;
  // SK/CZ typesetting: one-letter words (a, v, s, z, k, o, u, i) never end a line
  const glue = (t) => t.replace(/(?<=^|[\s;])([aiouvszkAIOUVSZK])\s/g, '$1&nbsp;');
  const box = (x, y, bw, bh, css = '') => `position:absolute;left:${x}px;top:${y}px;width:${bw}px;height:${bh}px;${css}`;
  // digits Medium, everything after the last digit (unit) Light; leading signs (+, >) stay Medium
  const num = (n, col) => { const m = n.match(/^(.*\d)(.*)$/) || [n, n, ''];
    return `<span class="bn" style="font-family:'Ableneo';font-weight:500;font-size:195.25px;line-height:1;white-space:nowrap;color:${col};">${m[1]}<span style="font-weight:300;">${m[2]}</span></span>`; };
  const lab = (t, col, css = '') => `<div style="font-family:'Poppins',sans-serif;font-weight:400;font-size:44px;line-height:1.2;letter-spacing:-0.66px;text-align:center;text-wrap:balance;color:${col};${css}">${glue(t)}</div>`;
  const center = 'display:flex;align-items:center;justify-content:center;';
  return `<div style="width:1080px;height:1350px;zoom:${w / 1080};position:relative;overflow:hidden;background:${C.frame};">
    <div style="position:absolute;inset:-50.3% -81.52% -25.2% -64.63%;display:flex;align-items:center;justify-content:center;container-type:size;">
      <div style="flex:none;width:hypot(-82.008cqw,24.6564cqh);height:hypot(-17.992cqw,-75.3436cqh);transform:rotate(165deg);">${bentoSuper}</div></div>
    <div style="${box(62, 92, 955, 404, 'background:' + C.hero)}"></div>
    <div style="${box(62, 92, 544, 404, center)}">${num(a.n, C.heroInk)}</div>
    <div style="${box(547, 92, 427, 404, center)}">${lab(a.l, C.heroInk)}</div>
    <div style="${box(62, 527, 458, 730, 'background:' + C.box2)}"></div>
    <div style="${box(62, 727, 458, 148, center)}">${num(b.n, C.num2)}</div>
    <div style="${box(62, 952, 458, 290)}">${lab(b.l, C.lab2, 'padding:0 30px;')}</div>
    <div style="${box(559, 527, 458, 453, 'background:' + C.box3)}"></div>
    ${c.k ? `<div style="${box(559, 600, 458, 53)}">${lab(c.k, C.ink3, 'padding:0 30px;')}</div>` : ''}
    <div style="${box(559, c.k ? 680 : 600, 458, c.k ? 230 : 310, center + 'padding:0 34px;box-sizing:border-box;')}"><div class="bt" style="font-family:'Ableneo';font-weight:500;font-size:95px;line-height:84px;letter-spacing:-0.95px;text-align:center;text-wrap:balance;color:${C.ink3};">${glue(c.t)}</div></div>
    <div style="${box(559, 1022, 459, 235, 'border:4px solid ' + C.border + ';box-sizing:border-box;' + center)}">${C.logo.replace('class="logo"', 'class="logo" style="width:343px;height:81px"')}</div>
    <script>document.fonts.ready.then(()=>{ // ponytail: shrink-to-fit only on overflow; Figma sizes are the ceiling
      document.querySelectorAll('.bn').forEach(e=>{const max=e.parentElement.clientWidth-60,r=e.scrollWidth;if(r>max)e.style.fontSize=(195.25*max/r)+'px';});
      document.querySelectorAll('.bt').forEach(e=>{const p=e.parentElement;let f=95;while((e.scrollHeight>p.clientHeight||e.scrollWidth>p.clientWidth-68)&&f>48){f-=3;e.style.fontSize=f+'px';e.style.lineHeight=(f*.885)+'px';}});
      document.body.dataset.fit=1;});</script>
  </div>`;
};

// ── Carousel shell 1:1 with Figma MARKETING-COMMS › Carousel_primary and secundary colours (12:1023, 12:925, 12:808) ──
// Header: Poppins 30 tag left + page no. right at y60. Footer: logo 255×60 at (81,1229), arrow pill 150×69 at (850,1231).
// Light bg is #F5F5F5 in Figma. The Figma progress bar is left out (lime top bar retired 2026-10-19, Peter).
export const FIG = { light: '#F5F5F5', subDark: '#BAC7DA', ghostDark: 'rgba(73,87,106,.3)', textLight: '#FDFEFF' };
export const slideHead = (tag, num, dark, logo = false) =>
  `<div style="position:absolute;left:82px;top:60px;width:908px;height:61px;display:flex;justify-content:space-between;align-items:center;font-family:'Poppins',sans-serif;font-size:30px;letter-spacing:-0.6px;color:${dark ? FIG.subDark : CHARCOAL};z-index:4;">
    <span>${tag}</span>${logo ? (dark ? logoOnDark : logoOnLight).replace('class="logo"', 'class="logo" style="width:255px;height:60px"') : `<span>${num}</span>`}</div>`;
export const slideFoot = (dark, logo = true) => {
  const ink = dark ? '#fff' : CHARCOAL;
  return `${logo ? `<div style="position:absolute;left:81px;top:1229px;z-index:4;">${(dark ? logoOnDark : logoOnLight).replace('class="logo"', 'class="logo" style="width:255px;height:60px"')}</div>` : ''}
  <div style="position:absolute;left:850px;top:1231px;width:150px;height:69px;border:1.3px solid ${ink};border-radius:55px;display:flex;align-items:center;justify-content:center;z-index:4;">
    <svg width="64" height="18" viewBox="0 0 64 18" fill="none"><path d="M1 9h61M54 1.5l8 7.5-8 7.5" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
};
export const ghostNum = (n, dark, css = 'left:254px;top:693px;') => dark
  ? `<div style="position:absolute;${css}font-family:'Ableneo';font-weight:400;font-size:766px;line-height:1;color:${FIG.ghostDark};z-index:1;">${n}</div>`
  : `<div style="position:absolute;${css}font-family:'Ableneo';font-weight:400;font-size:766px;line-height:1;color:transparent;-webkit-text-stroke:3px #fff;z-index:1;">${n}</div>`;

// Lazy puppeteer loader: resolves from deck-kit/node_modules (npm i in this folder).
export const puppeteer = async () => (await import('puppeteer')).default;
