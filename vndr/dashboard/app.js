/* VNDR operator dashboard. All data comes from VNDRData (data.js). */
(() => {
  const D = VNDRData;
  const NOW = D.now();
  const FLEET = D.machines();
  const TX = D.transactions();
  const view = $('#view');
  const tip = $('#tip');

  /* ---------- Formatting ---------- */
  const money = (n, dp = 0) => '$' + n.toLocaleString('en-AU', { minimumFractionDigits: dp, maximumFractionDigits: dp });
  const compactMoney = n => n >= 10000 ? '$' + (n / 1000).toFixed(n >= 100000 ? 0 : 1) + 'K' : money(n);
  const int = n => Math.round(n).toLocaleString('en-AU');
  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fmtDay = d => d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
  const fmtHour = h => (h % 12 || 12) + (h < 12 ? 'am' : 'pm');
  const fmtTime = d => d.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' });
  const ago = d => { const m = Math.round((NOW - d) / 6e4); return m < 1 ? 'just now' : m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + 'h ago' : Math.round(m / 1440) + 'd ago'; };
  const pct = (a, b) => b ? Math.round((a / b) * 100) : 0;

  const SITE_MACHINE = id => MACHINES.find(x => x.id === id);   // catalogue entry in site.js
  const fleetById = id => FLEET.find(m => m.id === id);
  const prodName = t => fleetById(t.m).products[t.p].name;

  /* ---------- Icons ---------- */
  const ic = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const I = {
    overview: ic('<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>'),
    machines: ic('<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 6h6M9 10h6M9 18h6"/>'),
    sales: ic('<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-6"/>'),
    map: ic('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    restock: ic('<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>'),
    ok: ic('<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>'),
    warn: ic('<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17.5v.01"/>'),
    off: ic('<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>'),
    drop: ic('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
    down: ic('<path d="M12 4v13M6 11l6 6 6-6M5 20h14"/>')
  };
  const STATUS = {
    online: [I.ok, 'Online'],
    attention: [I.warn, 'Needs attention'],
    offline: [I.off, 'Offline']
  };
  const statusChip = s => `<span class="status ${s}">${STATUS[s][0]}${STATUS[s][1]}</span>`;

  /* ---------- Data helpers ---------- */
  const sod = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const RANGES = { today: ['Today', 0], '7d': ['7 days', 6], '30d': ['30 days', 29], '90d': ['90 days', 89] };
  function window_(range) {
    const days = RANGES[range][1];
    const from = new Date(sod(NOW).getTime() - days * 864e5);
    const span = range === 'today' ? NOW - from : (days + 1) * 864e5;
    return { from, to: NOW, pFrom: new Date(from - (range === 'today' ? 864e5 : span)), pTo: new Date(range === 'today' ? NOW - 864e5 : from) };
  }
  const slice = (from, to, mid) => TX.filter(t => t.t >= from && t.t <= to && (!mid || mid === 'all' || t.m === mid));
  function sum(list) {
    let rev = 0, cogs = 0, comm = 0;
    list.forEach(t => { rev += t.price; cogs += t.cost; comm += t.price * fleetById(t.m).commission / 100; });
    return { rev, cogs, comm, profit: rev - cogs - comm, n: list.length };
  }
  function buckets(list, range, from) {
    if (range === 'today') {
      const out = Array.from({ length: NOW.getHours() + 1 }, (_, h) => ({ label: fmtHour(h), long: fmtHour(h) + (h === NOW.getHours() ? ' (so far)' : ''), v: 0 }));
      list.forEach(t => { out[t.t.getHours()].v += t.price; });
      return out;
    }
    const n = RANGES[range][1] + 1;
    const out = Array.from({ length: n }, (_, i) => { const d = new Date(from.getTime() + i * 864e5); return { label: fmtDay(d), long: DOW[d.getDay()] + ' ' + fmtDay(d), v: 0 }; });
    list.forEach(t => { const i = Math.floor((sod(t.t) - from) / 864e5); if (out[i]) out[i].v += t.price; });
    out[n - 1].long += ' (today, so far)';
    return out;
  }
  const restockNeeds = m => m.products.map(p => ({ ...p, need: p.cap - p.stock, lvl: p.stock / p.cap })).filter(p => p.lvl < 0.5);
  const needsVisit = m => restockNeeds(m).length > 0 || (m.water !== undefined && m.water < 40);

  /* ---------- State + routing ---------- */
  const state = { range: '7d', machine: 'all', page: 0 };
  try { const r = localStorage.getItem('vndr-range'); if (RANGES[r]) state.range = r; } catch {}

  const NAV = [['overview', 'Overview', I.overview], ['machines', 'Machines', I.machines], ['sales', 'Sales', I.sales], ['map', 'Locations', I.map], ['restock', 'Restock', I.restock]];
  function renderNav(active) {
    const due = FLEET.filter(needsVisit).length;
    $('#sideNav').innerHTML = NAV.map(([k, label, icon]) => `<a class="nav-item" href="#/${k}" ${k === active ? 'aria-current="page"' : ''}>${icon}<span>${label}</span>${k === 'restock' && due ? `<span class="count">${due}</span>` : ''}</a>`).join('');
  }

  function route() {
    const [, name = 'overview', arg] = location.hash.split('/');
    hideTip();
    if (map) { map.remove(); map = null; }
    const active = name === 'machine' ? 'machines' : name;
    renderNav(active);
    ({ overview, machines: machinesView, machine: machineView, sales: salesView, map: mapView, restock: restockView }[name] || overview)(arg);
    document.title = (name === 'machine' ? (fleetById(arg)?.nickname || 'Machine') : (NAV.find(n => n[0] === name)?.[1] || 'Overview')) + ' — VNDR Dashboard';
  }

  /* ---------- Shared UI ---------- */
  const rangeSeg = () => `<div class="seg2" role="group" aria-label="Date range">${Object.entries(RANGES).map(([k, [l]]) => `<button type="button" data-range="${k}" aria-pressed="${k === state.range}">${l}</button>`).join('')}</div>`;
  view.addEventListener('click', e => {
    const b = e.target.closest('[data-range]');
    if (b) { state.range = b.dataset.range; state.page = 0; try { localStorage.setItem('vndr-range', state.range); } catch {} rerender(); }
  });
  function rerender() { const y = scrollY; route(); scrollTo(0, y); }

  function tile(label, value, cur, prev, { hero = false, inverse = false, deltaFmt } = {}) {
    let d = '';
    if (prev !== undefined) {
      if (!prev) d = `<div class="delta flat">No data <span>for previous period</span></div>`;
      else {
        const ch = (cur - prev) / prev;
        const dir = Math.abs(ch) < 0.005 ? 'flat' : (ch > 0) !== inverse ? 'up' : 'down';
        d = `<div class="delta ${dir}">${ch > 0 ? '▲' : ch < 0 ? '▼' : '–'} ${Math.abs(ch * 100).toFixed(1)}% <span>vs previous ${state.range === 'today' ? 'day' : 'period'}</span></div>`;
      }
    }
    return `<div class="card tile ${hero ? 'tile-hero' : ''}"><div class="label">${label}</div><div class="value">${value}</div>${d}</div>`;
  }

  function meter(label, frac, txt) {
    const cls = frac < 0.2 ? 'crit' : frac < 0.4 ? 'warn' : '';
    return `<div class="meter ${cls}"><div class="meter-top"><span>${label}</span><b>${txt}</b></div><div class="meter-track" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(frac * 100)}" aria-label="${label}"><i style="width:${Math.max(2, frac * 100)}%"></i></div></div>`;
  }
  const stockFrac = m => m.products.reduce((a, p) => a + p.stock, 0) / m.products.reduce((a, p) => a + p.cap, 0);
  const machineMeters = m => meter('Stock', stockFrac(m), pct(stockFrac(m), 1) + '%') + (m.water !== undefined ? meter('Water', m.water / 100, m.water + '%') : '');

  function barList(items, fmt = money) {
    const max = Math.max(...items.map(i => i.v), 1);
    return `<div class="bars">${items.map(i => `
      <${i.href ? `a href="${i.href}"` : 'div'} class="bar-row">
        <span class="bar-label" title="${esc(i.label)}">${esc(i.label)}${i.sub ? `<small>${esc(i.sub)}</small>` : ''}</span>
        <span class="bar-track"><span class="bar-fill" style="width:calc(${(i.v / max) * 100}% - 70px)"></span><span class="bar-val">${fmt(i.v)}</span></span>
      </${i.href ? 'a' : 'div'}>`).join('')}</div>`;
  }

  function dataTable(rows, cols) {
    return `<div class="tbl-wrap"><table class="dtable"><thead><tr>${cols.map(c => `<th class="${c.num ? 'num' : ''}">${c.h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${cols.map(c => `<td class="${c.num ? 'num' : ''}">${c.f(r)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  /* ---------- Tooltip ---------- */
  function showTip(x, y, html) { tip.innerHTML = html; tip.style.left = x + 'px'; tip.style.top = (y + scrollY) + 'px'; tip.classList.add('on'); }
  function hideTip() { tip.classList.remove('on'); }

  /* ---------- Line / area chart (single series, crosshair tooltip) ---------- */
  function niceStep(v) { const p = Math.pow(10, Math.floor(Math.log10(v))); const n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p; }
  function lineChart(el, pts, { h = 240, name = 'Revenue', fmt = money } = {}) {
    const W = Math.max(280, el.clientWidth), H = h, pl = 52, pr = 14, pt = 12, pb = 30;
    const n = pts.length, step = niceStep(Math.max(...pts.map(p => p.v), 4) / 4), max = Math.ceil(Math.max(...pts.map(p => p.v), 1) / step) * step;
    const x = i => pl + (n === 1 ? (W - pl - pr) / 2 : i * (W - pl - pr) / (n - 1));
    const y = v => pt + (H - pt - pb) * (1 - v / max);
    const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step);
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join('');
    const area = `${line}L${x(n - 1)},${y(0)}L${x(0)},${y(0)}Z`;
    const every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor((W - pl) / 80))));
    const last = pts[n - 1];
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" height="${H}" tabindex="0" role="img" aria-label="${esc(name)} chart. Use left and right arrow keys to read values.">
      ${ticks.map(t => `<line x1="${pl}" x2="${W - pr}" y1="${y(t)}" y2="${y(t)}" stroke="${t ? 'var(--grid)' : 'var(--axis)'}" stroke-width="1"/><text class="axis-text" x="${pl - 10}" y="${y(t) + 4}" text-anchor="end">${t >= 1000 ? '$' + +(t / 1000).toFixed(1) + 'k' : '$' + t}</text>`).join('')}
      ${pts.map((p, i) => (i % every === 0 || i === n - 1) && !(i !== n - 1 && n - 1 - i < every / 2) ? `<text class="axis-text" x="${x(i)}" y="${H - 8}" text-anchor="${i === 0 && n > 1 ? 'start' : i === n - 1 && n > 1 ? 'end' : 'middle'}">${esc(p.label)}</text>` : '').join('')}
      <path d="${area}" fill="var(--accent)" fill-opacity="0.10"/>
      <path d="${line}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${x(n - 1)}" cy="${y(last.v)}" r="4" fill="var(--accent)" stroke="var(--surface)" stroke-width="2"/>
      <g class="xh" style="display:none"><line y1="${pt}" y2="${H - pb}" stroke="var(--ink-faint)" stroke-width="1"/><circle r="5" fill="var(--accent)" stroke="var(--surface)" stroke-width="2"/></g>
      <rect x="${pl}" y="0" width="${W - pl - pr}" height="${H}" fill="transparent" class="hit"/>
    </svg>`;
    const svg = el.querySelector('svg'), xh = svg.querySelector('.xh');
    let cur = n - 1;
    const show = i => {
      cur = i; const p = pts[i];
      xh.style.display = ''; xh.querySelector('line').setAttribute('x1', x(i)); xh.querySelector('line').setAttribute('x2', x(i));
      xh.querySelector('circle').setAttribute('cx', x(i)); xh.querySelector('circle').setAttribute('cy', y(p.v));
      const r = svg.getBoundingClientRect(), sx = r.width / W;
      showTip(r.left + x(i) * sx, r.top + y(p.v) * sx, `<b>${fmt(p.v)}</b><span><i></i>${esc(name)} · ${esc(p.long || p.label)}</span>`);
    };
    const hide = () => { xh.style.display = 'none'; hideTip(); };
    svg.querySelector('.hit').addEventListener('pointermove', e => {
      const r = svg.getBoundingClientRect(), px = (e.clientX - r.left) * W / r.width;
      show(Math.max(0, Math.min(n - 1, Math.round(n === 1 ? 0 : (px - pl) / ((W - pl - pr) / (n - 1))))));
    });
    svg.addEventListener('pointerleave', hide);
    svg.addEventListener('focus', () => show(cur));
    svg.addEventListener('blur', hide);
    svg.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(Math.max(0, cur - 1)); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(Math.min(n - 1, cur + 1)); }
    });
  }
  const chartTable = (pts, name = 'Revenue') => `<details class="table-toggle"><summary>View as table</summary>${dataTable(pts, [{ h: state.range === 'today' ? 'Hour' : 'Day', f: p => esc(p.long || p.label) }, { h: name, num: true, f: p => money(p.v, 2) }])}</details>`;

  /* ---------- Heatmap: hour x weekday (sequential, one hue) ---------- */
  function heatmap(list) {
    const g = Array.from({ length: 7 }, () => Array(24).fill(0));
    list.forEach(t => { g[t.t.getDay()][t.t.getHours()]++; });
    const max = Math.max(1, ...g.flat());
    const order = [1, 2, 3, 4, 5, 6, 0];
    const fill = v => v ? `rgba(200,255,46,${(0.12 + 0.88 * v / max).toFixed(3)})` : 'var(--card-2)';
    return `<div class="heat" role="grid" aria-label="Sales by hour and weekday">
      <span></span>${Array.from({ length: 24 }, (_, h) => `<span class="h">${h % 3 === 0 ? fmtHour(h).replace('m', '') : ''}</span>`).join('')}
      ${order.map(d => `<span class="d">${DOW[d]}</span>${g[d].map((v, h) => `<span class="c" tabindex="0" data-tip="${DOW[d]} ${fmtHour(h)}–${fmtHour((h + 1) % 24)}|${v}" style="background:${fill(v)}"></span>`).join('')}`).join('')}
    </div>
    <div class="heat-legend"><span>Fewer sales</span><span class="ramp">${[0, .25, .5, .75, 1].map(f => `<i style="background:${f ? fill(f * max) : 'var(--card-2)'}"></i>`).join('')}</span><span>More</span></div>`;
  }
  function bindHeat(root) {
    root.querySelectorAll('.c[data-tip]').forEach(c => {
      const on = () => { const [l, v] = c.dataset.tip.split('|'); const r = c.getBoundingClientRect(); showTip(r.left + r.width / 2, r.top, `<b>${v} sales</b><span>${l}</span>`); };
      c.addEventListener('pointerenter', on); c.addEventListener('focus', on);
      c.addEventListener('pointerleave', hideTip); c.addEventListener('blur', hideTip);
    });
  }

  /* =====================================================================
     VIEWS
     ===================================================================== */
  function overview() {
    const w = window_(state.range);
    const cur = slice(w.from, w.to), prev = slice(w.pFrom, w.pTo);
    const s = sum(cur), ps = sum(prev);
    const online = FLEET.filter(m => m.status !== 'offline').length;
    const pts = buckets(cur, state.range, w.from);
    const byMachine = FLEET.map(m => ({ label: m.nickname, sub: m.site, v: sum(cur.filter(t => t.m === m.id)).rev, href: '#/machine/' + m.id })).sort((a, b) => b.v - a.v);
    const alerts = [];
    FLEET.forEach(m => {
      if (m.status === 'offline') alerts.push(['crit', I.off, `${m.nickname} is offline`, `No connection since ${fmtTime(m.lastSync)}. Check power and network at ${m.site}.`, m]);
      const low = m.products.filter(p => p.stock / p.cap < 0.2);
      if (low.length) alerts.push(['warn', I.warn, `${m.nickname}: ${low.length} item${low.length > 1 ? 's' : ''} almost sold out`, low.map(p => p.name).join(', '), m]);
      if (m.water !== undefined && m.water < 25) alerts.push(['warn', I.drop, `${m.nickname}: water at ${m.water}%`, 'Refill on your next visit.', m]);
    });
    const recent = TX.slice(-8).reverse();
    const user = D.currentUser();

    view.innerHTML = `
      <div class="page-head"><div><h1>Good ${NOW.getHours() < 12 ? 'morning' : NOW.getHours() < 17 ? 'afternoon' : 'evening'}, ${esc(user.name.split(' ')[0])}.</h1><p>${esc(user.business)} · ${FLEET.length} machines · updated ${fmtTime(NOW)}</p></div></div>
      <div class="filters">${rangeSeg()}</div>
      <div class="grid">
        <div class="span-3">${tile('Revenue', money(s.rev), s.rev, ps.rev, { hero: true })}</div>
        <div class="span-3">${tile('Estimated profit', money(s.profit), s.profit, ps.profit)}</div>
        <div class="span-3">${tile('Sales', int(s.n), s.n, ps.n)}</div>
        <div class="span-3">${tile('Machines online', `${online} <span style="color:var(--ink-faint);font-size:.6em">/ ${FLEET.length}</span>`)}</div>
        <div class="card span-8"><div class="card-head"><div><h2>Revenue</h2><div class="sub">${state.range === 'today' ? 'By hour, today' : 'By day, last ' + RANGES[state.range][0]}</div></div><a href="#/sales">Sales detail →</a></div><div class="chart" id="revChart"></div>${chartTable(pts)}</div>
        <div class="card span-4"><div class="card-head"><div><h2>Alerts</h2><div class="sub">${alerts.length ? alerts.length + ' need' + (alerts.length === 1 ? 's' : '') + ' attention' : 'All clear'}</div></div><a href="#/restock">Restock plan →</a></div>
          <div class="alerts">${alerts.length ? alerts.map(([cls, icon, h, p, m]) => `<a class="alert ${cls}" href="#/machine/${m.id}">${icon}<div><b>${esc(h)}</b><span>${esc(p)}</span></div></a>`).join('') : `<div class="alert info">${I.ok}<div><b>Everything's running</b><span>No machines need attention.</span></div></div>`}</div>
        </div>
        <div class="card span-6"><div class="card-head"><div><h2>Revenue by machine</h2><div class="sub">Last ${RANGES[state.range][0].toLowerCase()}</div></div><a href="#/machines">All machines →</a></div>${barList(byMachine)}</div>
        <div class="card span-6"><div class="card-head"><div><h2>Latest sales</h2><div class="sub">Across all machines</div></div><a href="#/sales">All sales →</a></div>
          <div class="scroll-x">${dataTable(recent, [{ h: 'Time', f: t => ago(t.t) }, { h: 'Machine', f: t => `<a href="#/machine/${t.m}">${esc(fleetById(t.m).nickname)}</a>` }, { h: 'Product', f: t => esc(prodName(t)) }, { h: 'Price', num: true, f: t => money(t.price, 2) }])}</div>
        </div>
      </div>`;
    lineChart($('#revChart'), pts);
  }

  function machinesView() {
    const w = window_('today');
    view.innerHTML = `
      <div class="page-head"><div><h1>Machines</h1><p>${FLEET.length} machines · ${FLEET.filter(m => m.status === 'online').length} online, ${FLEET.filter(m => m.status === 'attention').length} need attention, ${FLEET.filter(m => m.status === 'offline').length} offline</p></div><a href="../machines/" class="btn btn-ghost btn-sm">Add a machine</a></div>
      <div class="mgrid">${FLEET.map(m => {
        const t = sum(slice(w.from, w.to, m.id));
        return `<a class="mcard" href="#/machine/${m.id}">
          ${machineSVG(SITE_MACHINE(m.model).art, 'fleet-' + m.id).replace('<svg', '<svg class="machine"')}
          <div>
            <h3>${esc(m.nickname)}</h3>
            <div class="mloc">${esc(m.site)} · ${esc(m.spot)}</div>
            <div class="row">${statusChip(m.status)}</div>
            <div class="today">Today <b>${money(t.rev)}</b> · ${t.n} sales</div>
          </div>
          <div class="meters">${machineMeters(m)}</div>
        </a>`;
      }).join('')}</div>`;
  }

  function machineView(id) {
    const m = fleetById(id);
    if (!m) { location.hash = '#/machines'; return; }
    const cat = SITE_MACHINE(m.model);
    const w = window_(state.range);
    const cur = slice(w.from, w.to, m.id), prev = slice(w.pFrom, w.pTo, m.id);
    const s = sum(cur), ps = sum(prev);
    const days = state.range === 'today' ? 1 : RANGES[state.range][1] + 1;
    const pts = buckets(cur, state.range, w.from);
    const sold = m.products.map((p, i) => ({ ...p, sold: cur.filter(t => t.p === i).length }));
    view.innerHTML = `
      <div class="mhead">
        ${machineSVG(cat.art, 'detail').replace('<svg', '<svg class="machine"')}
        <div>
          <a class="back" href="#/machines">← All machines</a>
          <h1>${esc(m.nickname)}</h1>
          <div class="meta2">${statusChip(m.status)}<span>${esc(cat.name)}</span><span>ID ${m.id}</span><span>Last sync ${ago(m.lastSync)}</span></div>
        </div>
      </div>
      <div class="filters">${rangeSeg()}</div>
      <div class="grid">
        <div class="span-3">${tile('Revenue', money(s.rev), s.rev, ps.rev, { hero: true })}</div>
        <div class="span-3">${tile('Estimated profit', money(s.profit), s.profit, ps.profit)}</div>
        <div class="span-3">${tile('Sales', int(s.n), s.n, ps.n)}</div>
        <div class="span-3">${tile('Average sales per day', (s.n / days).toFixed(1))}</div>
        <div class="card span-8"><div class="card-head"><div><h2>Revenue</h2><div class="sub">${state.range === 'today' ? 'By hour, today' : 'By day, last ' + RANGES[state.range][0]}</div></div></div><div class="chart" id="revChart"></div>${chartTable(pts)}</div>
        <div class="card span-4"><div class="card-head"><div><h2>Location</h2><div class="sub">${esc(m.site)}</div></div><a href="#/map">Map →</a></div>
          <div class="map map-sm" id="miniMap"></div>
          <dl class="kv" style="margin-top:12px">
            <div><dt>Spot</dt><dd>${esc(m.spot)}</dd></div>
            <div><dt>Access hours</dt><dd>${esc(m.hours)}</dd></div>
            <div><dt>Site contact</dt><dd>${esc(m.contact)}</dd></div>
            <div><dt>Commission</dt><dd>${m.commission}% of sales</dd></div>
            <div><dt>Installed</dt><dd>${new Date(m.installed).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</dd></div>
          </dl>
        </div>
        <div class="card span-7"><div class="card-head"><div><h2>Stock levels</h2><div class="sub">Live from the machine</div></div><a href="#/restock">Restock plan →</a></div>
          ${m.water !== undefined ? `<div style="margin-bottom:16px">${meter('Water tank', m.water / 100, m.water + '%')}</div>` : ''}
          <div class="scroll-x">${dataTable(sold, [
            { h: 'Product', f: p => esc(p.name) },
            { h: 'Level', f: p => `<div class="meter ${p.stock / p.cap < .2 ? 'crit' : p.stock / p.cap < .4 ? 'warn' : ''}"><div class="meter-track"><i style="width:${Math.max(2, p.stock / p.cap * 100)}%"></i></div></div>` },
            { h: 'In stock', num: true, f: p => `${p.stock} / ${p.cap}` },
            { h: 'Price', num: true, f: p => money(p.price, 2) },
            { h: 'Sold', num: true, f: p => p.sold }
          ])}</div>
        </div>
        <div class="card span-5"><div class="card-head"><div><h2>Best sellers</h2><div class="sub">Units sold, last ${RANGES[state.range][0].toLowerCase()}</div></div></div>${barList([...sold].sort((a, b) => b.sold - a.sold).map(p => ({ label: p.name, v: p.sold })), v => int(v))}</div>
        <div class="card span-12"><div class="card-head"><div><h2>When it sells</h2><div class="sub">Sales by hour and day, last ${RANGES[state.range === 'today' ? '30d' : state.range][0].toLowerCase()}</div></div></div><div id="heat">${heatmap(state.range === 'today' ? slice(window_('30d').from, NOW, m.id) : cur)}</div></div>
      </div>`;
    lineChart($('#revChart'), pts, { h: 330 });
    bindHeat($('#heat'));
    drawMap($('#miniMap'), [m], { zoom: 14, interactive: false });
  }

  function salesView() {
    const w = window_(state.range);
    const cur = slice(w.from, w.to, state.machine), prev = slice(w.pFrom, w.pTo, state.machine);
    const s = sum(cur), ps = sum(prev);
    const pts = buckets(cur, state.range, w.from);
    const best = state.range === 'today' ? null : [...pts].sort((a, b) => b.v - a.v)[0];
    const mix = {};
    cur.forEach(t => { const k = t.m + '|' + t.p; mix[k] = (mix[k] || 0) + t.price; });
    const top = Object.entries(mix).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => { const [mid, p] = k.split('|'); const m = fleetById(mid); return { label: m.products[p].name, sub: m.nickname, v }; });
    const rows = [...cur].reverse();
    const per = 25, pages = Math.max(1, Math.ceil(rows.length / per));
    state.page = Math.min(state.page, pages - 1);
    const pageRows = rows.slice(state.page * per, state.page * per + per);
    const heatList = state.range === 'today' ? slice(window_('30d').from, NOW, state.machine) : cur;

    view.innerHTML = `
      <div class="page-head"><div><h1>Sales</h1><p>Every sale, across every machine.</p></div></div>
      <div class="filters">
        ${rangeSeg()}
        <select class="select" id="mSel" aria-label="Machine"><option value="all">All machines</option>${FLEET.map(m => `<option value="${m.id}" ${m.id === state.machine ? 'selected' : ''}>${esc(m.nickname)}</option>`).join('')}</select>
        <span class="spacer"></span>
        <button class="btn btn-ghost btn-sm" id="csv">${I.down} Export CSV</button>
      </div>
      <div class="grid">
        <div class="span-3">${tile('Revenue', money(s.rev), s.rev, ps.rev, { hero: true })}</div>
        <div class="span-3">${tile('Sales', int(s.n), s.n, ps.n)}</div>
        <div class="span-3">${tile('Average sale', s.n ? money(s.rev / s.n, 2) : '–', s.n ? s.rev / s.n : 0, ps.n ? ps.rev / ps.n : undefined)}</div>
        <div class="span-3">${tile(best ? 'Best day' : 'Estimated profit', best ? `${money(best.v)}<div class="sub" style="font-size:13px;color:var(--ink-faint);font-weight:400;margin-top:4px">${esc(best.long)}</div>` : money(s.profit))}</div>
        <div class="card span-12"><div class="card-head"><div><h2>Revenue</h2><div class="sub">${state.machine === 'all' ? 'All machines' : esc(fleetById(state.machine).nickname)} · ${state.range === 'today' ? 'by hour' : 'by day'}</div></div></div><div class="chart" id="revChart"></div>${chartTable(pts)}</div>
        <div class="card span-7"><div class="card-head"><div><h2>When you sell</h2><div class="sub">Sales by hour and weekday${state.range === 'today' ? ', last 30 days' : ''}. Use it to plan restock visits outside peak times.</div></div></div><div id="heat">${heatmap(heatList)}</div></div>
        <div class="card span-5"><div class="card-head"><div><h2>Top products</h2><div class="sub">By revenue</div></div></div>${top.length ? barList(top) : '<p class="sub">No sales in this period.</p>'}</div>
        <div class="card span-12"><div class="card-head"><div><h2>Transactions</h2><div class="sub">${int(rows.length)} in this period</div></div></div>
          <div class="scroll-x">${dataTable(pageRows, [
            { h: 'Date', f: t => `${fmtDay(t.t)}, ${fmtTime(t.t)}` },
            { h: 'Machine', f: t => `<a href="#/machine/${t.m}">${esc(fleetById(t.m).nickname)}</a>` },
            { h: 'Product', f: t => esc(prodName(t)) },
            { h: 'Price', num: true, f: t => money(t.price, 2) },
            { h: 'Product cost', num: true, f: t => money(t.cost, 2) },
            { h: 'Margin', num: true, f: t => money(t.price - t.cost - t.price * fleetById(t.m).commission / 100, 2) }
          ])}</div>
          <div class="pager"><span>Page ${state.page + 1} of ${pages}</span><span style="display:flex;gap:8px"><button class="btn btn-ghost btn-sm" id="prev" ${state.page ? '' : 'disabled'}>← Newer</button><button class="btn btn-ghost btn-sm" id="next" ${state.page < pages - 1 ? '' : 'disabled'}>Older →</button></span></div>
        </div>
      </div>`;
    lineChart($('#revChart'), pts);
    bindHeat($('#heat'));
    $('#mSel').onchange = e => { state.machine = e.target.value; state.page = 0; rerender(); };
    $('#prev').onclick = () => { state.page--; rerender(); };
    $('#next').onclick = () => { state.page++; rerender(); };
    $('#csv').onclick = () => {
      const lines = [['date', 'time', 'machine_id', 'machine', 'product', 'price', 'product_cost', 'commission_pct']].concat(
        cur.map(t => { const m = fleetById(t.m); return [t.t.toISOString().slice(0, 10), t.t.toTimeString().slice(0, 5), m.id, m.nickname, m.products[t.p].name, t.price.toFixed(2), t.cost.toFixed(2), m.commission]; }));
      const csv = lines.map(r => r.map(v => /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v).join(',')).join('\n');
      const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: `vndr-sales-${state.range}.csv` });
      document.body.appendChild(a); a.click(); a.remove();
    };
  }

  function mapView() {
    view.innerHTML = `
      <div class="page-head"><div><h1>Locations</h1><p>Where your machines are, and how each one is doing.</p></div><a href="../blog/how-to-find-vending-machine-locations/" class="btn btn-ghost btn-sm">Find new locations</a></div>
      <div class="grid">
        <div class="card span-8" style="padding:8px"><div class="map" id="bigMap"></div></div>
        <div class="card span-4"><div class="card-head"><div><h2>Sites</h2><div class="sub">Revenue, last 30 days</div></div></div>
          <div class="map-list">${FLEET.map(m => { const w = window_('30d'); const r = sum(slice(w.from, w.to, m.id)).rev; return `<button type="button" data-fly="${m.id}"><b>${esc(m.nickname)}</b><span>${esc(m.site)} · ${esc(m.spot)}</span><span style="display:flex;justify-content:space-between;align-items:center;margin-top:4px">${statusChip(m.status)}<b class="tnum">${money(r)}</b></span></button>`; }).join('')}</div>
        </div>
      </div>`;
    drawMap($('#bigMap'), FLEET, { popups: true });
    view.querySelectorAll('[data-fly]').forEach(b => b.onclick = () => {
      const m = fleetById(b.dataset.fly);
      if (map) { map.flyTo([m.lat, m.lng], 14, { duration: .6 }); markers[m.id]?.openPopup(); }
    });
  }

  function restockView() {
    const due = FLEET.filter(needsVisit).sort((a, b) => (b.status === 'attention') - (a.status === 'attention') || stockFrac(a) - stockFrac(b));
    const totals = {};
    due.forEach(m => restockNeeds(m).forEach(p => { totals[p.name] = (totals[p.name] || 0) + p.need; }));
    const units = Object.values(totals).reduce((a, b) => a + b, 0);
    view.innerHTML = `
      <div class="page-head"><div><h1>Restock plan</h1><p>${due.length ? `${due.length} machine${due.length > 1 ? 's' : ''} to visit · ${units} units to pack` : 'Nothing to restock right now.'}</p></div></div>
      ${due.length ? `<div class="grid">
        <div class="span-8"><div class="route">${due.map(m => `
          <div class="rcard" id="rc-${m.id}">
            <div class="rhead"><div><h3>${esc(m.nickname)}</h3><p>${esc(m.site)} · ${esc(m.spot)} · open ${esc(m.hours)}</p></div>${statusChip(m.status)}</div>
            <div class="pick">
              <span class="sub">Product</span><span class="sub" style="text-align:right">Level</span><span class="sub" style="text-align:right">Bring</span>
              ${restockNeeds(m).sort((a, b) => a.lvl - b.lvl).map(p => `<span>${esc(p.name)}</span><span class="lvl">${p.stock}/${p.cap}</span><span class="q">${p.need}</span>`).join('')}
              ${m.water !== undefined && m.water < 40 ? `<span>Water tank refill</span><span class="lvl">${m.water}%</span><span class="q">Fill</span>` : ''}
            </div>
            <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" data-done="${m.id}">Mark as restocked</button><a class="btn btn-ghost btn-sm" href="#/machine/${m.id}">View machine</a></div>
          </div>`).join('')}</div></div>
        <div class="span-4"><div class="card"><div class="card-head"><div><h2>Packing list</h2><div class="sub">Everything for this run</div></div></div>
          <div class="scroll-x">${dataTable(Object.entries(totals).sort((a, b) => b[1] - a[1]), [{ h: 'Product', f: r => esc(r[0]) }, { h: 'Units', num: true, f: r => r[1] }])}</div>
        </div></div>
      </div>` : `<div class="card empty-state"><b>All stocked up.</b>Every machine is above 50% on every product.</div>`}`;
    view.querySelectorAll('[data-done]').forEach(b => b.onclick = () => { D.markRestocked(b.dataset.done); rerender(); });
  }

  /* ---------- Map (Leaflet + CARTO dark tiles) ---------- */
  let map = null, markers = {};
  function drawMap(el, list, { zoom, interactive = true, popups = false } = {}) {
    if (!window.L) { el.innerHTML = '<div class="map-fallback">Map unavailable offline.<br>Locations are listed alongside.</div>'; return; }
    map = L.map(el, { zoomControl: interactive, dragging: interactive, scrollWheelZoom: false, attributionControl: true, keyboard: interactive });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>', subdomains: 'abcd', maxZoom: 19 }).addTo(map);
    markers = {};
    list.forEach(m => {
      const mk = L.marker([m.lat, m.lng], { icon: L.divIcon({ className: '', html: `<div class="pin ${m.status}" title="${esc(m.nickname)}"></div>`, iconSize: [18, 18], iconAnchor: [9, 9] }), keyboard: interactive, title: m.nickname }).addTo(map);
      if (popups) mk.bindPopup(`<b>${esc(m.nickname)}</b><br>${esc(m.site)}<br>${STATUS[m.status][1]} · stock ${pct(stockFrac(m), 1)}%<br><a href="#/machine/${m.id}">Open machine →</a>`);
      markers[m.id] = mk;
    });
    if (list.length === 1) map.setView([list[0].lat, list[0].lng], zoom || 14);
    else map.fitBounds(L.latLngBounds(list.map(m => [m.lat, m.lng])).pad(0.2));
  }

  /* ---------- Login ---------- */
  function showApp() { $('#login').hidden = true; $('#app').hidden = false; const u = D.currentUser(); $('#userName').textContent = u.name; $('#userEmail').textContent = u.email; $('#avatar').textContent = u.name.split(' ').map(x => x[0]).join(''); route(); }
  function showLogin() {
    $('#app').hidden = true; $('#login').hidden = false;
    $('#loginMachines').innerHTML = ['snack', 'ramen', 'coffee'].map((k, i) => machineSVG(k, 'login' + i)).join('');
  }
  $('#loginForm').addEventListener('submit', e => { e.preventDefault(); D.signIn($('#lEmail').value); location.hash = '#/overview'; showApp(); });
  $('#demoBtn').onclick = () => { D.signIn(); location.hash = '#/overview'; showApp(); };
  const signOut = () => { D.signOut(); history.replaceState(null, '', location.pathname); showLogin(); };
  $('#signout').onclick = signOut; $('#signout2').onclick = signOut;

  addEventListener('hashchange', () => { if (D.currentUser()) { route(); scrollTo(0, 0); } });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (D.currentUser() && !map) rerender(); }, 200); });
  addEventListener('scroll', hideTip, { passive: true });

  D.currentUser() ? showApp() : showLogin();
})();
