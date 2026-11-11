// Ableneo motion system "Lock-in": tokens + GSAP helpers for Hyperframes compositions.
// Source of truth: knowledge/design-tokens.json → motion. Spec: MOTION.md.
// Usage (in a generator):  import { prelude, markSvg } from '../motion.mjs';
//   html += `${markSvg('m')}<script>const tl=gsap.timeline({paused:true});${prelude()}connect("m",0.2);</script>`
import { readFileSync } from 'fs';

export const MOTION = JSON.parse(
  readFileSync(new URL('../knowledge/design-tokens.json', import.meta.url), 'utf8')
).motion;

// Logo mark path, taken verbatim from the approved logo file (never redrawn).
const LOGO = readFileSync(new URL('../deck-kit/assets/ableneo-logo-on-dark.svg', import.meta.url), 'utf8');
export const MARK_D = LOGO.match(/<path d="([^"]+)" fill="#CDDE00"/)[1];
// Node circles of the mark (center x, y, outer radius) in the logo's own units.
const NODES = [[20.34, 57.43, 21], [74.15, 42.46, 14], [61.83, 86.98, 13]];

// Wordmark alone (logo file minus the mark), same units so it sits on the mark baseline.
export const wordSvg = (style = 'height:100%') =>
  LOGO.replace(/<!--.*?-->/, '').replace(/<path d="[^"]+" fill="#CDDE00"\/>/, '').replace(/viewBox="[^"]+"/, `viewBox="90 29.6 201 68.8" style="${style}" aria-hidden="true"`);

// Mark with a reveal mask: nodes open first, then the links close. Ends as the exact approved mark.
export const markSvg = (id, fill = '#CDDE00', style = 'height:100%') =>
  `<svg id="${id}" viewBox="0 29.6 87.6 68.8" style="${style}" aria-label="ableneo"><defs><mask id="${id}-mk">` +
  NODES.map(([x, y, r], i) => `<circle id="${id}-n${i}" cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`).join('') +
  `<circle id="${id}-all" cx="44" cy="64" r="60" fill="#fff"/></mask></defs>` +
  `<path d="${MARK_D}" fill="${fill}" mask="url(#${id}-mk)"/></svg>`;

// Browser-side helpers bound to timeline variable `tl`. Only the brand verbs exist.
export function prelude(tl = 'tl') {
  const { duration: d, easing: e, distance: x, stagger: st } = MOTION;
  return `
const snap=(s,t,x=-${x.md})=>${tl}.from(s,{opacity:0,x,duration:${d.base},ease:"${e.snap.gsap}",stagger:${st}},t);
const snapY=(s,t,y=${x.sm})=>${tl}.from(s,{opacity:0,y,duration:${d.base},ease:"${e.snap.gsap}",stagger:${st}},t);
const enter=(s,t,y=${x.sm})=>${tl}.from(s,{opacity:0,y,duration:${d.base},ease:"${e.enter.gsap}",stagger:${st}},t);
const stamp=(s,t)=>${tl}.from(s,{opacity:0,scale:0.4,rotation:-12,transformOrigin:"center",duration:${d.base},ease:"${e.stamp.gsap}"},t);
const draw=(s,t,dd=${d.draw})=>${tl}.from(s,{scaleX:0,transformOrigin:"left center",duration:dd,ease:"${e.draw.gsap}",stagger:${st}},t);
const grow=(s,t,dd=${d.draw})=>${tl}.from(s,{scaleY:0,transformOrigin:"center bottom",duration:dd,ease:"${e.draw.gsap}",stagger:${st}},t);
const stroke=(s,t,dd=${d.draw})=>${tl}.fromTo(s,{attr:{pathLength:1},strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,duration:dd,ease:"${e.draw.gsap}",stagger:${st}},t);
const chip=(s,t,dd=${d.fast})=>${tl}.from(s,{clipPath:"inset(0% 100% 0% 0%)",duration:dd,ease:"${e.draw.gsap}",stagger:${st}},t);
const block=(s,t)=>chip(s,t,${d.draw});
const emph=(s,t,from="#fff")=>${tl}.from(s,{color:from,duration:${d.fast},ease:"${e.enter.gsap}",stagger:${st}},t);
const ghost=(s,t)=>${tl}.from(s,{opacity:0,y:${x.lg * 2},duration:${d.slow},ease:"${e.enter.gsap}"},t);
const photo=(s,t)=>{${tl}.from(s,{clipPath:"inset(0% 0% 100% 0%)",duration:${d.draw},ease:"${e.draw.gsap}"},t);${tl}.from(s,{scale:1.06,duration:${d.slow} * 2,ease:"${e.enter.gsap}"},t);};
const swipe=(out,inn,t)=>{${tl}.to(out,{xPercent:-100,duration:${d.base},ease:"${e.draw.gsap}"},t);${tl}.fromTo(inn,{xPercent:100},{xPercent:0,duration:${d.base},ease:"${e.draw.gsap}"},t);};
const pop=(s,t)=>${tl}.from(s,{opacity:0,scale:0.6,transformOrigin:"center",duration:${d.base},ease:"${e.snap.gsap}",stagger:${st}},t);
const nudge=(s,t)=>${tl}.to(s,{x:${x.xs},duration:${d.fast},ease:"${e.enter.gsap}",yoyo:true,repeat:1},t);
const logo=(s,t)=>${tl}.from(s,{opacity:0,y:${x.xs},duration:${d.base},ease:"${e.enter.gsap}"},t);
const drift=(s,t,dur=8,x=-${x.lg * 2})=>${tl}.to(s,{x,duration:dur,ease:"${e.drift.gsap}"},t);
const wipe=(s,t)=>{${tl}.fromTo(s,{xPercent:-101},{xPercent:0,duration:${d.base},ease:"${e.draw.gsap}"},t);${tl}.to(s,{xPercent:101,duration:${d.base},ease:"${e.draw.gsap}"},t+${d.base}+${d.instant});};
const exit=(s,t,y=-${x.xs})=>${tl}.to(s,{opacity:0,y,duration:${d.exit},ease:"${e.exit.gsap}"},t);
function connect(id,t){[21,14,13].forEach((r,i)=>${tl}.fromTo("#"+id+"-n"+i,{attr:{r:0}},{attr:{r},duration:${d.base},ease:"${e.snap.gsap}"},t+i*${st}));${tl}.fromTo("#"+id+"-all",{attr:{r:0}},{attr:{r:60},duration:${d.draw},ease:"${e.draw.gsap}"},t+${d.base});}
function count(id,to,suf,t,dec=0){const o={v:0};${tl}.to(o,{v:to,duration:${d.base},ease:"${e.count.gsap}",onUpdate:()=>{const el=document.getElementById(id);if(el)el.textContent=o.v.toFixed(dec)+suf;}},t);}
function fill(s,n,t,c="#CDDE00"){[...document.querySelectorAll(s)].slice(0,n).forEach((el,i)=>${tl}.set(el,{backgroundColor:c},t+i*${d.base}/n));}
`;
}

// ponytail: self-check, run `node motion.mjs`
if (import.meta.url === `file://${process.argv[1]}`) {
  const p = prelude();
  for (const v of ['snap', 'draw', 'count', 'connect', 'drift', 'wipe', 'chip', 'block', 'emph', 'ghost', 'photo', 'swipe', 'pop', 'nudge', 'grow', 'stroke', 'fill'])
    console.assert(p.includes(`const ${v}=`) || p.includes(`function ${v}(`), v);
  new Function('gsap', `const tl={from(){},to(){},set(){},fromTo(){},call(){}};${p}`)();
  console.assert(MARK_D.startsWith('M74.15') && markSvg('m').includes('m-n2'), 'mark');
  console.log('motion ok', Object.keys(MOTION.duration).join(','));
}
