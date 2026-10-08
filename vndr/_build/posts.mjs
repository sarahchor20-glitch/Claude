// Blog articles. Each `body` is HTML for the article. Use root-relative links via {{root}}.
// To add a post: copy one object, give it a new slug, and rebuild.

export const POSTS = [
  {
    slug: 'is-a-vending-machine-business-a-good-idea',
    title: 'Is a vending machine business a good idea for you?',
    metaTitle: 'Is a Vending Machine Business a Good Idea? An Honest Guide | VNDR',
    description: 'The honest pros and cons of starting a vending machine business, who it suits, who it doesn\'t, and how to tell if you\'re ready.',
    category: 'Getting started',
    date: '2026-10-07',
    lede: 'Vending can be a great business. It can also be the wrong one for you. Here\'s an honest look at both sides, so you can decide with your eyes open.',
    hero: 'Person standing beside a vending machine, thinking it over',
    heroPhoto: 'darkFront',
    body: `
<p>Vending gets talked about as "passive income" a lot. The truth is more useful than the hype: vending is a <strong>real, physical business</strong> that can run without you being there every day. But it still needs good decisions, a bit of hustle and regular attention.</p>
<p>If that sounds like your kind of thing, keep reading. If you'd rather find out in two minutes, take our quiz: <a href="{{root}}quiz/is-vending-right-for-you/">Is vending right for you?</a></p>

<h2 id="why">Why people love vending</h2>
<ul>
  <li><strong>It works while you don't.</strong> A machine can sell at 2pm on a Tuesday or 2am on a Sunday, without staff.</li>
  <li><strong>It fits around a job.</strong> Restocking and maintenance can be scheduled, which makes vending a popular side business.</li>
  <li><strong>No shopfront.</strong> You're not paying rent on a store. You're placing a machine in someone else's busy space.</li>
  <li><strong>It's tangible.</strong> You own an asset you can see, move and add to.</li>
  <li><strong>It scales in steps.</strong> One machine teaches you the playbook. The next machine uses the same one.</li>
</ul>

<h2 id="hard">What's harder than it looks</h2>
<ul>
  <li><strong>Location is everything.</strong> A great machine in a quiet corridor will struggle. Finding and securing good sites takes effort, and sometimes a few "no"s.</li>
  <li><strong>It isn't fully passive.</strong> Someone has to restock, clean, refill and handle the occasional issue.</li>
  <li><strong>There's upfront cost.</strong> The machine is the big one, then stock, delivery and setup. See our <a href="{{root}}blog/how-much-does-it-cost-to-start-a-vending-business/">cost breakdown</a>.</li>
  <li><strong>Results take time.</strong> Your first location might not be your best one. Expect to learn and adjust.</li>
</ul>

<blockquote>You don't need 50 machines to start a vending business. You need one good machine in the right location.</blockquote>

<h2 id="suits">Vending tends to suit people who…</h2>
<ul>
  <li>Want an extra income stream they can build alongside work</li>
  <li>Are comfortable walking into a business and asking for a conversation</li>
  <li>Like tracking numbers and making small improvements</li>
  <li>Can set aside a few hours a week for restocking and upkeep</li>
  <li>Think long-term: one machine now, more later</li>
</ul>

<h2 id="not">It's probably not for you (yet) if…</h2>
<ul>
  <li>You need the money back in a few weeks</li>
  <li>You expect it to be completely hands-off from day one</li>
  <li>You can't commit any regular time to it</li>
  <li>The idea of pitching a location makes you want to give up before you start</li>
</ul>
<p>None of these are permanent. Plenty of operators started by building up savings first, or partnering with someone who handles the pitching.</p>

<h2 id="test">A simple way to test the idea</h2>
<ol>
  <li><strong>Pick one location type</strong> you can realistically access. Your workplace, a gym you go to, a local business you know.</li>
  <li><strong>Match a machine to it.</strong> Our <a href="{{root}}quiz/which-vending-machine/">machine quiz</a> can help.</li>
  <li><strong>Run the numbers</strong> with conservative sales estimates using our <a href="{{root}}index.html#calc">profit calculator</a>.</li>
  <li><strong>Have one conversation</strong> with a site owner. How it goes will tell you a lot.</li>
</ol>

<div class="callout"><b>Still deciding?</b>Take the 2-minute quiz and get an honest read on whether vending fits you right now, plus what to work on if it doesn't yet.<br><a class="btn btn-primary" href="{{root}}quiz/is-vending-right-for-you/">Take the quiz →</a></div>
`,
    related: ['how-to-start-a-vending-machine-business', 'how-much-does-it-cost-to-start-a-vending-business', 'how-to-find-vending-machine-locations']
  },
  {
    slug: 'how-to-start-a-vending-machine-business',
    title: 'How to start a vending machine business: a step-by-step guide',
    metaTitle: 'How to Start a Vending Machine Business (Step-by-Step) | VNDR',
    description: 'A practical, step-by-step guide to starting a vending machine business: choosing a machine, finding a location, stocking, launching and scaling.',
    category: 'Getting started',
    date: '2026-10-07',
    lede: 'Machine → location → stock → launch → scale. Here\'s each step in plain English, with what to do and what to avoid.',
    hero: 'Brand-new machine being installed',
    heroPhoto: 'darkPair',
    body: `
<p>Starting a vending business isn't complicated. It just has a few steps that need to happen in the right order. Here's the path we walk every VNDR customer through.</p>

<h2 id="decide">Step 0: Decide what you want it to be</h2>
<p>Is this a side income from one or two machines, or the start of a route you'll grow for years? Both are valid. The answer shapes how much you invest upfront and how quickly you expand. If you're unsure whether vending suits you at all, read <a href="{{root}}blog/is-a-vending-machine-business-a-good-idea/">Is vending a good idea for you?</a></p>

<h2 id="machine">Step 1: Choose your machine</h2>
<p>Start with the location type you can realistically access, then pick a machine that fits it, rather than the other way around.</p>
<ul>
  <li><strong>Snack machine (non-refrigerated):</strong> the simplest place to start. Shelf-stable stock, nothing to chill.</li>
  <li><strong>Refrigerated snack machine:</strong> fresh food and cold drinks for workplaces and hospitals.</li>
  <li><strong>Drink machine:</strong> high-turnover cold drinks for gyms and active sites.</li>
  <li><strong>Coffee machine:</strong> daily-habit hot drinks for offices and waiting areas.</li>
  <li><strong>Ramen machine:</strong> a specialty hot meal that stands out, great for students, shifts and late nights.</li>
</ul>
<p>Compare them all on our <a href="{{root}}machines/">machines page</a>, or take the <a href="{{root}}quiz/which-vending-machine/">60-second quiz</a>.</p>

<h2 id="location">Step 2: Secure your location</h2>
<p>This is the step that makes or breaks the business. A great location usually has:</p>
<ul>
  <li><strong>Foot traffic:</strong> lots of people passing every day</li>
  <li><strong>A captive audience:</strong> people who are there for a while</li>
  <li><strong>Demand:</strong> they actually want what you sell</li>
  <li><strong>Operating hours:</strong> the machine is accessible when people need it</li>
  <li><strong>Limited alternatives:</strong> no café next door doing the same job</li>
</ul>
<p>When you approach a site, lead with what's in it for them: a free amenity for their staff, students or customers, kept stocked and clean by you. Some sites will ask for a commission on sales, so factor that into your numbers. Our <a href="{{root}}blog/how-to-find-vending-machine-locations/">location guide</a> goes deeper.</p>

<h2 id="stock">Step 3: Stock it</h2>
<p>Stock for the people at <em>that</em> location, not for yourself. A gym wants water and protein. A university wants value and late-night food. Start with a tight range of proven sellers and a couple of experiments, then let sales data decide. See <a href="{{root}}blog/what-to-sell-in-a-vending-machine/">what to sell in a vending machine</a>.</p>

<h2 id="launch">Step 4: Launch</h2>
<ul>
  <li>Confirm power, access and placement with the site before delivery</li>
  <li>Install, test every selection and test payments</li>
  <li>Make it look good: clean, fully stocked, well lit, and branded if you can</li>
  <li>Tell people it's there. A sign, a post in the staff chat, or a word with reception all help.</li>
</ul>

<h2 id="run">Step 5: Run it well</h2>
<p>Set a restock rhythm based on what's selling. Keep the machine spotless. Fix problems fast. Customers forgive an empty slot once, but not every week. If your machine has online monitoring, use it to plan trips instead of guessing.</p>

<h2 id="scale">Step 6: Scale</h2>
<p>Once your first machine is working, you have something valuable: proof, and a playbook. Reinvest, approach similar sites, and add machines. One machine can become two. Two can become five. Five can become a vending business.</p>

<div class="callout"><b>Want help with step 1 and 2?</b>Tell us about your plans and the locations you're considering, and we'll help you choose the right machine.<br><a class="btn btn-primary" href="{{root}}index.html#enquire">Talk to VNDR →</a></div>
`,
    related: ['how-to-find-vending-machine-locations', 'what-to-sell-in-a-vending-machine', 'how-much-does-it-cost-to-start-a-vending-business']
  },
  {
    slug: 'ramen-vending-machines-guide',
    title: 'Ramen vending machines: the complete guide',
    metaTitle: 'Ramen Vending Machines: The Complete Guide (2026) | VNDR',
    description: 'Everything you need to know about ramen vending machines: how they work, touchscreen vs keypad, best locations, what to stock, running costs and FAQs.',
    category: 'Machines',
    date: '2026-10-07',
    lede: 'Hot noodles from a machine, at any hour. Here\'s how ramen vending machines work, where they do best, and what to know before you buy one.',
    hero: 'Ramen vending machine glowing in a dim corridor',
    heroPhoto: 'front',
    body: `
<p>Ramen vending machines are one of the most eye-catching concepts in vending right now. Instead of a cold snack, customers get a <strong>hot meal</strong>: instant noodles with hot water from the machine, ready to eat in minutes.</p>

<h2 id="how">How a ramen vending machine works</h2>
<ol>
  <li>The customer chooses their noodles on a touchscreen or keypad.</li>
  <li>They pay at the machine.</li>
  <li>They collect their cup from the pick-up door.</li>
  <li>They fill it at the machine's built-in hot-water station.</li>
  <li>They grab cutlery and eat on the spot.</li>
</ol>
<p>VNDR's ramen machines have <strong>independent water storage</strong>, so they're refilled rather than plumbed into a water supply. That gives you more freedom over where the machine can go.</p>

<h2 id="models">Touchscreen vs keypad</h2>
<table>
  <thead><tr><th></th><th>Touchscreen</th><th>Keypad</th></tr></thead>
  <tbody>
    <tr><td>Ordering</td><td>Interactive touchscreen</td><td>Simple keypad</td></tr>
    <tr><td>Hot water</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>Online monitoring</td><td>Yes</td><td>Ask us</td></tr>
    <tr><td>Best for</td><td>High-visibility, "wow" locations</td><td>Practical, high-use locations</td></tr>
    <tr><td>Price</td><td>From $5,997</td><td>On enquiry</td></tr>
  </tbody>
</table>
<p>See both models in detail on the <a href="{{root}}machines/ramen-vending-machine/">ramen vending machine page</a>.</p>

<h2 id="why">Why choose ramen over a standard machine?</h2>
<ul>
  <li><strong>It's a meal.</strong> People buy it when they're actually hungry, not just snacking.</li>
  <li><strong>It's different.</strong> Many sites already have snack and drink machines. Ramen gives you a fresh pitch.</li>
  <li><strong>Shelf-stable stock.</strong> Instant noodles keep far longer than fresh food.</li>
  <li><strong>It gets shared.</strong> Novel machines get filmed and posted, which is free marketing.</li>
</ul>

<h2 id="where">Best locations for a ramen machine</h2>
<p>Look for places with hungry people, long hours and few food options after dark:</p>
<ul>
  <li>Universities and student accommodation</li>
  <li>Hospitals (night-shift staff and waiting visitors)</li>
  <li>Warehouses and distribution centres</li>
  <li>Transport hubs</li>
  <li>Gyms, sports centres and late-night venues</li>
</ul>

<h2 id="stock">What to stock</h2>
<p>A mix of mild crowd-pleasers, spicy favourites, vegetarian/vegan options and one premium pick works well. Rotate a "featured" flavour to keep regulars interested. Always check products suit the machine's cup size and dispensing.</p>

<h2 id="running">What running one involves</h2>
<p>Restocking noodles and cutlery, refilling water, and keeping the dispensing area clean. It's more involved than an ambient snack machine but simple once you have a routine. The touchscreen model's online monitoring helps you plan restock trips.</p>

<h2 id="numbers">Is it profitable?</h2>
<p>That depends almost entirely on location: daily sales, your price, your product cost and any site commission. Try a few scenarios in the calculator on the <a href="{{root}}machines/ramen-vending-machine/#calculator">ramen machine page</a>, and be conservative with your sales estimate for a brand-new site.</p>

<div class="callout"><b>Thinking about a ramen machine?</b>Tell us where you'd like to put it and we'll help you choose between touchscreen and keypad.<br><a class="btn btn-primary" href="{{root}}index.html?machine=ramen#enquire">Get ramen pricing →</a></div>
`,
    related: ['how-to-find-vending-machine-locations', 'what-to-sell-in-a-vending-machine', 'is-a-vending-machine-business-a-good-idea']
  },
  {
    slug: 'how-to-find-vending-machine-locations',
    title: 'How to find great vending machine locations',
    metaTitle: 'How to Find Vending Machine Locations (and Pitch Them) | VNDR',
    description: 'How to find and secure profitable vending machine locations: what makes a good site, where to look, how to pitch a business owner, and red flags to avoid.',
    category: 'Locations',
    date: '2026-10-07',
    lede: 'The machine isn\'t the business. The location is. Here\'s how to find good ones, and how to get a "yes".',
    hero: 'Busy hallway with a vending machine in a prime spot',
    heroPhoto: 'snackHall',
    body: `
<p>Two identical machines can have completely different results depending on where they're placed. That's why location is the single most important decision you'll make.</p>

<h2 id="formula">The location formula</h2>
<p><strong>Foot traffic + captive audience + demand + operating hours + limited alternatives</strong></p>
<ul>
  <li><strong>Foot traffic:</strong> How many people pass the spot each day?</li>
  <li><strong>Captive audience:</strong> Are they there for hours (work, study, waiting), or just passing through?</li>
  <li><strong>Demand:</strong> Will they want what this machine sells?</li>
  <li><strong>Operating hours:</strong> Is the machine accessible when people need it, including nights and weekends?</li>
  <li><strong>Limited alternatives:</strong> Is there a café, shop or canteen doing the same job nearby?</li>
</ul>

<h2 id="where">Where to look</h2>
<ul>
  <li><strong>Universities and student accommodation:</strong> long days, late nights</li>
  <li><strong>Gyms:</strong> drinks and protein</li>
  <li><strong>Offices:</strong> a captive audience five days a week</li>
  <li><strong>Warehouses and distribution centres:</strong> shift workers with nothing nearby</li>
  <li><strong>Hospitals:</strong> 24/7 staff, visitors and patients</li>
  <li><strong>Shopping centres:</strong> foot traffic and impulse buys</li>
  <li><strong>Hotels and apartment buildings:</strong> after-hours convenience</li>
  <li><strong>Transport hubs and entertainment venues:</strong> waiting crowds and late finishes</li>
</ul>
<p>Start with places you already have access to: your workplace, your gym, businesses run by people you know. A warm introduction beats a cold one.</p>

<h2 id="scout">How to scout a site</h2>
<ol>
  <li>Visit at different times of day and count people passing the spot.</li>
  <li>Note the opening hours and who is there after hours.</li>
  <li>Check what food and drink options exist nearby, and when they close.</li>
  <li>Look for a spot with power, space and visibility, not hidden in a back corner.</li>
</ol>

<h2 id="pitch">How to pitch a business owner</h2>
<p>Make it about them, not you:</p>
<ul>
  <li><strong>It's a free amenity</strong> for their staff, members or customers.</li>
  <li><strong>You handle everything:</strong> stocking, cleaning, maintenance.</li>
  <li><strong>It solves a problem:</strong> no food after 6pm, staff leaving the site for lunch, nothing for night shift.</li>
  <li><strong>Offer a commission</strong> on sales if it helps, and build it into your numbers first.</li>
</ul>
<p>Keep it short. Bring a photo of the machine. Ask for a trial period if they're hesitant.</p>

<h2 id="red-flags">Red flags</h2>
<ul>
  <li>Plenty of people, but they're only passing for seconds</li>
  <li>A café or shop next to your spot selling the same thing</li>
  <li>The building is locked when demand is highest</li>
  <li>A commission so high the numbers stop working</li>
</ul>

<h2 id="match">Match the machine to the location</h2>
<p>A gym and a student building need different machines. Use our <a href="{{root}}quiz/which-vending-machine/">machine quiz</a> to match your location to the right machine.</p>

<div class="callout"><b>Got a location in mind?</b>Tell us about it and we'll give you our honest take on what would work there.<br><a class="btn btn-primary" href="{{root}}index.html#enquire">Ask VNDR →</a></div>
`,
    related: ['how-to-start-a-vending-machine-business', 'what-to-sell-in-a-vending-machine', 'ramen-vending-machines-guide']
  },
  {
    slug: 'what-to-sell-in-a-vending-machine',
    title: 'What to sell in a vending machine (by location)',
    metaTitle: 'What to Sell in a Vending Machine: Best Products by Location | VNDR',
    description: 'How to choose vending machine products that sell: best sellers by location, how to price them, and how to use sales data to improve your range.',
    category: 'Stock',
    date: '2026-10-07',
    lede: 'Stock for the people at the location, not for yourself. Here\'s how to build a range that sells, and keep improving it.',
    hero: 'Neatly stocked vending machine, full front view',
    heroPhoto: 'snackFront',
    body: `
<p>The right products can turn an average location into a good one. The wrong ones leave money sitting in the spirals.</p>

<h2 id="principles">Three rules for choosing stock</h2>
<ol>
  <li><strong>Know the audience.</strong> Who's standing in front of the machine, and what do they need right then?</li>
  <li><strong>Start with proven sellers.</strong> Familiar brands and flavours sell first. Add a couple of experiments, not a whole machine of them.</li>
  <li><strong>Let data decide.</strong> After a few weeks, drop the slow sellers and double up on the winners.</li>
</ol>

<h2 id="by-location">Best sellers by location</h2>
<table>
  <thead><tr><th>Location</th><th>What tends to sell</th></tr></thead>
  <tbody>
    <tr><td>Gyms</td><td>Water, sports drinks, protein shakes and bars</td></tr>
    <tr><td>Offices</td><td>Coffee, snacks, healthier options, fresh lunch (refrigerated)</td></tr>
    <tr><td>Universities</td><td>Value snacks, energy drinks, hot noodles</td></tr>
    <tr><td>Warehouses</td><td>Filling snacks, energy drinks, hot meals for shift breaks</td></tr>
    <tr><td>Hospitals</td><td>Coffee, fresh food, comfort snacks, hot noodles at night</td></tr>
    <tr><td>Apartments &amp; hotels</td><td>Convenience items, personal care, late-night snacks</td></tr>
  </tbody>
</table>

<h2 id="by-machine">By machine type</h2>
<ul>
  <li><strong><a href="{{root}}machines/snack-vending-machine/">Snack (non-refrigerated)</a>:</strong> chips, chocolate, bars, nuts, lollies, personal-care items</li>
  <li><strong><a href="{{root}}machines/refrigerated-snack-vending-machine/">Refrigerated snack</a>:</strong> sandwiches, salads, yoghurt, chilled snacks, cold drinks</li>
  <li><strong><a href="{{root}}machines/drink-vending-machine/">Drinks</a>:</strong> water, soft drinks, energy and sports drinks, protein shakes</li>
  <li><strong><a href="{{root}}machines/coffee-vending-machine/">Coffee</a>:</strong> coffee, hot chocolate, tea</li>
  <li><strong><a href="{{root}}machines/ramen-vending-machine/">Ramen</a>:</strong> cup and bowl noodles across mild, spicy, vegetarian and premium</li>
</ul>

<h2 id="pricing">Pricing your products</h2>
<p>Look at what people pay nearby, think about convenience (people pay more for something right here, right now), and keep enough margin to cover product cost, any site commission, and your time. Round, simple prices make buying quicker. Test your assumptions in our <a href="{{root}}index.html#calc">profit calculator</a>.</p>

<h2 id="buying">Where to buy stock</h2>
<p>Wholesalers and cash-and-carry stores are the usual starting point. As you grow, buying in larger quantities can improve your margins, but only for products you know will sell.</p>

<h2 id="improve">Keep improving</h2>
<ul>
  <li>Review sales every restock</li>
  <li>Replace the bottom sellers</li>
  <li>Give best sellers more slots</li>
  <li>Rotate one "new" item to keep regulars curious</li>
</ul>
`,
    related: ['how-to-find-vending-machine-locations', 'how-to-start-a-vending-machine-business', 'ramen-vending-machines-guide']
  },
  {
    slug: 'how-much-does-it-cost-to-start-a-vending-business',
    title: 'How much does it cost to start a vending machine business?',
    metaTitle: 'How Much Does It Cost to Start a Vending Machine Business? | VNDR',
    description: 'Every cost to plan for when starting a vending machine business: the machine, stock, delivery, payments, commissions, maintenance and your time.',
    category: 'Money',
    date: '2026-10-07',
    lede: 'The machine is the biggest cost, but it isn\'t the only one. Here\'s every cost to plan for, so there are no surprises.',
    hero: 'Calculator, notebook and a vending machine brochure',
    heroPhoto: 'darkKeypad',
    body: `
<p>Being clear about costs upfront is the best way to make good decisions, and to avoid a nasty surprise three months in.</p>

<h2 id="upfront">Upfront costs</h2>
<ul>
  <li><strong>The machine.</strong> Your biggest single cost. As an example, VNDR's touchscreen ramen vending machine starts from $5,997. Other machines are priced on enquiry. See <a href="{{root}}machines/">all machines</a>.</li>
  <li><strong>Options.</strong> Things like a custom branded wrap.</li>
  <li><strong>Delivery and installation</strong> to your location.</li>
  <li><strong>Opening stock</strong> to fill the machine, plus a little extra for the first restock.</li>
  <li><strong>Business setup</strong> such as registration, insurance and any permits or approvals your area requires.</li>
</ul>

<h2 id="ongoing">Ongoing costs</h2>
<ul>
  <li><strong>Restocking</strong>, your biggest ongoing cost, and the one that grows with sales</li>
  <li><strong>Location commission</strong>, if you agree to share a percentage of sales with the site</li>
  <li><strong>Card payment fees</strong></li>
  <li><strong>Electricity</strong> (often covered by the site, but agree this upfront)</li>
  <li><strong>Maintenance and cleaning</strong></li>
  <li><strong>Travel</strong> to restock and service</li>
  <li><strong>Your time</strong>. Count it, even if you don't pay yourself yet.</li>
</ul>

<h2 id="example">A simple way to model it</h2>
<p>Monthly profit ≈ (sales per day × average price × 30) − product cost − commission − other running costs.</p>
<p>Then: <strong>payback time ≈ machine cost ÷ monthly profit</strong>.</p>
<p>Our <a href="{{root}}index.html#calc">profit calculator</a> does this for you. Try a cautious scenario and an optimistic one. If the numbers only work in the optimistic case, keep looking for a better location.</p>

<h2 id="save">Ways to keep costs down</h2>
<ul>
  <li>Start with one machine and prove the location before adding more</li>
  <li>Choose shelf-stable stock early on to reduce waste</li>
  <li>Group locations close together to cut travel time</li>
  <li>Use remote monitoring (where available) to restock only when needed</li>
</ul>

<div class="callout"><b>Want real numbers for your plan?</b>Tell us which machine you're considering and we'll send you a full quote.<br><a class="btn btn-primary" href="{{root}}index.html#enquire">Get a quote →</a></div>
`,
    related: ['is-a-vending-machine-business-a-good-idea', 'how-to-start-a-vending-machine-business', 'what-to-sell-in-a-vending-machine']
  }
];
