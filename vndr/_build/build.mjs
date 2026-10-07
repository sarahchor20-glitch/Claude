// Generates the VNDR product pages, blog, quizzes and sitemap.
//   Run from anywhere:  node vndr/_build/build.mjs
// The home page (index.html), style.css, site.js and quiz.js are edited by hand.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, BASE_URL, TODAY, pages, writePage, slot, photo, PHOTOS, crumbs, ctaBand, esc } from './lib.mjs';
import { buildProducts } from './products.mjs';
import { POSTS } from './posts.mjs';

const readMins = html => Math.max(2, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 220));
const fmtDate = d => new Date(d + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
const post = slug => POSTS.find(p => p.slug === slug);

/* ---------- Blog index ---------- */
function blogIndex() {
  const crumb = crumbs('../', [['Home', 'index.html'], ['Blog']]);
  const [first, ...rest] = POSTS;
  const card = (p, root, feature) => `
    <a class="post-card reveal ${feature ? 'feature' : ''}" href="${root}blog/${p.slug}/">
      ${p.heroPhoto ? photo(root, { p: PHOTOS[p.heroPhoto], ratio: '16x9', pos: '50% 35%', sizes: '(max-width: 640px) 100vw, 33vw' }) : slot({ ratio: '16x9', hint: p.hero, file: `${root}images/blog/${p.slug}.jpg` })}
      <div class="body">
        <small>${esc(p.category)} · ${readMins(p.body)} min read</small>
        ${feature ? `<h2>${esc(p.title)}</h2>` : `<h3>${esc(p.title)}</h3>`}
        <p>${esc(p.description)}</p>
        <span class="more">Read article →</span>
      </div>
    </a>`;
  writePage({
    pagePath: 'blog/',
    active: 'blog',
    title: 'Vending Business Blog: Guides, Locations & Machines | VNDR',
    description: 'Practical guides to starting and growing a vending machine business: choosing machines, finding locations, what to stock, costs and more.',
    jsonld: [crumb.ld, { '@context': 'https://schema.org', '@type': 'Blog', name: 'VNDR Blog', url: BASE_URL + 'blog/' }],
    body: root => `
<section class="blog-hero">
  <div class="wrap">
    ${crumb.html}
    <div class="eyebrow reveal">The VNDR blog</div>
    <h1 class="reveal">Stop overthinking vending. <span class="muted">Start building.</span></h1>
    <p class="lede reveal">Practical, plain-English guides for every step: machine, location, stock, launch, scale.</p>
  </div>
</section>
<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="posts">
      ${card(first, root, true)}
      ${rest.map(p => card(p, root)).join('')}
    </div>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    ${ctaBand(root, { h: 'Is vending right for you?', p: 'Eight quick questions for an honest answer, plus what to work on if you\'re not quite ready.', primary: ['Take the quiz', 'quiz/is-vending-right-for-you/'], secondary: ['Which machine?', 'quiz/which-vending-machine/'] })}
  </div>
</section>`
  });
}

/* ---------- Blog articles ---------- */
function article(p) {
  const crumb = crumbs('../../', [['Home', 'index.html'], ['Blog', 'blog/'], [p.title]]);
  const toc = [...p.body.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)];
  writePage({
    pagePath: `blog/${p.slug}/`,
    active: 'blog',
    ogType: 'article',
    image: p.heroPhoto ? PHOTOS[p.heroPhoto].file + '.jpg' : undefined,
    title: p.metaTitle,
    description: p.description,
    jsonld: [crumb.ld, {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: p.title, description: p.description, datePublished: p.date, dateModified: p.date,
      author: { '@type': 'Organization', name: 'VNDR' }, publisher: { '@type': 'Organization', name: 'VNDR' },
      mainEntityOfPage: BASE_URL + `blog/${p.slug}/`
    }],
    body: root => `
<section class="article-hero">
  <div class="wrap">
    <div class="inner">
      ${crumb.html}
      <div class="eyebrow reveal">${esc(p.category)}</div>
      <h1 class="reveal">${esc(p.title)}</h1>
      <p class="lede reveal">${esc(p.lede)}</p>
      <div class="meta reveal"><span>${fmtDate(p.date)}</span><span>${readMins(p.body)} min read</span><span>By VNDR</span></div>
    </div>
  </div>
</section>
<div class="wrap">
  <div class="article-media reveal">${p.heroPhoto ? photo(root, { p: PHOTOS[p.heroPhoto], ratio: '16x9', pos: '50% 35%', eager: true, sizes: '(max-width: 1100px) 100vw, 1100px', caption: 'Right Away Ramen' }) : slot({ ratio: '16x9', hint: p.hero, file: `${root}images/blog/${p.slug}.jpg` })}</div>
  ${toc.length > 3 ? `<nav class="toc reveal" aria-label="In this article"><b>In this article</b><ol>${toc.map(([, id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol></nav>` : ''}
  <article class="prose">
    ${p.body.replaceAll('{{root}}', root)}
  </article>
</div>
<section class="sec">
  <div class="wrap">
    <div class="sec-head"><div class="eyebrow reveal">Keep reading</div><h2 class="reveal">Related guides.</h2></div>
    <div class="rel reveal">
      ${p.related.map(post).filter(Boolean).map(r => `<a href="${root}blog/${r.slug}/"><small>${esc(r.category)}</small><b>${esc(r.title)}</b><span>${readMins(r.body)} min read</span></a>`).join('')}
      <a href="${root}machines/"><small>Machines</small><b>Browse all machines</b><span>Ramen, snack, drinks and coffee.</span></a>
    </div>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    ${ctaBand(root, { h: 'Ready to start your vending business?', p: 'Tell us what you\'re planning and we\'ll help you choose the right first machine.', primary: ['Talk to VNDR', 'index.html#enquire'], secondary: ['Browse machines', 'machines/'] })}
  </div>
</section>`
  });
}

/* ---------- Quizzes ---------- */
const QUIZZES = [
  {
    slug: 'which-vending-machine',
    name: 'Which vending machine is right for you?',
    metaTitle: 'Which Vending Machine Is Right for You? Free Quiz | VNDR',
    description: 'Take the free 60-second quiz to find the right vending machine for your location and goals: ramen, snack, drinks or coffee.',
    lede: 'Six quick questions about your location, your customers and how hands-on you want to be. We\'ll match you with a machine.',
    meta: '6 questions · 60 seconds',
    script: root => `<script>runQuiz(document.getElementById('quiz'), { questions: MACHINE_QUIZ, render: renderMachineResult, root: '${root}' });</script>`,
    after: `
      <h2>How the quiz works</h2>
      <p>Every machine suits different locations and different operators. A <a href="{{root}}machines/drink-vending-machine/">drinks machine</a> thrives in a gym. A <a href="{{root}}machines/ramen-vending-machine/">ramen machine</a> shines in student housing at midnight. A <a href="{{root}}machines/coffee-vending-machine/">coffee machine</a> wins the office morning rush. The quiz weighs your answers about location, timing, customers, effort and budget to point you at the best starting machine.</p>
      <p>It's a starting point, not a final answer. Your exact location matters most. Read <a href="{{root}}blog/how-to-find-vending-machine-locations/">how to find great vending locations</a>, or <a href="{{root}}index.html#enquire">ask us</a> about your site.</p>`
  },
  {
    slug: 'is-vending-right-for-you',
    name: 'Is a vending machine business right for you?',
    metaTitle: 'Is a Vending Machine Business Right for You? Free Quiz | VNDR',
    description: 'Eight honest questions to find out if a vending machine business suits your time, budget and expectations, plus what to work on if it doesn\'t yet.',
    lede: 'Eight honest statements. Agree, somewhat, or disagree. You\'ll get a straight answer, and what to work on if you\'re not quite there yet.',
    meta: '8 questions · 2 minutes',
    script: root => `<script>runQuiz(document.getElementById('quiz'), { questions: READY_QUIZ.map(q => ({ q: q.q, opts: READY_OPTS })), render: renderReadyResult, root: '${root}' });</script>`,
    after: `
      <h2>What this quiz is (and isn't)</h2>
      <p>Vending can be a great business, but it isn't magic and it isn't completely passive. This quiz checks the things that tend to separate operators who do well from those who struggle: time, money, comfort with pitching, expectations, and a long-term mindset.</p>
      <p>Want the long version? Read <a href="{{root}}blog/is-a-vending-machine-business-a-good-idea/">Is a vending machine business a good idea for you?</a></p>`
  }
];

function quizHub() {
  const crumb = crumbs('../', [['Home', 'index.html'], ['Quizzes']]);
  writePage({
    pagePath: 'quiz/',
    active: 'quiz',
    title: 'Vending Business Quizzes | VNDR',
    description: 'Free quizzes to help you decide: is a vending machine business right for you, and which vending machine should you start with?',
    jsonld: [crumb.ld],
    body: root => `
<section class="blog-hero">
  <div class="wrap">
    ${crumb.html}
    <div class="eyebrow reveal">Quizzes</div>
    <h1 class="reveal">Find out in two minutes.</h1>
    <p class="lede reveal">Two quick quizzes to help you decide whether to start, and where to start.</p>
  </div>
</section>
<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="quiz-cards">
      <a class="quiz-card hot reveal" href="${root}quiz/is-vending-right-for-you/"><small>${QUIZZES[1].meta}</small><h2>${QUIZZES[1].name}</h2><p>${QUIZZES[1].lede}</p><span class="go">Start quiz →</span></a>
      <a class="quiz-card reveal" href="${root}quiz/which-vending-machine/"><small>${QUIZZES[0].meta}</small><h2>${QUIZZES[0].name}</h2><p>${QUIZZES[0].lede}</p><span class="go">Start quiz →</span></a>
    </div>
  </div>
</section>`
  });
}

function quizPage(q) {
  const crumb = crumbs('../../', [['Home', 'index.html'], ['Quizzes', 'quiz/'], [q.name]]);
  writePage({
    pagePath: `quiz/${q.slug}/`,
    active: 'quiz',
    title: q.metaTitle,
    description: q.description,
    jsonld: [crumb.ld],
    body: root => `
<section class="article-hero" style="padding-bottom:48px">
  <div class="wrap">
    <div class="inner">
      ${crumb.html}
      <div class="eyebrow reveal">Free quiz · ${q.meta}</div>
      <h1 class="reveal">${esc(q.name)}</h1>
      <p class="lede reveal">${esc(q.lede)}</p>
    </div>
  </div>
</section>
<div class="wrap">
  <div class="quiz-wrap"><div class="quiz" id="quiz" aria-live="polite"><noscript>This quiz needs JavaScript turned on.</noscript></div></div>
  <article class="prose" style="margin-top:96px">${q.after.replaceAll('{{root}}', root)}</article>
</div>
<section class="sec">
  <div class="wrap">
    ${ctaBand(root, { h: 'Prefer to talk it through?', p: 'Tell us about your plans and we\'ll give you an honest recommendation.', primary: ['Talk to VNDR', 'index.html#enquire'], secondary: ['Browse machines', 'machines/'] })}
  </div>
</section>`,
    scripts: root => `<script src="${root}quiz.js"></script>\n${q.script(root)}`
  });
}

/* ---------- Run ---------- */
buildProducts();
blogIndex();
POSTS.forEach(article);
quizHub();
QUIZZES.forEach(quizPage);

const all = ['', ...pages];
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(p => `  <url><loc>${BASE_URL}${p}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}
</urlset>
`);
console.log(`Built ${pages.length} pages + sitemap.xml`);
