/* =====================================================================
   VNDR dashboard — DATA LAYER (demo)

   Everything the dashboard shows comes through the `VNDRData` object
   below. Right now it generates realistic SAMPLE data in the browser.

   To go live, replace this file with one that has the same functions but
   fetches from your backend (e.g. Supabase) or the machine-monitoring
   platform's API. The screens in app.js don't need to change.

     VNDRData.signIn(email, password) -> user
     VNDRData.signOut()
     VNDRData.currentUser()           -> user | null
     VNDRData.machines()              -> [machine]
     VNDRData.transactions()          -> [{ t: Date, m: machineId, p: productIndex, price, cost }]
     VNDRData.markRestocked(machineId)
   ===================================================================== */
const VNDRData = (() => {
  // Deterministic random numbers, so the demo looks the same on every visit.
  function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const rand = rng(20261007);

  const P = (name, price, cost, cap) => ({ name, price, cost, cap });
  const PRODUCTS = {
    ramen: [P('Spicy beef cup', 6.5, 2.1, 24), P('Chicken ramen bowl', 7.5, 2.8, 18), P('Kimchi cup', 6.5, 2.2, 24), P('Tonkotsu bowl', 8, 3.1, 18), P('Vegan miso cup', 6.5, 2.3, 18), P('Fire noodle cup', 7, 2.4, 24)],
    'snack-chilled': [P('Chicken wrap', 9.5, 4.2, 12), P('Greek yoghurt', 4.5, 1.6, 16), P('Caesar salad', 10, 4.6, 10), P('Protein bar', 4, 1.5, 20), P('Sparkling water', 3.5, 0.9, 20), P('Iced coffee', 5, 1.8, 16)],
    snack: [P('Salted chips', 3, 0.9, 30), P('Chocolate bar', 3, 1, 30), P('Trail mix', 4, 1.5, 20), P('Gummy bears', 3, 0.8, 25), P('Muesli bar', 2.5, 0.8, 25), P('Pretzels', 3, 0.9, 20)],
    drinks: [P('Spring water 600ml', 3, 0.6, 40), P('Cola can', 3, 0.9, 40), P('Energy drink', 4.5, 1.6, 30), P('Sports drink', 4, 1.3, 30), P('Protein shake', 6, 2.6, 20), P('Sparkling water', 3.5, 0.9, 30)],
    coffee: [P('Flat white', 4.5, 1.1, 120), P('Latte', 4.5, 1.1, 120), P('Cappuccino', 4.5, 1.1, 120), P('Long black', 4, 0.8, 120), P('Hot chocolate', 4, 1, 80), P('Chai latte', 4.5, 1.2, 80)]
  };
  // Hourly demand shapes (0–23) by location type
  const HOURS = {
    university: [1,0,0,0,0,0,1,2,4,5,6,7,9,7,6,6,7,8,8,7,7,6,4,2],
    warehouse:  [3,3,3,2,2,4,6,4,3,3,4,6,7,5,4,4,5,6,5,4,4,4,3,3],
    hospital:   [3,2,2,2,2,3,5,7,7,6,6,7,8,6,5,5,6,6,6,5,5,4,4,3],
    apartments: [1,0,0,0,0,0,1,2,2,2,2,3,3,3,3,3,4,5,6,7,7,6,4,2],
    gym:        [0,0,0,0,0,2,6,8,6,4,3,3,4,3,3,4,6,9,9,7,4,2,1,0],
    office:     [0,0,0,0,0,0,1,6,10,9,6,5,6,5,6,7,4,2,1,0,0,0,0,0]
  };
  const WEEK = { // Sun..Sat
    university: [.5,1,1,1.05,1,.85,.5], warehouse: [.6,1,1,1,1,1,.8], hospital: [.9,1,1,1,1,1,.9],
    apartments: [1.2,.9,.9,.9,1,1.15,1.25], gym: [.8,1.1,1.05,1.05,1,.9,.9], office: [.1,1,1.05,1.05,1,.85,.1]
  };

  // Demo fleet. Locations are fictional placeholders (Sydney area).
  const FLEET = [
    { id: 'R01', model: 'ramen', nickname: 'Campus Library', site: 'Northside University', spot: 'Library foyer, ground floor', type: 'university', lat: -33.8885, lng: 151.1873, perDay: 26, commission: 10, installed: '2026-03-14', hours: '7am – 11pm', contact: 'Campus facilities', water: 18 },
    { id: 'R02', model: 'ramen-keypad', nickname: 'Northgate DC', site: 'Northgate Distribution Centre', spot: 'Staff break room', type: 'warehouse', lat: -33.8150, lng: 151.0010, perDay: 21, commission: 8, installed: '2026-05-02', hours: '24/7', contact: 'Site manager', water: 64, offlineHours: 3 },
    { id: 'S01', model: 'snack-chilled', nickname: 'Harbour Medical', site: 'Harbour Medical Centre', spot: 'Level 2 waiting area', type: 'hospital', lat: -33.8790, lng: 151.2160, perDay: 19, commission: 12, installed: '2026-02-20', hours: '24/7', contact: 'Hospital services' },
    { id: 'S02', model: 'snack', nickname: 'Westside Lobby', site: 'Westside Apartments', spot: 'Residents\' lobby', type: 'apartments', lat: -33.8170, lng: 151.1030, perDay: 14, commission: 0, installed: '2026-06-11', hours: '24/7 (residents)', contact: 'Building manager' },
    { id: 'D01', model: 'drinks', nickname: 'Peak Fitness', site: 'Peak Fitness', spot: 'Next to reception', type: 'gym', lat: -33.9150, lng: 151.2390, perDay: 30, commission: 10, installed: '2026-04-08', hours: '5am – 10pm', contact: 'Gym owner' },
    { id: 'C01', model: 'coffee', nickname: 'Parkline Offices', site: 'Parkline Offices', spot: 'Ground floor kitchen', type: 'office', lat: -33.8660, lng: 151.2060, perDay: 34, commission: 10, installed: '2026-07-01', hours: 'Mon – Fri, 7am – 7pm', contact: 'Office manager' }
  ];

  const now = new Date();
  const DAYS = 180;
  const tx = [];
  const lastSale = {};

  FLEET.forEach((m, mi) => {
    const prods = PRODUCTS[m.model.startsWith('ramen') ? 'ramen' : m.model];
    const hw = HOURS[m.type], hsum = hw.reduce((a, b) => a + b, 0);
    const pw = prods.map((_, i) => 1 + (i === 0 ? 1.2 : 0) + rand() * 1.5);
    const pwsum = pw.reduce((a, b) => a + b, 0);
    const start = new Date(m.installed + 'T00:00:00');
    for (let d = DAYS; d >= 0; d--) {
      const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - d);
      if (day < start) continue;
      const age = (day - start) / 864e5;
      const ramp = Math.min(1, 0.45 + age / 60);          // new machines take a few weeks to build up
      const expected = m.perDay * WEEK[m.type][day.getDay()] * ramp * (0.8 + rand() * 0.4);
      for (let h = 0; h < 24; h++) {
        const hourStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h);
        if (hourStart > now) break;
        if (m.offlineHours && now - hourStart < m.offlineHours * 36e5) continue;
        let n = expected * hw[h] / hsum;
        let count = Math.floor(n) + (rand() < n % 1 ? 1 : 0);
        for (let k = 0; k < count; k++) {
          const t = new Date(hourStart.getTime() + rand() * 36e5);
          if (t > now) continue;
          let r = rand() * pwsum, p = 0;
          while (r > pw[p]) { r -= pw[p]; p++; }
          tx.push({ t, m: m.id, p, price: prods[p].price, cost: prods[p].cost });
          if (!lastSale[m.id] || t > lastSale[m.id]) lastSale[m.id] = t;
        }
      }
    }
    m.products = prods.map((p, i) => ({ ...p, stock: Math.round(p.cap * (mi === 2 && i < 3 ? 0.08 + rand() * 0.12 : 0.25 + rand() * 0.7)) }));
    m.lastSync = m.offlineHours ? new Date(now - m.offlineHours * 36e5) : new Date(now - rand() * 6e5);
  });
  tx.sort((a, b) => a.t - b.t);

  FLEET.forEach(m => {
    const low = m.products.filter(p => p.stock / p.cap < 0.2).length;
    m.status = m.offlineHours ? 'offline' : (low >= 2 || (m.water !== undefined && m.water < 20)) ? 'attention' : 'online';
  });

  const KEY = 'vndr-demo-user';
  const store = {
    get() { try { return JSON.parse(sessionStorage.getItem(KEY)); } catch { return this._mem || null; } },
    set(v) { this._mem = v; try { v ? sessionStorage.setItem(KEY, JSON.stringify(v)) : sessionStorage.removeItem(KEY); } catch {} }
  };

  return {
    signIn(email) {
      const user = { name: 'Alex Jordan', email: email && /\S+@\S+/.test(email) ? email : 'demo@vndr.com', business: 'Jordan Vending Co.' };
      store.set(user); return user;
    },
    signOut() { store.set(null); },
    currentUser() { return store.get(); },
    machines() { return FLEET; },
    transactions() { return tx; },
    markRestocked(id) {
      const m = FLEET.find(x => x.id === id);
      m.products.forEach(p => { p.stock = p.cap; });
      if (m.water !== undefined) m.water = 100;
      if (m.status === 'attention') m.status = 'online';
    },
    now: () => now
  };
})();
