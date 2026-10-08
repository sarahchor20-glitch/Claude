/* =====================================================================
   VNDR — shared machine catalogue + site helpers
   Loaded by every page. The page generator (_build/build.mjs) also reads
   MACHINES and machineSVG from this file to write the product pages.

   EDIT MACHINES HERE. Every page updates automatically.
   "On enquiry" = placeholder. Replace with real specs when you have them.
   ===================================================================== */

const CATEGORIES = [
  { id: 'ramen',  name: 'Ramen',  blurb: 'Hot noodles on demand. The specialty machine people stop for.' },
  { id: 'snack',  name: 'Snack',  blurb: 'The backbone of vending: chilled or ambient, built to sell every day.' },
  { id: 'drinks', name: 'Drinks', blurb: 'Cold drinks, high turnover, simple to stock and run.' },
  { id: 'coffee', name: 'Coffee', blurb: 'Hot drinks at any hour, wherever people start their day.' }
];

const MACHINES = [
  {
    id: 'ramen',
    page: 'machines/ramen-vending-machine/#touchscreen',   // product page (relative to the site root)
    category: 'ramen',
    name: 'Ramen Machine: Touchscreen',
    tag: 'Specialty',
    price: 'From $5,997',
    interface: 'Touchscreen',
    temp: 'Hot water',
    short: 'Interactive touchscreen ordering with an integrated hot-water system.',
    desc: 'Our flagship specialty machine. Customers browse and order on a large interactive touchscreen, collect their cup, and fill it at the built-in hot-water station. It stands out from every snack machine in the building.',
    features: ['Interactive touchscreen', 'Hot-water system', 'Online machine monitoring', 'Custom branding / wrap', 'Product storage', 'Cutlery compartment', 'Independent water storage'],
    specs: {
      'Dimensions': 'On enquiry',
      'Capacity': 'On enquiry',
      'Suitable products': 'Cup and bowl instant noodles, cutlery, condiments',
      'Ideal locations': 'Universities, student accommodation, hospitals, transport hubs, late-night venues',
      'Shipping': 'On enquiry'
    },
    art: 'ramen',
    photo: 'images/machines/ramen-touchscreen-black',   // product photo (relative to site root); shown instead of the illustration on cards
    photoAlt: 'Black VNDR touchscreen ramen vending machine stocked with cup noodles'
  },
  {
    id: 'ramen-keypad',
    page: 'machines/ramen-vending-machine/#keypad',   // product page (relative to the site root)
    category: 'ramen',
    name: 'Ramen Machine: Keypad',
    tag: 'Specialty',
    price: 'Price on enquiry',
    interface: 'Keypad',
    temp: 'Hot water',
    short: 'The same hot-ramen concept with simple keypad selection.',
    desc: 'The ramen concept with a straightforward keypad instead of a touchscreen. Customers punch in their selection, collect their cup and add hot water from the built-in station. It\'s simple for customers and simple for you.',
    features: ['Keypad selection', 'Hot-water system', 'Product storage', 'Cutlery compartment', 'Independent water storage'],
    specs: {
      'Dimensions': 'On enquiry',
      'Capacity': 'On enquiry',
      'Suitable products': 'Cup and bowl instant noodles, cutlery, condiments',
      'Ideal locations': 'Student accommodation, warehouses, gyms, offices, transport hubs',
      'Shipping': 'On enquiry'
    },
    art: 'ramen-keypad'
  },
  {
    id: 'snack-chilled',
    page: 'machines/refrigerated-snack-vending-machine/',   // product page (relative to the site root)
    category: 'snack',
    name: 'Refrigerated Snack Machine',
    tag: 'Refrigerated',
    price: 'Price on enquiry',
    interface: 'Keypad',
    temp: 'Refrigerated',
    short: 'Chilled snacks, fresh food and cold drinks in one machine.',
    desc: 'A refrigerated snack machine that opens up a much bigger product range: fresh food, dairy, chilled snacks and cold drinks alongside the classics.',
    features: ['Refrigerated cabinet', 'Glass display front', 'Adjustable spirals', 'Card & contactless ready'],
    specs: {
      'Dimensions': 'On enquiry',
      'Capacity': 'On enquiry',
      'Suitable products': 'Sandwiches, salads, yoghurt, chocolate, chilled snacks, cans and bottles',
      'Ideal locations': 'Offices, hospitals, gyms, universities, warehouses',
      'Shipping': 'On enquiry'
    },
    art: 'snack-chilled',
    photo: 'images/machines/snack-drink-front',
    photoAlt: 'VNDR snack and drink vending machine stocked with snacks and cold drinks'
  },
  {
    id: 'snack',
    page: 'machines/snack-vending-machine/',   // product page (relative to the site root)
    category: 'snack',
    name: 'Non-Refrigerated Snack Machine',
    tag: 'Best first machine',
    price: 'Price on enquiry',
    interface: 'Keypad',
    temp: 'Ambient',
    short: 'The classic snack machine. Simple, reliable, easy to start with.',
    desc: 'The machine most vending businesses start with. Shelf-stable snacks, no refrigeration to run, and products that last, making it easy to stock and easy to place.',
    features: ['Ambient (no refrigeration)', 'Glass display front', 'Adjustable spirals', 'Card & contactless ready'],
    specs: {
      'Dimensions': 'On enquiry',
      'Capacity': 'On enquiry',
      'Suitable products': 'Chips, chocolate, bars, nuts, lollies, personal-care items',
      'Ideal locations': 'Offices, warehouses, apartment buildings, shopping centres, entertainment venues',
      'Shipping': 'On enquiry'
    },
    art: 'snack',
    photo: 'images/machines/snack-drink-hallway',
    photoAlt: 'Black VNDR snack vending machine in a hallway'
  },
  {
    id: 'drinks',
    page: 'machines/drink-vending-machine/',   // product page (relative to the site root)
    category: 'drinks',
    name: 'Drinks Machine',
    tag: 'Refrigerated',
    price: 'Price on enquiry',
    interface: 'Keypad',
    temp: 'Refrigerated',
    short: 'Cold drinks, high turnover, simple to run.',
    desc: 'A glass-front refrigerated machine for water, soft drinks, energy drinks and protein shakes. It\'s simple to stock and quick to sell through.',
    features: ['Refrigerated', 'Glass display front', 'Card & contactless ready'],
    specs: {
      'Dimensions': 'On enquiry',
      'Capacity': 'On enquiry',
      'Suitable products': 'Water, soft drinks, energy drinks, sports drinks, protein shakes',
      'Ideal locations': 'Gyms, sports centres, warehouses, transport hubs, universities',
      'Shipping': 'On enquiry'
    },
    art: 'drinks',
    photo: 'images/machines/studio-front-2',
    photoAlt: 'Black VNDR vending machine with chilled drinks, front view'
  },
  {
    id: 'coffee',
    page: 'machines/coffee-vending-machine/',   // product page (relative to the site root)
    category: 'coffee',
    name: 'Coffee Vending Machine',
    tag: 'Hot drinks',
    price: 'Price on enquiry',
    interface: 'Touchscreen',
    temp: 'Hot drinks',
    short: 'Fresh hot drinks, made to order, any time of day.',
    desc: 'A made-to-order coffee machine for the places where people need a decent coffee and the café is closed, too far away or too busy.',
    features: ['Made-to-order hot drinks', 'Automatic cup dispensing', 'Card & contactless ready'],
    specs: {
      'Dimensions': 'On enquiry',
      'Capacity': 'On enquiry',
      'Suitable products': 'Coffee, hot chocolate, tea',
      'Ideal locations': 'Offices, hospitals, car dealerships, universities, transport hubs',
      'Shipping': 'On enquiry'
    },
    art: 'coffee'
  }
];


/* ---------- Helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const priceLabel = m => m.price.startsWith('From') ? 'From' : 'Pricing';
const priceValue = m => m.price.replace(/^From\s*/, '').replace('Price on enquiry', 'On enquiry');


/* ---------- Machine illustrations (SVG) ---------- */
function machineSVG(kind, uid) {
  const id = kind + '-' + uid;
  const body = `
    <defs>
      <linearGradient id="b${id}" x1="0" x2="1"><stop offset="0" stop-color="#26262b"/><stop offset=".5" stop-color="#34343a"/><stop offset="1" stop-color="#1c1c20"/></linearGradient>
      <linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1013"/><stop offset="1" stop-color="#18191d"/></linearGradient>
      <linearGradient id="s${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c8ff2e"/><stop offset="1" stop-color="#7bd11a"/></linearGradient>
      <linearGradient id="r${id}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="c${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b2418"/><stop offset="1" stop-color="#1a0f0a"/></linearGradient>
    </defs>
    <ellipse cx="110" cy="392" rx="96" ry="8" fill="#000" opacity=".5"/>
    <rect x="16" y="10" width="188" height="374" rx="12" fill="url(#b${id})" stroke="#3f3f46" stroke-width="1"/>
    <rect x="16" y="10" width="188" height="34" rx="12" fill="#111114"/>
    <rect x="16" y="32" width="188" height="12" fill="#111114"/>
    <text x="30" y="33" font-family="Inter Tight, sans-serif" font-weight="800" font-size="15" letter-spacing="-0.5" fill="#f4f4f1">VNDR<tspan fill="#c8ff2e">.</tspan></text>
    <circle cx="188" cy="27" r="3.5" fill="#c8ff2e"/>
    <rect x="22" y="370" width="176" height="10" rx="3" fill="#111114"/>`;

  const tap = `<rect x="163" y="184" width="24" height="24" rx="4" fill="#222227"/><text x="175" y="200" text-anchor="middle" font-size="10" fill="#888">◎</text>`;
  const keypad = (x, y, cols, rows, gap = 11) => {
    let k = '';
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) k += `<rect x="${x + c * gap}" y="${y + r * gap}" width="${gap - 2}" height="${gap - 2}" rx="2" fill="#2a2a30"/>`;
    return k;
  };
  const ramenLower = () => {
    let cups = '';
    const cols = ['#e94e3c', '#f2b134', '#f4f4f1', '#e94e3c', '#3c8ce9'];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
      const x = 32 + c * 22, y = 158 + r * 34;
      cups += `<path d="M${x} ${y} h16 l-2 20 h-12z" fill="${cols[(c + r) % 5]}"/><rect x="${x-1}" y="${y-3}" width="18" height="4" rx="1" fill="#ddd"/>`;
    }
    return `
      <rect x="26" y="150" width="122" height="114" rx="6" fill="url(#g${id})" stroke="#2b2b31"/>
      ${cups}
      <rect x="26" y="150" width="122" height="114" rx="6" fill="url(#r${id})"/>
      <rect x="26" y="274" width="168" height="84" rx="8" fill="#08080a"/>
      <rect x="96" y="278" width="28" height="12" rx="3" fill="#2b2b31"/><rect x="106" y="290" width="8" height="8" fill="#3a3a40"/>
      <path d="M110 300 v18" stroke="#9fd8ff" stroke-width="2.5" stroke-dasharray="3 3" opacity=".8"/>
      <path d="M90 322 h40 l-5 26 h-30z" fill="#e94e3c"/><rect x="88" y="318" width="44" height="5" rx="2" fill="#eee"/>
      <path d="M100 312 q4 -8 0 -16 M120 312 q4 -8 0 -16" stroke="#fff" stroke-width="1.5" fill="none" opacity=".35" stroke-linecap="round"/>
      <rect x="150" y="290" width="36" height="58" rx="5" fill="#141417"/><text x="168" y="323" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="6" fill="#777">CUTLERY</text>`;
  };
  const bowl = (cx, cy, s = 1) => `
      <path d="M${cx - 18*s} ${cy} h${36*s} a${18*s} ${18*s} 0 0 1 ${-36*s} 0z" fill="#0b0b0c"/>
      <path d="M${cx - 8*s} ${cy - 6} q3 -6 0 -12 M${cx} ${cy - 6} q3 -6 0 -12 M${cx + 8*s} ${cy - 6} q3 -6 0 -12" stroke="#0b0b0c" stroke-width="2" fill="none" stroke-linecap="round"/>`;

  let inner = '';
  if (kind === 'ramen') {
    inner = `
      <rect x="26" y="54" width="168" height="88" rx="8" fill="#0a0a0c"/>
      <rect x="31" y="59" width="158" height="78" rx="5" fill="url(#s${id})"/>
      <text x="42" y="82" font-family="Inter Tight, sans-serif" font-weight="800" font-size="16" fill="#0b0b0c">HOT RAMEN</text>
      <text x="42" y="97" font-family="JetBrains Mono, monospace" font-size="8" fill="#0b0b0c" opacity=".7">TAP TO ORDER</text>
      ${bowl(158, 104)}
      <rect x="42" y="112" width="52" height="14" rx="7" fill="#0b0b0c"/><text x="51" y="122" font-family="Inter, sans-serif" font-size="7" font-weight="600" fill="#c8ff2e">ORDER →</text>
      <rect x="156" y="150" width="38" height="114" rx="6" fill="#141417"/>
      <rect x="163" y="160" width="24" height="16" rx="3" fill="#0a0a0c"/><rect x="166" y="165" width="18" height="2" fill="#c8ff2e" opacity=".8"/>
      ${tap}
      <rect x="163" y="216" width="24" height="40" rx="4" fill="#222227"/><path d="M168 228 h14 M168 236 h14 M168 244 h14" stroke="#555" stroke-width="2"/>
      ${ramenLower()}`;
  } else if (kind === 'ramen-keypad') {
    inner = `
      <rect x="26" y="54" width="168" height="88" rx="8" fill="#141417"/>
      <rect x="31" y="59" width="100" height="78" rx="5" fill="url(#s${id})"/>
      <text x="40" y="80" font-family="Inter Tight, sans-serif" font-weight="800" font-size="13" fill="#0b0b0c">HOT</text>
      <text x="40" y="94" font-family="Inter Tight, sans-serif" font-weight="800" font-size="13" fill="#0b0b0c">RAMEN</text>
      ${bowl(98, 116, 0.8)}
      <rect x="138" y="60" width="50" height="14" rx="3" fill="#0a0a0c"/><text x="163" y="70" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7" fill="#c8ff2e">A3</text>
      ${keypad(141, 80, 4, 5, 11)}
      <rect x="156" y="150" width="38" height="114" rx="6" fill="#141417"/>
      <rect x="163" y="160" width="24" height="16" rx="3" fill="#0a0a0c"/><rect x="166" y="165" width="18" height="2" fill="#c8ff2e" opacity=".8"/>
      ${tap}
      <rect x="163" y="216" width="24" height="40" rx="4" fill="#222227"/><path d="M168 228 h14 M168 236 h14 M168 244 h14" stroke="#555" stroke-width="2"/>
      ${ramenLower()}`;
  } else if (kind === 'snack' || kind === 'snack-chilled') {
    const chilled = kind === 'snack-chilled';
    let items = '';
    const cols = chilled ? ['#f4f4f1', '#3c8ce9', '#c8ff2e', '#e94e3c', '#9fd8ff', '#f2b134'] : ['#e94e3c', '#f2b134', '#3c8ce9', '#c8ff2e', '#a855f7', '#f4f4f1'];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
      const x = 33 + c * 23, y = 66 + r * 40;
      const shape = chilled && r === 1
        ? `<path d="M${x} ${y+24} l17 -24 v24z" fill="${cols[(c * 2 + r) % 6]}"/>`
        : `<rect x="${x}" y="${y}" width="17" height="24" rx="2" fill="${cols[(c * 2 + r) % 6]}"/>`;
      items += `${shape}<path d="M${x-1} ${y+30} h19" stroke="${chilled ? '#2a3d52' : '#55555c'}" stroke-width="2"/>`;
    }
    for (let c = 0; c < 4; c++) items += `<rect x="${35 + c * 28}" y="232" width="20" height="38" rx="5" fill="${['#e94e3c','#3c8ce9','#c8ff2e','#f2b134'][c]}"/>`;
    inner = `
      <rect x="26" y="54" width="128" height="226" rx="6" fill="${chilled ? '#0c1520' : `url(#g${id})`}" stroke="${chilled ? '#23364a' : '#2b2b31'}"/>
      ${items}
      <path d="M26 224 h128" stroke="${chilled ? '#2a3d52' : '#2b2b31'}" stroke-width="2"/>
      ${chilled ? `<rect x="26" y="54" width="128" height="226" rx="6" fill="#9fd8ff" opacity=".06"/>` : ''}
      <rect x="26" y="54" width="128" height="226" rx="6" fill="url(#r${id})"/>
      <rect x="162" y="54" width="32" height="226" rx="6" fill="#141417"/>
      <rect x="167" y="64" width="22" height="30" rx="3" fill="url(#s${id})"/>
      ${chilled ? `<text x="178" y="83" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="800" font-size="10" fill="#0b0b0c">3°</text>` : ''}
      ${keypad(168, 104, 2, 4, 11)}
      <rect x="167" y="160" width="22" height="22" rx="4" fill="#222227"/><text x="178" y="175" text-anchor="middle" font-size="10" fill="#888">◎</text>
      <rect x="26" y="292" width="168" height="66" rx="8" fill="#08080a"/>
      <rect x="40" y="308" width="140" height="32" rx="5" fill="#141417"/>
      <text x="110" y="328" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="#666">PUSH</text>`;
  } else if (kind === 'drinks') {
    let b = '';
    const cols = ['#3c8ce9', '#e94e3c', '#c8ff2e', '#f4f4f1', '#f2b134', '#3c8ce9'];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) {
      const x = 33 + c * 19, y = 64 + r * 44;
      b += `<rect x="${x+3}" y="${y}" width="6" height="6" rx="1" fill="#ddd"/><rect x="${x}" y="${y+5}" width="12" height="30" rx="4" fill="${cols[(c + r * 2) % 6]}"/><rect x="${x}" y="${y+16}" width="12" height="7" fill="#fff" opacity=".35"/>`;
    }
    inner = `
      <rect x="26" y="54" width="128" height="230" rx="6" fill="#0c1520" stroke="#23364a"/>
      ${b}
      ${[0,1,2,3,4].map(r => `<path d="M28 ${100 + r*44} h124" stroke="#2a3d52" stroke-width="2"/>`).join('')}
      <rect x="26" y="54" width="128" height="230" rx="6" fill="#9fd8ff" opacity=".05"/>
      <rect x="26" y="54" width="128" height="230" rx="6" fill="url(#r${id})"/>
      <rect x="162" y="54" width="32" height="230" rx="6" fill="#141417"/>
      <rect x="167" y="64" width="22" height="40" rx="3" fill="url(#s${id})"/>
      <text x="178" y="88" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="800" font-size="10" fill="#0b0b0c">4°</text>
      ${keypad(168, 114, 2, 4, 11)}
      <rect x="167" y="166" width="22" height="22" rx="4" fill="#222227"/><text x="178" y="181" text-anchor="middle" font-size="10" fill="#888">◎</text>
      <rect x="26" y="294" width="168" height="64" rx="8" fill="#08080a"/>
      <rect x="40" y="308" width="140" height="32" rx="5" fill="#141417"/>
      <text x="110" y="328" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="#666">PUSH</text>`;
  } else if (kind === 'coffee') {
    const menu = ['ESPRESSO', 'LATTE', 'FLAT WHITE', 'CAPPUCCINO', 'LONG BLACK', 'MOCHA', 'HOT CHOC', 'TEA'];
    inner = `
      <rect x="26" y="54" width="168" height="104" rx="8" fill="url(#c${id})"/>
      <text x="38" y="80" font-family="Inter Tight, sans-serif" font-weight="800" font-size="16" fill="#f4f4f1">FRESH</text>
      <text x="38" y="98" font-family="Inter Tight, sans-serif" font-weight="800" font-size="16" fill="#c8ff2e">COFFEE</text>
      <text x="38" y="112" font-family="JetBrains Mono, monospace" font-size="7" fill="#f4f4f1" opacity=".6">MADE TO ORDER</text>
      <path d="M134 96 h40 v22 a20 20 0 0 1 -40 0z" fill="#f4f4f1"/><path d="M174 104 h6 a7 7 0 0 1 0 14 h-6" stroke="#f4f4f1" stroke-width="3" fill="none"/>
      <ellipse cx="154" cy="97" rx="20" ry="4" fill="#6b3f26"/>
      <path d="M146 88 q4 -8 0 -16 M154 88 q4 -8 0 -16 M162 88 q4 -8 0 -16" stroke="#f4f4f1" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>
      <rect x="26" y="166" width="168" height="104" rx="8" fill="#0a0a0c"/>
      <rect x="31" y="171" width="158" height="94" rx="5" fill="#141417"/>
      ${menu.map((t, i) => {
        const x = 37 + (i % 2) * 74, y = 177 + Math.floor(i / 2) * 21;
        return `<rect x="${x}" y="${y}" width="70" height="17" rx="4" fill="${i === 1 ? `url(#s${id})` : '#222227'}"/><text x="${x + 35}" y="${y + 11.5}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="6.5" fill="${i === 1 ? '#0b0b0c' : '#999'}">${t}</text>`;
      }).join('')}
      <rect x="26" y="278" width="168" height="80" rx="8" fill="#08080a"/>
      <rect x="40" y="284" width="96" height="68" rx="6" fill="#111114"/>
      <rect x="78" y="286" width="20" height="8" rx="2" fill="#2b2b31"/>
      <path d="M88 296 v14" stroke="#6b3f26" stroke-width="3"/>
      <path d="M76 314 h24 l-3 30 h-18z" fill="#f4f4f1"/>
      <path d="M84 308 q3 -6 0 -12 M92 308 q3 -6 0 -12" stroke="#fff" stroke-width="1.5" fill="none" opacity=".3" stroke-linecap="round"/>
      <rect x="146" y="284" width="40" height="30" rx="5" fill="#141417"/><text x="166" y="303" text-anchor="middle" font-size="10" fill="#888">◎</text>
      <rect x="146" y="320" width="40" height="32" rx="5" fill="#141417"/><text x="166" y="339" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="6" fill="#777">CUPS</text>`;
  }
  return `<svg viewBox="0 0 220 402" role="img" aria-label="${esc(kind)} vending machine illustration">${body}${inner}</svg>`;
}


/* ---------- Shared page chrome: nav, mobile menu, reveal-on-scroll ---------- */
function initChrome() {
  const nav = $('#nav'), menuBtn = $('#menuBtn');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });
  menuBtn.onclick = () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); };
  $('#navLinks').addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); } });
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();

  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 5) * 60 + 'ms'; io.observe(el); });
}


/* ---------- Profit calculator (home page + product pages) ---------- */
function mountCalc(el, d = {}) {
  const v = Object.assign({ machine: 5997, sales: 15, price: 4.5, cost: 1.8, comm: 10 }, d);
  const slider = (id, label, min, max, step, val) => `
    <div class="field">
      <label for="${id}">${label} <output id="o${id}"></output></label>
      <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}">
    </div>`;
  el.innerHTML = `
    <div class="calc">
      <div class="calc-in">
        ${slider('cMachine', 'Machine price', 2997, 14997, 500, v.machine)}
        ${slider('cSales', 'Sales per day', 1, 60, 1, v.sales)}
        ${slider('cPrice', 'Average sale price', 1, 12, 0.5, v.price)}
        ${slider('cCost', 'Product cost per sale', 0.5, 8, 0.1, v.cost)}
        ${slider('cComm', 'Location commission', 0, 30, 1, v.comm)}
      </div>
      <div class="calc-out" aria-live="polite">
        <div class="eyebrow">Estimated monthly profit</div>
        <div class="big" id="rProfit">$0</div>
        <div class="sub" id="rSub"></div>
        <div class="calc-rows">
          <div><small>Monthly revenue</small><b id="rRev">$0</b></div>
          <div><small>Product cost</small><b id="rCogs">$0</b></div>
          <div><small>Location commission</small><b id="rComm">$0</b></div>
          <div><small>Yearly profit</small><b id="rYear">$0</b></div>
        </div>
      </div>
    </div>
    <p class="calc-note">Illustrative estimate only, based on 30 trading days a month. It doesn't include card fees, electricity, maintenance, travel, your time or tax, and actual results depend heavily on your location. Use it to compare scenarios, not as a forecast.</p>`;
  const money = n => '$' + Math.round(n).toLocaleString('en-US');
  const val = id => +el.querySelector('#' + id).value;
  const out = (id, t) => { el.querySelector('#' + id).textContent = t; };
  function calc() {
    const m = val('cMachine'), s = val('cSales'), p = val('cPrice'), c = val('cCost'), k = val('cComm');
    const rev = s * p * 30, cogs = s * c * 30, comm = rev * k / 100, profit = rev - cogs - comm;
    out('ocMachine', money(m)); out('ocSales', s); out('ocPrice', '$' + p.toFixed(2)); out('ocCost', '$' + c.toFixed(2)); out('ocComm', k + '%');
    out('rRev', money(rev)); out('rCogs', money(cogs)); out('rComm', money(comm)); out('rYear', money(profit * 12));
    out('rProfit', (profit < 0 ? '−' : '') + money(Math.abs(profit)));
    out('rSub', profit > 0 ? `Machine paid back in about ${(m / profit).toFixed(1)} months` : 'Adjust price or cost: this setup loses money');
  }
  el.addEventListener('input', calc);
  calc();
}
