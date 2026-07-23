# BiteSwift — The Full Build Journey

This document is the detailed companion to the README. The README tells you what BiteSwift *is*; this file tells you how it got there — the actual sequence of decisions, dead ends, and fixes, in the order they happened. If you're prepping to talk about this project in an interview, this is the file to read.

## Table of Contents

1. [Project Overview](#project-overview)
2. [The Build Journey](#the-build-journey)
3. [Deep Dives — The Instructive Problems](#deep-dives--the-instructive-problems)
4. [Architecture Reference](#architecture-reference)
5. [Interview Prep — Questions & Answers](#interview-prep--questions--answers)

---

## Project Overview

BiteSwift is a food-delivery front end cloning Swiggy's core experience: browse real restaurants, open a menu, add items to a cart, and check out. It started as a Namaste React course project and was rebuilt, page by page, into something closer to a real product — including a self-built design system, a working cart, and honest handling of a third-party API that actively resists being used outside a real browser.

---

## The Build Journey

### Phase 1 — Foundation

The project began on the standard Namaste React course scaffold: a flat `components/` folder, class-and-functional components mixed together, hardcoded mock restaurant data, and a cart implementation that mostly worked by coincidence rather than design (`removeItem` used `array.pop()` — it removed whichever item happened to be *last* in the array, not the one the user clicked).

### Phase 2 — Real Data, and the First CORS Wall

Swapping the mock restaurant list for Swiggy's real listing API (`/dapi/restaurants/list/v5`) hit an immediate wall: the browser blocked the request outright. Swiggy's listing endpoint sends no `Access-Control-Allow-Origin` header, so any cross-origin `fetch()` from a browser is a dead end regardless of headers or cookies.

The fix was a **Netlify Function** (`swiggy-list.js`) acting as a server-to-server proxy — server-to-server requests aren't subject to browser CORS at all. Getting real data back also required mimicking a session: visiting `swiggy.com`'s homepage first to collect a `tid` session cookie, then forwarding it on the actual API call. Without that cookie dance, the endpoint returned empty results.

The same pattern was repeated for category/collection pages (`swiggy-collection.js`) once it became clear Swiggy's "click a cuisine" UX hits the *same* endpoint with different query parameters (`collection=`, `tags=`) — but returns restaurants in a different response shape (each restaurant is its own top-level card, rather than nested inside one shared grid widget), which needed its own parsing logic.

### Phase 3 — Reorganizing for Sanity

Once the component count grew past a dozen flat files, it became hard to tell what belonged to what. Everything was split into `layout/`, `pages/`, `restaurant/`, `shared/`, and `_archive/` (for the original course's class-component demos, kept for reference but never rendered).

### Phase 4 — The Home Page Redesign

The home page went through a full redesign inspired by Sweetgreen, Wolt, and DoorDash: a full-viewport hero, a "how it works" strip, two alternating feature rows (an animated order-tracking card, and a craving grid), a dedicated categories section, and the restaurant grid pushed to the very bottom — matching the editorial, spacious feel of those reference sites rather than a dense card wall.

### Phase 5 — A Real Design System (and a Full Theme Pivot)

The original styling was a dark, warm "Ember Noir" theme. On request, it was rebuilt from scratch as **"Signal Orange"** — a light, minimal palette (white surfaces, near-black text, one vivid orange accent) closer to DoorDash's actual look.

The more important part wasn't the color choice — it was making sure it was the *only* place colors lived. Every hardcoded hex and `rgba()` across the entire codebase was swept into a small set of CSS custom properties in `index.css` (`--bs-bg`, `--bs-text-1`, `--bs-amber`, etc.), including RGB-triplet companion tokens (`--bs-amber-rgb: 255, 90, 31`) so that one-off `rgba(var(--bs-amber-rgb), 0.08)` tints could still reference the single source of truth instead of repeating literals. The payoff: a future dark theme is a matter of overriding a dozen tokens, not hunting through every component's CSS file.

### Phase 6 — Removing All Mock Data (and What That Exposed)

At the user's explicit request, every trace of mock data was deleted — `mockRestaurants.js`, `mockMenus.js`, the JSON fixtures, and three pre-reorg test files that referenced them. The home page and collection pages kept working fine, because their underlying API genuinely works. The individual restaurant menu page did not — and that turned into the most instructive investigation of the whole project (see [Deep Dive: The Menu API Investigation](#deep-dive-the-menu-api-investigation) below).

The short version: Swiggy's menu endpoint is bot-gated far more aggressively than its listing endpoint, and — confirmed through direct testing, not assumption — that block survives real captured session cookies and even a completely bare, header-matched request. The pragmatic resolution was to restore *only* the menu mock as an automatic fallback (recovered intact from git history, since the original mock generator already matched Swiggy's real response shape), while keeping restaurant listings 100% real, exactly as originally intended.

### Phase 7 — The Restaurant Menu Page, Properly

Once real data was flowing reliably (real-or-mock, transparently), the menu page itself got rebuilt: a full-width hero banner with a gradient scrim over the restaurant's photo (replacing a cramped 96px thumbnail), a breadcrumb, an in-menu dish search, and veg-only / bestseller filter chips. The veg/non-veg indicator uses the actual FSSAI-mandated green/red square-with-dot symbol, reading Swiggy's real `itemAttribute.vegClassifier` field — which also meant extending the mock data generator to infer the same field from dish names/descriptions, so mock and real dishes behave identically.

### Phase 8 — The Cart, Rebuilt From a Real Bug

The cart page turned out to be barely functional: adding the same dish twice created two separate array entries instead of incrementing a quantity, and — as noted in Phase 1 — removing an item removed whichever one was *last* in the array, not the one clicked. `cartSlice.js` was rebuilt with `incrementQuantity`/`decrementQuantity` reducers and a proper remove-by-id, matching each item by `card.info.id`.

A follow-up request ("make it feel professional") turned the cart into a real checkout flow: an itemized bill (item total, 5% GST, delivery fee, platform fee), two working coupon codes, a payment-method selector, a ~1.4s simulated "placing order" delay instead of an instant flip, and a receipt-style confirmation screen with a generated order ID and ETA.

### Phase 9 — About, Contact, and an Honest Grocery Page

Three smaller pages got the same "actually look and check what's there" treatment:

- **About.js** was importing three archived class-component demos it never rendered — dead weight left over from the course. Rebuilt as a proper brand page reusing the home page's stat language ("200+ restaurants · 30 min avg delivery · 4.8★") for consistency.
- **Contact.js**'s form did nothing but `e.preventDefault()`. Rebuilt with real controlled state, a simulated send with a loading spinner, and a success confirmation.
- **Grocery.js** was a literal `<h1>Grocery List</h1>` / "Coming soon..." / a hardcoded `<ul>` of three fruits. Rather than fake a feature that doesn't exist, it became an honest, polished "coming soon" page — a working (simulated) email notify-me form and a preview strip of category chips, clearly presented as not-yet-built rather than pretending otherwise.

### Phase 10 — Icons, Properly

Icons moved from `react-icons` to `lucide-react` throughout the app. That surfaced a real gap: Lucide (deliberately) ships zero brand/social logos — verified directly by inspecting the installed package's exports, not assumed. `@iconify/react` was added specifically for the four social/contact icons in the footer and Contact page, pulling `lucide:*` icons for GitHub/LinkedIn/mail and `simple-icons:x` for X (since Simple Icons tracks the current logo, not the old bird).

### Phase 11 — Mobile Responsiveness, Audited Not Assumed

A systematic, page-by-page pass through every CSS file — not a guess, but reasoning through actual viewport math at 320–768px for each layout. Two real fixes came out of it: the home page's hero headline used a `clamp()` whose floor value was still too large for narrow phones, and the collection page was stacking a redundant 80px of top padding on top of the navbar's own 64px offset. The most interesting bug, though, needed a real screenshot to catch — see the deep dive below.

### Phase 12 — Making It Personal

The footer's social icons (originally emoji placeholders for Instagram/Twitter/LinkedIn/Facebook) were replaced with real links: Portfolio, GitHub, LinkedIn, X, and a mail icon. A dedicated "built by" section was added to the Contact page with the same five links, and the placeholder business phone number was swapped for a real one.

### Phase 13 — Documentation

This file, and a full rewrite of `README.md` — which, before this pass, claimed the project used Vite (it's Parcel) and deployed to Vercel (it's Netlify), linked to a demo GIF and logo image that don't exist in the repo, and referenced a `LICENSE.txt` file that was never actually created.

---

## Deep Dives — The Instructive Problems

### Deep Dive: The Menu API Investigation

This is worth walking through in detail because it's a genuine debugging story with a real, evidence-based conclusion — not a guess.

**The symptom:** fetching a restaurant's menu returned `HTTP 202` with an empty body. Not an error, not a CORS failure — a soft, silent non-answer.

**First hypothesis (wrong): it's CORS.** The natural assumption, given the listing API needed a proxy, was that the menu API needed one too. A Netlify Function proxy was built for it, forwarding realistic browser headers and a session-cookie warm-up (visiting the homepage, then a restaurant-list call, before hitting the menu endpoint). Still `202`, empty.

**Checking the actual evidence:** a direct `curl` request with an `Origin` header revealed the menu endpoint sends `Access-Control-Allow-Origin: *` — it was never CORS-blocked. (The listing endpoint, tested the same way, sends no CORS headers at all — confirming *that* one genuinely needs its proxy, while the menu proxy had been solving a problem that didn't exist.)

**Second hypothesis: a real browser succeeds where a server doesn't.** Reasoning: AWS WAF (visible via an `x-amzn-waf-action` response header) often fingerprints the TLS handshake itself — something a real Chrome tab has and a Node.js `fetch()` doesn't. The proxy was scrapped in favor of a direct browser-side fetch. This is also *structurally* the only viable direct-browser option, since browsers forbid JavaScript from manually setting a `Cookie` header, and `localhost` can't read `swiggy.com`'s cookie jar in the first place.

**Testing in a real browser:** still blocked. This ruled out "just use a real browser" as sufficient on its own.

**Testing with real, captured session cookies:** the user opened swiggy.com directly, found a real working request in DevTools, and provided the exact `Cookie` header value from their authenticated session. A new proxy forwarded those real cookies, unmodified. Still `202`, empty — even with a cookie set that had *just* produced a real result in an actual browser minutes earlier.

**The conclusive test:** a standalone, dependency-free script (`fetchmenu.js`) hit the user's exact captured URL — same query parameters, no cookies at all — with a plain Node `fetch()`. Still `202`, empty. This isolated the variable completely: it wasn't the URL, the parameters, or the cookies. It was specifically that the request wasn't originating from an actual browser session.

**External corroboration:** a search turned up the same issue reported independently by other developers building the identical Namaste-React-based Swiggy clone — a GitHub issue titled "Fix Swiggy Menu Api," a discussion thread, even a YouTube video made specifically to patch around it. This wasn't a local problem; it's a known, shared wall.

**The resolution:** accept that real-time menu scraping isn't reliably achievable without infrastructure disproportionate to the project (a headless browser, which has its own detectable tells and meaningfully higher operational cost), and design around it honestly — real data when it's available, a data-shape-matched mock fallback when it isn't, applied *only* to the one endpoint that actually needs it.

### Deep Dive: The CSS Grid Overflow Bug

Found via the user's own DevTools screenshots at a 400px viewport: restaurant cards were visibly cut off mid-text on the right edge of a 2-column grid.

**The mechanism:** CSS Grid items default to `min-width: auto`, which means a grid track will *not* shrink below the intrinsic (natural, unwrapped) width of its content — even if that content has `overflow: hidden; text-overflow: ellipsis` applied. The restaurant card's cuisine line (`white-space: nowrap`) contained text like *"Burgers, Beverages, Cafe +1"*, which is wider than the ~178px a 2-column mobile grid allocates per card. Because the card's wrapper (`.card-link`, the direct grid item) never explicitly opted out of that default, the grid column — and the whole page — was forced wider than the viewport to accommodate it.

**The fix** was one line: `min-width: 0;` on `.card-link`. That single declaration tells the grid item it's allowed to shrink below its content's natural size, which lets the ellipsis truncation actually take effect instead of being overridden by the track-sizing algorithm.

**Why it wasn't caught sooner:** the bug only manifests with sufficiently long unbroken text *and* a narrow enough grid track — short restaurant names/cuisines never triggered it, so it didn't show up until a real card with a long cuisine list rendered in a real narrow viewport. It's a good reminder that CSS correctness at the "looks fine in my test cases" stage and CSS correctness at "someone will eventually have a longer string than I imagined" are different bars — every other grid and flex layout in the app was subsequently audited against the same pattern (any `white-space: nowrap` inside a multi-column grid track) to confirm it was the only instance.

---

## Architecture Reference

### State Management: Redux Toolkit, Used Narrowly

Only the cart lives in Redux (`cartSlice.js`). It's read and written from three genuinely disconnected places — the header (badge count), the menu page (add/adjust quantity), and the cart page itself — which is exactly the situation global state is for. Everything else (search text, form inputs, filter toggles, coupon input) is local `useState`, scoped to the component that owns it. Defaulting to global state for everything is a common overcorrection this project deliberately avoids.

`cartSlice.js`'s reducers:

```js
addItem        // finds existing item by card.info.id; increments quantity if found, else pushes { ...item, quantity: 1 }
removeItem      // filters out the item matching the given id
incrementQuantity
decrementQuantity  // removes the item entirely if quantity would drop to 0
clearCart
```

Redux Toolkit's Immer integration means these read like mutations (`state.items.push(...)`, `item.quantity += 1`) while remaining safely immutable under the hood.

### Data Fetching: Custom Hooks, No Loading/Error State Bloat

`useRestaurantMenu(resId)` is the clearest example of the project's data-fetching pattern: it owns the fetch, the real/mock fallback decision, and returns just the final `resInfo` — the component (`RestaurantMenu.js`) never needs to know whether what it received was real or mock data, because both are shaped identically.

`useOnlineStatus()` is a small utility hook wrapping the browser's `online`/`offline` events, used by `Body.js` to show a genuine full-page offline state instead of a page full of failed requests.

### Netlify Functions as the Backend Layer

Three serverless functions do the server-side work a static React app can't:

- `swiggy-list.js` — homepage restaurant feed, with the homepage-cookie warm-up dance.
- `swiggy-collection.js` — category/cuisine pages, same cookie pattern, different response parsing.
- `swiggy-update.js` — pagination for the home feed.

The menu endpoint deliberately does **not** have a function — see the deep dive above for why routing it through a server made the bot-detection problem worse, not better.

### Styling: Tokens, Not Utilities

Tailwind is imported for base resets, but essentially none of the actual page styling uses Tailwind utility classes — every page has its own hand-written CSS file, and every color reference goes through the `--bs-*` custom property system defined once in `index.css`. This was a deliberate choice made partway through the project (see Phase 5) specifically so a full theme change — which happened once already — stays a small, contained edit rather than a find-and-replace across dozens of files.

---

## Interview Prep — Questions & Answers

**Q: Walk me through why the restaurant listing API needed a proxy but the menu API didn't (even though both ultimately needed a fallback).**

A: They failed for completely different reasons, and conflating them would have led to the wrong fix. The listing API sends no CORS headers at all — a browser refuses to even read the response, full stop, so a server-to-server proxy is structurally required. The menu API *does* send permissive CORS headers; a browser is allowed to read it. What blocks it is Swiggy's bot detection layer, which is actually *more* likely to succeed from a real browser (genuine TLS fingerprint, real cookies) than from a server — so proxying it made things worse, not better. I only figured this out by testing each endpoint's actual CORS headers directly with `curl -D -`, rather than assuming both needed the same fix because they came from the same API family.

**Q: How do you know the menu API block isn't something you could still fix with more effort?**

A: Because I tested the strongest realistic version of "more effort" already: real session cookies captured from an authenticated browser, forwarded unmodified through a server-side proxy. Still blocked. I also isolated every other variable — exact captured URL, zero cookies, plain Node fetch — and got the identical block, which tells you the URL/params/cookies were never the issue; the calling environment is. Combined with independent reports from other developers hitting the same wall on the same style of project, that's enough evidence to stop guessing and design around it rather than keep throwing header tweaks at it.

**Q: Why does `removeItem` take an `id` now instead of just popping the last item?**

A: The original implementation — `state.items.pop()` — happened to "work" only because most manual testing adds one item and immediately removes it. The moment a cart has two different dishes, clicking "remove" on the first one actually deletes the second, because `pop()` doesn't know or care which item the user clicked — it just deletes whatever's structurally last in the array. The fix was to pass the specific item's `id` as the action payload and filter the array by that id, so removal is tied to what was actually clicked, not array position.

**Q: Your cart uses Redux, but the coupon code input and search boxes use local `useState`. How do you decide which is which?**

A: The test I use is: does more than one disconnected component need to read or write this state? The cart qualifies — the header badge, the menu page, and the cart page all need it, and none of them are parent/child of each other, so prop drilling isn't an option and Redux is the right tool. A coupon input or a search box is only ever read by the one component that renders it; putting that in global state wouldn't add any capability, just indirection. Defaulting everything to global state is a common overcorrection — it makes the store noisy and makes it harder to reason about what's actually shared.

**Q: The CSS Grid bug only showed up on mobile — why didn't it show up in normal development?**

A: Two things had to be true at once: a grid track narrow enough to be tight (only happens in a 2-column mobile layout, not desktop's wider columns), and a piece of `white-space: nowrap` text long enough to exceed that track's width (a restaurant with a long cuisine list, like "Burgers, Beverages, Cafe +1"). Most of my own testing used shorter example data that never crossed that threshold. It's a good example of why "looks right in the cases I tried" and "is actually correct" are different bars for CSS — I only caught it because the user tested with real data at a real narrow viewport and sent screenshots.

**Q: Why does the menu page fall back to mock data but the restaurant list doesn't?**

A: Because they're not equally broken. The listing API works reliably through the proxy — there's no principled reason to fake data that's already real and available. The menu API is a different story: confirmed, through direct testing, to be blocked essentially unconditionally outside a real browser session. Given that, a permanent error state on every single restaurant's menu would make the core "browse → order" flow undemonstratable. The fallback is also scoped tightly — it's not "when in doubt, fake it," it's "for this one specific, evidence-backed reason, on this one specific endpoint."

**Q: How would you actually get real menu data reliably if this were a production requirement, not a demo?**

A: A few real options, in order of how seriously I'd consider them: (1) an official Swiggy partner API, if one exists for this use case — the correct answer if it's available, since it sidesteps the entire problem; (2) a headless browser (Playwright/Puppeteer) running server-side, which has a genuine TLS fingerprint and can execute JS challenges — but it's meaningfully heavier infrastructure, has its own detectable signals, and adds real cost and latency; (3) a paid scraping-proxy service that specializes in exactly this problem. For a portfolio demo, none of those are proportionate to the payoff, which is why the mock fallback was the right call *here* — but I'd frame it differently if this were a real product with real users depending on it.
