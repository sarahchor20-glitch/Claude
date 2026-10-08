// Shared layout + building blocks for generated pages.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Change this when the site moves to its own domain (e.g. 'https://vndr.com.au/').
export const BASE_URL = 'https://sarahchor20-glitch.github.io/Claude/vndr/';
export const TODAY = '2026-10-07';

// Pull MACHINES, CATEGORIES and machineSVG out of the browser file so there is one source of truth.
const siteSrc = fs.readFileSync(path.join(ROOT, 'site.js'), 'utf8');
export const { MACHINES, CATEGORIES, machineSVG, esc } =
  new Function(siteSrc + '\nreturn { MACHINES, CATEGORIES, machineSVG, esc };')();
export const machine = id => MACHINES.find(m => m.id === id);

export const pages = [];   // collected for sitemap.xml

const ICONS = {
  photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>'
};

/** Placeholder for a photo or video. Swap the <figure> contents for <img>/<video> when you have the file. */
export function slot({ type = 'photo', ratio = '4x3', hint, file }) {
  const how = type === 'video'
    ? `<video src="${file}" poster="" controls playsinline preload="metadata"></video>`
    : `<img src="${file}" alt="${esc(hint)}" loading="lazy">`;
  return `<!-- ${type.toUpperCase()} SLOT: replace this figure's contents with ${how} and remove the "empty" class -->
<figure class="media r-${ratio} empty"><div class="ph">${ICONS[type]}<b>${type === 'video' ? 'Video' : 'Photo'}</b>${esc(hint)}</div></figure>`;
}

// Real photos (files in images/). Add new ones here, then use photo({ p: PHOTOS.key, ... }).
export const PHOTOS = {
  front:   { file: 'images/ramen/rar-machine-front', w: 1227, h: 1600, alt: 'Ramen vending machine wrapped for Right Away Ramen, with a touchscreen, product window and hot-water station', cap: 'Right Away Ramen' },
  shelves: { file: 'images/ramen/rar-shelves', w: 1200, h: 1600, alt: 'Shelves of cup noodles inside a ramen vending machine, next to the hot-water station', cap: 'Right Away Ramen' },
  collect: { file: 'images/ramen/rar-collect', w: 1200, h: 1600, alt: '"Collect Noodz Here" pick-up door on a Right Away Ramen vending machine', cap: 'Right Away Ramen' },
  water:   { file: 'images/ramen/rar-hot-water', w: 1200, h: 1600, alt: 'Hot-water station on a ramen vending machine with a noodle cup ready to fill', cap: 'Right Away Ramen' },
  ramenBlack: { file: 'images/machines/ramen-touchscreen-black', w: 1122, h: 1402, sw: 640, alt: 'Black VNDR touchscreen ramen vending machine stocked with cup noodles, with a hot-water station and card reader' },
  snackFront: { file: 'images/machines/snack-drink-front', w: 1122, h: 1402, sw: 640, alt: 'VNDR snack and drink vending machine stocked with chips, chocolate bars, soft drinks and energy drinks' },
  snackHall: { file: 'images/machines/snack-drink-hallway', w: 1091, h: 1441, sw: 640, alt: 'Black VNDR snack and drink vending machine in a school hallway' },
  darkFront: { file: 'images/machines/dark-front', w: 506, h: 507, sw: 506, alt: 'Black VNDR vending machine lit up in a dark room' },
  darkEdge: { file: 'images/machines/dark-edge', w: 508, h: 507, sw: 508, alt: 'Close-up of the LED-lit glass edge of a VNDR vending machine' },
  darkAngle: { file: 'images/machines/dark-angle', w: 506, h: 507, sw: 506, alt: 'Black VNDR vending machine at an angle in a dark room' },
  darkPanel: { file: 'images/machines/dark-panel', w: 506, h: 508, sw: 506, alt: 'VNDR logo on the pick-up panel of a black vending machine' },
  darkPair: { file: 'images/machines/dark-pair', w: 508, h: 508, sw: 508, alt: 'Two black VNDR vending machines side by side' },
  darkKeypad: { file: 'images/machines/dark-keypad', w: 506, h: 508, sw: 506, alt: 'Close-up of a VNDR vending machine keypad and display' },
  studioFront: { file: 'images/machines/studio-front', w: 506, h: 507, sw: 506, alt: 'Black VNDR vending machine on a white background, front view' },
  studioAngle: { file: 'images/machines/studio-angle', w: 508, h: 507, sw: 508, alt: 'Black VNDR vending machine on a white background, side angle' },
  studioThree: { file: 'images/machines/studio-three-quarter', w: 506, h: 507, sw: 506, alt: 'Black VNDR vending machine on a white background, three-quarter view' },
  studioLow: { file: 'images/machines/studio-low', w: 506, h: 508, sw: 506, alt: 'Black VNDR vending machine on a white background, low angle' },
  studioFront2: { file: 'images/machines/studio-front-2', w: 508, h: 508, sw: 508, alt: 'Black VNDR vending machine on a white background, straight on' },
  studioClose: { file: 'images/machines/studio-close', w: 506, h: 508, sw: 506, alt: 'Close-up of a black VNDR vending machine on a white background' }
};

/** A real photo. `root` is the page's path back to the site root; `pos` crops (object-position); `zoom` magnifies a detail. */
export function photo(root, { p, ratio = '4x5', pos = '50% 50%', zoom, caption, eager = false, sizes = '(max-width: 900px) 100vw, 50vw', cls = '' }) {
  const style = `object-position:${pos}` + (zoom ? `;transform:scale(${zoom});transform-origin:${pos}` : '');
  return `<figure class="media r-${ratio} photo ${cls}"><img src="${root}${p.file}.jpg" srcset="${root}${p.file}-sm.jpg ${p.sw || 640}w, ${root}${p.file}.jpg ${p.w}w" sizes="${sizes}" width="${p.w}" height="${p.h}" alt="${esc(p.alt)}" style="${style}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">${caption ? `<figcaption class="cap">${esc(caption)}</figcaption>` : ''}</figure>`;
}

export const art = (kind, uid, extra = '') => `<figure class="media art ${extra}">${machineSVG(kind, uid)}</figure>`;

export const icon = (paths, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

export function crumbs(root, trail) {
  const html = `<nav class="crumbs reveal" aria-label="Breadcrumb">${trail.map(([name, href], i) =>
    (i ? '<span aria-hidden="true">/</span>' : '') + (href ? `<a href="${root}${href}">${esc(name)}</a>` : `<span>${esc(name)}</span>`)).join('')}</nav>`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name, ...(href !== undefined ? { item: BASE_URL + (href === 'index.html' ? '' : href) } : {}) }))
  };
  return { html, ld };
}

export function faqBlock(faqs) {
  const html = `<div class="faq">${faqs.map(f => `
    <details class="reveal"><summary>${esc(f.q)}</summary><div class="a">${f.a.map(p => `<p>${p}</p>`).join('')}</div></details>`).join('')}</div>`;
  const strip = s => s.replace(/<[^>]+>/g, '');
  const ld = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.map(strip).join(' ') } }))
  };
  return { html, ld };
}

export function ctaBand(root, { h, p, primary = ['Get pricing', 'index.html#enquire'], secondary }) {
  return `<div class="cta-band reveal">
    <div><h2>${h}</h2>${p ? `<p>${p}</p>` : ''}</div>
    <div class="btns">
      <a href="${root}${primary[1]}" class="btn">${primary[0]} <span class="arrow">→</span></a>
      ${secondary ? `<a href="${root}${secondary[1]}" class="btn alt">${secondary[0]}</a>` : ''}
    </div>
  </div>`;
}

const NAV = [
  ['machines', 'Machines', 'machines/'],
  ['how', 'How it works', 'index.html#how'],
  ['blog', 'Blog', 'blog/'],
  ['quiz', 'Quiz', 'quiz/'],
  ['about', 'About', 'index.html#about'],
  ['login', 'Log in', 'dashboard/']
];

/** Write one page. `pagePath` is a folder like 'machines/ramen-vending-machine/'. */
export function writePage({ pagePath, title, description, body, jsonld = [], scripts = '', active = '', ogType = 'website', image }) {
  const depth = pagePath.split('/').filter(Boolean).length;
  const root = '../'.repeat(depth);
  const url = BASE_URL + pagePath;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#0b0b0c">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="VNDR">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
${image ? `<meta property="og:image" content="${BASE_URL + image}">\n<meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">'}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230b0b0c'/%3E%3Cpath d='M8 9l8 15 8-15' fill='none' stroke='%23c8ff2e' stroke-width='3.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}style.css">
${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
<!-- Generated by _build/build.mjs. Edit the content files in _build/ and rebuild, or edit this file directly. -->
</head>
<body>

<header class="nav" id="nav">
  <div class="wrap">
    <a href="${root}index.html" class="logo" aria-label="VNDR home">VNDR<b>.</b></a>
    <nav class="nav-links" id="navLinks">
      ${NAV.map(([k, label, href]) => `<a href="${root}${href}"${k === active ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ')}
    </nav>
    <a href="${root}index.html#enquire" class="btn btn-primary nav-cta">Enquire <span class="arrow">→</span></a>
    <button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
  </div>
</header>

<main id="top">
${typeof body === 'function' ? body(root) : body}
</main>

<footer>
  <div class="wrap">
    <div class="foot-big">
      <span>We provide the machines.</span>
      <span>We simplify the process.</span>
      <span>You build the empire.</span>
    </div>
    <div class="foot-row">
      <a href="${root}index.html" class="logo">VNDR<b>.</b></a>
      <nav>
        <a href="${root}machines/">Machines</a>
        <a href="${root}machines/ramen-vending-machine/">Ramen machines</a>
        <a href="${root}blog/">Blog</a>
        <a href="${root}quiz/">Quizzes</a>
        <a href="${root}index.html#enquire">Enquire</a>
        <a href="${root}dashboard/">Operator login</a>
      </nav>
      <span>© <span id="year"></span> VNDR. Vending empire, simplified.</span>
    </div>
  </div>
</footer>

<script src="${root}site.js"></script>
${typeof scripts === 'function' ? scripts(root) : scripts}
<script>initChrome();</script>
</body>
</html>
`;
  const out = path.join(ROOT, pagePath, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  pages.push(pagePath);
}
