# VNDR website

## Pages
| URL | File | How it's made |
|---|---|---|
| `/vndr/` | `index.html` | Edited by hand |
| `/vndr/machines/` | `machines/index.html` | Generated |
| `/vndr/machines/ramen-vending-machine/` (+ 4 other machines) | `machines/*/index.html` | Generated |
| `/vndr/blog/` + 6 articles | `blog/**/index.html` | Generated |
| `/vndr/quiz/` + 2 quizzes | `quiz/**/index.html` | Generated |
| `/vndr/sitemap.xml` | `sitemap.xml` | Generated |
| `/vndr/dashboard/` | `dashboard/` | Edited by hand (operator dashboard prototype) |

Shared files: `style.css` (all styles), `site.js` (machine list, illustrations, calculator, menu), `quiz.js` (quiz questions and scoring).

## Changing content
- **Machine names, prices, features, specs:** `site.js` → `MACHINES`. Then rebuild.
- **Product page text (ramen page, FAQs, etc.):** `_build/products.mjs`. Then rebuild.
- **Blog articles:** `_build/posts.mjs`. Copy an existing post to add a new one. Then rebuild.
- **Quiz questions:** `quiz.js` (no rebuild needed).

Rebuild with:

```
node vndr/_build/build.mjs
```

The `_build` folder isn't published by GitHub Pages.

## Adding photos and videos
Every grey striped box with a camera or play icon is a placeholder. In the page's HTML, each one has a comment just above it, like this:

```html
<!-- PHOTO SLOT: replace this figure's contents with <img src="../../images/ramen/screen.jpg" ...> and remove the "empty" class -->
<figure class="media r-1x1 empty">...</figure>
```

1. Upload the file to the suggested path (e.g. `vndr/images/ramen/screen.jpg` or `vndr/videos/ramen/walkthrough.mp4`).
2. Replace the inside of the `<figure>` with the `<img>` or `<video>` tag from the comment.
3. Remove `empty` from the figure's class.

Recommended sizes: photos at least 1600px on the long edge, saved as JPG/WebP under ~400 KB. Keep videos short (under ~20 MB) and compressed MP4 (H.264).

Generated pages are overwritten on rebuild, so either put media into the templates in `_build/` (best) or ask Claude to do it.

## Before launch
- Change `BASE_URL` in `_build/lib.mjs` (and the canonical link in `index.html`) to your real domain, then rebuild.
- Replace `ENQUIRY_EMAIL` in `index.html`.
- Add `priceCurrency` + `offers` to the Product structured data in `_build/products.mjs` once the currency is confirmed.
- Submit `sitemap.xml` in Google Search Console.

## Operator dashboard (prototype)
`dashboard/` is a clickable prototype of the customer dashboard: login, overview, machines, sales, locations map and restock plan. It runs on **sample data** generated in `dashboard/data.js`. Any login opens the demo account.

To make it real, replace `dashboard/data.js` with a version that has the same functions (`signIn`, `signOut`, `currentUser`, `machines`, `transactions`, `markRestocked`) but loads from a backend (e.g. Supabase for accounts + database) and from each machine's monitoring platform or manual entry. The screens in `dashboard/app.js` don't need to change.

The map uses Leaflet with CARTO's dark map tiles. Check CARTO's usage terms before going live with real customers, or swap in another tile provider in `drawMap()`.
