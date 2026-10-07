/* =====================================================================
   VNDR quizzes. Needs site.js loaded first (MACHINES, machineSVG, esc).
   Edit questions and scoring below.
   ===================================================================== */

/* ---------- Quiz 1: Which vending machine is right for you? ----------
   Each option adds points to machine ids (see MACHINES in site.js). */
const MACHINE_QUIZ = [
  {
    q: 'Where are you thinking of placing your machine?',
    opts: [
      { t: 'Office or workplace', s: { coffee: 3, 'snack-chilled': 3, snack: 2 } },
      { t: 'Gym or sports centre', s: { drinks: 4, 'snack-chilled': 2 } },
      { t: 'University or student accommodation', s: { ramen: 4, 'ramen-keypad': 3, snack: 2, drinks: 1 } },
      { t: 'Hospital or healthcare', s: { coffee: 3, 'snack-chilled': 3, ramen: 2 } },
      { t: 'Warehouse, factory or distribution centre', s: { 'ramen-keypad': 4, ramen: 2, snack: 3, drinks: 2 } },
      { t: 'Not sure yet', sub: 'That\'s fine, we\'ll go on your other answers', s: { snack: 2, ramen: 1 } }
    ]
  },
  {
    q: 'When will your location be busiest?',
    opts: [
      { t: 'Business hours, weekdays', s: { coffee: 3, 'snack-chilled': 2, snack: 2 } },
      { t: 'Early mornings', s: { coffee: 4 } },
      { t: 'Late nights or 24/7', s: { ramen: 3, 'ramen-keypad': 3, snack: 1 } },
      { t: 'Evenings and weekends', s: { drinks: 3, snack: 2, ramen: 1 } }
    ]
  },
  {
    q: 'What would you most like customers to say?',
    opts: [
      { t: '"Exactly what I needed."', s: { snack: 3, drinks: 3 } },
      { t: '"Wait… this is so cool."', s: { ramen: 5 } },
      { t: '"Finally, decent coffee."', s: { coffee: 5 } },
      { t: '"A proper meal option, at last."', s: { 'snack-chilled': 3, 'ramen-keypad': 3, ramen: 2 } }
    ]
  },
  {
    q: 'How hands-on do you want to be?',
    opts: [
      { t: 'As little as possible', sub: 'Long-life stock, simple routine', s: { snack: 4, drinks: 2 } },
      { t: 'Happy to restock fresh food regularly', s: { 'snack-chilled': 4 } },
      { t: 'Fine with refills and cleaning', sub: 'Water, ingredients, dispensing area', s: { ramen: 2, 'ramen-keypad': 2, coffee: 3 } }
    ]
  },
  {
    q: 'What matters more to you right now?',
    opts: [
      { t: 'Start lean and prove the idea', s: { snack: 3, 'ramen-keypad': 2, drinks: 1 } },
      { t: 'Stand out from every other machine', s: { ramen: 4, coffee: 1 } },
      { t: 'Highest everyday demand', s: { drinks: 3, coffee: 2, snack: 1 } }
    ]
  },
  {
    q: 'Touchscreen or keypad?',
    opts: [
      { t: 'Touchscreen. Modern and interactive.', s: { ramen: 2, coffee: 2 } },
      { t: 'Keypad. Simple and familiar.', s: { 'ramen-keypad': 2, snack: 1, drinks: 1, 'snack-chilled': 1 } },
      { t: 'No preference', s: {} }
    ]
  }
];

const MACHINE_REASONS = {
  ramen: ['A hot meal that stands out from every snack machine', 'Built for late nights, students and shift workers', 'Touchscreen ordering and online monitoring'],
  'ramen-keypad': ['A hot meal option for hungry, busy locations', 'Simple keypad ordering anyone can use', 'Shelf-stable noodles mean less waste'],
  'snack-chilled': ['Fresh food and cold drinks from one machine', 'A real lunch option for workplaces and hospitals', 'Higher-value items than a standard snack machine'],
  snack: ['The simplest machine to start and run', 'Long-life stock with very little waste', 'Easy to pitch to almost any location'],
  drinks: ['Consistent, everyday demand', 'Simple, focused range to manage', 'Perfect for active, thirsty locations'],
  coffee: ['A daily habit, so lots of repeat customers', 'Strong all-day demand in workplaces', 'Fills the gap when the café is closed']
};

/* ---------- Quiz 2: Is a vending business right for you? ----------
   Answers score 2 / 1 / 0. "rev: true" flips the scoring. */
const READY_QUIZ = [
  { q: 'I can set aside a few hours each week for restocking and upkeep.', key: 'time', tip: ['Make time first', 'Even one machine needs regular visits. Look for a location close to home or work so restocking fits into your week.'] },
  { q: 'I have money set aside that I could invest without needing it back quickly.', key: 'capital', tip: ['Build a buffer', 'Plan for the machine, opening stock and a cushion for slow early months. See our cost guide before you commit.'] },
  { q: 'I\'d be comfortable walking into a business and asking to place a machine.', key: 'pitch', tip: ['Practise the pitch', 'Start with places you already know: your workplace, your gym. A warm introduction makes the first "yes" much easier.'] },
  { q: 'I expect vending to be completely passive from day one.', rev: true, key: 'expect', tip: ['Reset expectations', 'Vending can run without you there every day, but it\'s not zero effort. The operators who do well treat it like a real business.'] },
  { q: 'I enjoy tracking numbers and making small improvements.', key: 'data', tip: ['Use the numbers', 'The difference between an average and a good machine is often small tweaks: products, pricing, placement. Check sales every restock.'] },
  { q: 'I\'m OK if my first location isn\'t my best one.', key: 'patience', tip: ['Expect to learn', 'Your first site teaches you the playbook. Be ready to move a machine if a location underperforms.'] },
  { q: 'I don\'t mind physical tasks like carrying stock and cleaning.', key: 'physical', tip: ['Plan the legwork', 'If physical work isn\'t for you, budget for help with restocking, or choose a location with easy access.'] },
  { q: 'I\'m thinking long-term: one machine now, more later.', key: 'longterm', tip: ['Think beyond one machine', 'Vending rewards people who reinvest. One working machine is proof; the next ones are where it becomes a business.'] }
];
const READY_OPTS = [{ t: 'Agree', v: 2 }, { t: 'Somewhat', v: 1 }, { t: 'Disagree', v: 0 }];


/* ---------- Engine ---------- */
function runQuiz(el, { questions, render, root }) {
  const answers = [];
  let i = 0;
  const keys = 'ABCDEF';
  function show() {
    if (i >= questions.length) return finish();
    const q = questions[i];
    el.innerHTML = `
      <div class="q-progress" aria-hidden="true"><i style="width:${(i / questions.length) * 100}%"></i></div>
      <div class="q-count">Question ${i + 1} of ${questions.length}</div>
      <h2 class="q-title" tabindex="-1">${esc(q.q)}</h2>
      <div class="q-opts">${q.opts.map((o, j) => `<button type="button" class="q-opt" data-j="${j}"><span class="k">${keys[j]}</span><span>${esc(o.t)}${o.sub ? `<small>${esc(o.sub)}</small>` : ''}</span></button>`).join('')}</div>
      <div class="q-nav"><button type="button" class="q-back" ${i ? '' : 'hidden'}>← Back</button></div>`;
    el.querySelector('.q-title').focus({ preventScroll: true });
  }
  function finish() {
    el.innerHTML = `<div class="q-progress" aria-hidden="true"><i style="width:100%"></i></div><div class="q-result">${render(answers, root)}</div>`;
    el.querySelector('[data-restart]')?.addEventListener('click', () => { answers.length = 0; i = 0; show(); });
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  el.addEventListener('click', e => {
    const o = e.target.closest('.q-opt');
    if (o) { answers[i] = questions[i].opts[+o.dataset.j]; i++; show(); return; }
    if (e.target.closest('.q-back')) { i = Math.max(0, i - 1); show(); }
  });
  el.addEventListener('keydown', e => {
    const k = keys.indexOf(e.key.toUpperCase());
    const btn = k >= 0 && el.querySelector(`.q-opt[data-j="${k}"]`);
    if (btn) btn.click();
  });
  show();
}

function renderMachineResult(answers, root) {
  const score = {};
  MACHINES.forEach(m => { score[m.id] = 0; });
  answers.forEach(a => Object.entries(a.s).forEach(([k, v]) => { score[k] += v; }));
  const ranked = [...MACHINES].sort((a, b) => score[b.id] - score[a.id]);
  const [top, second] = ranked;
  return `
    <div class="eyebrow">Your match</div>
    <h2>${esc(top.name)}.</h2>
    <p>Based on your answers, this is the machine we'd look at first for your plans.</p>
    <div class="q-match">
      ${machineSVG(top.art, 'quiz')}
      <div>
        <h3>${esc(top.name)}</h3>
        <p>${esc(top.short)}</p>
        <ul>${(MACHINE_REASONS[top.id] || []).map(r => `<li>${esc(r)}</li>`).join('')}</ul>
        <div class="q-actions">
          <a class="btn btn-primary" href="${root}${top.page}">View machine <span class="arrow">→</span></a>
          <a class="btn btn-ghost" href="${root}index.html?machine=${top.id}#enquire">Get pricing</a>
        </div>
      </div>
    </div>
    <p class="q-runner">Also worth a look: <a href="${root}${second.page}">${esc(second.name)}</a>, ${esc(second.short.charAt(0).toLowerCase() + second.short.slice(1))}</p>
    <div class="q-actions">
      <button type="button" class="btn btn-ghost" data-restart>Retake quiz</button>
      <a class="btn btn-ghost" href="${root}machines/">Compare all machines</a>
    </div>`;
}

function renderReadyResult(answers, root) {
  let total = 0;
  const weak = [];
  answers.forEach((a, i) => {
    const q = READY_QUIZ[i];
    const v = q.rev ? 2 - a.v : a.v;
    total += v;
    if (v < 2) weak.push({ v, tip: q.tip });
  });
  const pct = Math.round((total / (READY_QUIZ.length * 2)) * 100);
  weak.sort((a, b) => a.v - b.v);
  const tier = pct >= 75
    ? ['You\'re ready to start.', 'You\'ve got the mindset, time and expectations that vending rewards. The next step is matching a machine to a location.', ['Find your machine', 'quiz/which-vending-machine/']]
    : pct >= 45
      ? ['A good fit, with some prep.', 'Vending could work well for you. Tighten up the areas below before you buy, and you\'ll start on much stronger footing.', ['How to start, step by step', 'blog/how-to-start-a-vending-machine-business/']]
      : ['Not yet, but that can change.', 'Right now, a few things would make vending harder than it needs to be. Work on the areas below, and come back when you\'re ready.', ['Read the honest guide', 'blog/is-a-vending-machine-business-a-good-idea/']];
  return `
    <div class="eyebrow">Your result</div>
    <div class="q-score"><b>${pct}%</b><span>vending-ready</span></div>
    <h2>${tier[0]}</h2>
    <p>${tier[1]}</p>
    ${weak.length ? `<div class="q-tips">${weak.slice(0, 4).map(w => `<div><b>${esc(w.tip[0])}</b>${esc(w.tip[1])}</div>`).join('')}</div>` : ''}
    <div class="q-actions">
      <a class="btn btn-primary" href="${root}${tier[2][1]}">${tier[2][0]} <span class="arrow">→</span></a>
      <button type="button" class="btn btn-ghost" data-restart>Retake quiz</button>
    </div>`;
}
