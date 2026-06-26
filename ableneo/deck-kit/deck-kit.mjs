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
.topbar{position:absolute;top:0;left:0;height:11px;width:58%;background:${LIME};z-index:5;}
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
