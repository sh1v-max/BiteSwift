# BiteSwift — Project Overview

**BiteSwift** is a React-based food delivery web application, inspired by Swiggy. It fetches real restaurant and menu data (through a serverless proxy layer, with a targeted fallback where Swiggy's own API can't reliably be used outside a browser), and renders a fully functional ordering interface — browsing restaurants, viewing menus, and managing a shopping cart through checkout.

- **Live Demo:** https://yourbiteswift.netlify.app/
- **GitHub:** https://github.com/sh1v-max/BiteSwift
- **Author:** Shiv Shankar Singh (sh1v-max)

For the full story of *how* this got built — the CORS proxy, the menu API investigation, the theme rebuild — see `everythingYouNeedToKnow.md`. This file is the fast technical reference: what's where, and how the pieces connect.

---

## Tech Stack

| Layer | Tool |
|---|---|
| UI Framework | React 19 |
| Routing | React Router DOM v6 |
| Global State | Redux Toolkit + React-Redux (cart only) |
| Bundler | Parcel v2 |
| Styling | Hand-rolled CSS with a custom-property token system (Tailwind is imported for base resets only — page styling doesn't use Tailwind utility classes) |
| Icons | lucide-react (UI icons) + @iconify/react (brand/social logos — Lucide ships none) |
| Serverless Backend | Netlify Functions |
| Testing | Jest + React Testing Library |
| Deployment | Netlify |

---

## Project Structure

```
BiteSwift/
├── index.html                       # HTML entry point
├── index.css                        # Design tokens (--bs-*), resets, navbar/footer base styles
├── package.json
├── netlify.toml                     # Redirects + functions directory config
├── babel.config.js
├── jest.config.js
│
├── netlify/
│   └── functions/
│       ├── swiggy-list.js           # Proxies the homepage restaurant feed (CORS workaround)
│       ├── swiggy-collection.js     # Proxies category/collection pages
│       └── swiggy-update.js         # Proxies home-feed pagination
│
└── src/
    ├── App.js                       # Router config, providers (Redux, UserContext)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.js            # Navbar (logo, links, cart badge, login toggle)
    │   │   └── Footer.js            # Site footer (real social/contact links)
    │   ├── pages/
    │   │   ├── Body.js              # Home page — hero, feature rows, categories, restaurant grid
    │   │   ├── CollectionPage.js    # Category pages (/collection/:slug)
    │   │   ├── RestaurantMenu.js    # Restaurant detail/menu page
    │   │   ├── Cart.js              # Cart + checkout flow
    │   │   ├── About.js             # About page
    │   │   ├── Contact.js           # Contact form + developer links
    │   │   ├── Grocery.js           # Honest "coming soon" page (lazy-loaded)
    │   │   └── Error.js             # Router error boundary
    │   ├── restaurant/
    │   │   ├── RestaurantCard.js    # Card + withDiscountOffer HOC
    │   │   ├── RestaurantCategory.js# Accordion category (menu page)
    │   │   └── ItemList.js          # Dish rows — Add button / quantity stepper
    │   ├── shared/
    │   │   └── Shimmer.js           # Skeleton loading UI
    │   └── _archive/                # Original course class-component demos — kept for
    │                                 # reference, never imported by anything live
    │
    ├── utils/
    │   ├── appStore.js              # Redux store
    │   ├── cartSlice.js             # addItem, removeItem, incrementQuantity,
    │   │                             # decrementQuantity, clearCart
    │   ├── constants.js             # API URLs and CDN endpoints
    │   ├── categories.js            # Home page category pill data
    │   ├── footerData.js            # Footer link-column data
    │   ├── UserContext.js           # Provided at app level; not consumed by any live page
    │   ├── useOnlineStatus.js       # Custom hook: online/offline detection
    │   └── useRestaurantMenu.js     # Custom hook: fetch menu, mock fallback if blocked
    │
    ├── css/
    │   ├── Body.css
    │   ├── CollectionPage.css
    │   ├── RestaurantMenu.css
    │   ├── restaurantCard.css
    │   ├── Cart.css
    │   ├── About.css
    │   ├── Contact.css
    │   ├── Grocery.css
    │   ├── Footer.css
    │   ├── Shimmer.css
    │   └── User.css                 # Styles for the archived class-component demos
    │
    ├── __tests__/
    │   ├── sum.test.js
    │   ├── Header.test.js
    │   └── Contact.test.js
    │   # Cart.test.js, Search.test.js, and RestaurantCard.test.js were removed —
    │   # they referenced pre-reorg component paths and deleted mock JSON fixtures.
    │   # The three remaining tests also predate the reorg and need updating before
    │   # `npm test` will pass cleanly.
    │
    └── mocks/
        └── mockMenus.js              # Menu-only fallback data, shaped to match
                                       # Swiggy's real API response exactly
```

---

## Application Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Body` | Home — hero, categories, restaurant grid |
| `/collection/:slug` | `CollectionPage` | Restaurants filtered by cuisine/category |
| `/restaurant/:resId` | `RestaurantMenu` | Restaurant menu — search, veg/bestseller filters |
| `/cart` | `Cart` | Cart, bill summary, checkout |
| `/about` | `About` | About page |
| `/contact` | `Contact` | Contact form + developer links |
| `/grocery` | `Grocery` | Lazy-loaded "coming soon" page |

All routes render inside `AppLayout`, which wraps them in the Redux `Provider` and `UserContext.Provider`, and renders the persistent `Header` and `Footer` around the routed page (`<Outlet />`).

---

## State Management

### Redux (Shopping Cart)

The cart is the *only* slice of global state in the app — it's the one piece of data genuinely needed by disconnected components (header badge, menu page, cart page itself).

```
appStore → cartSlice
  state: { items: [] }   // each item: { ...swiggyItemCard, quantity }
  actions:
    addItem(item)            → increments quantity if the item's id already exists,
                                 otherwise pushes it with quantity: 1
    removeItem(id)            → filters out the item matching id
    incrementQuantity(id)
    decrementQuantity(id)     → removes the item entirely once quantity would hit 0
    clearCart()                → empties the items array
```

- `ItemList.js` dispatches `addItem` on first "ADD" click, then swaps to a −/+ stepper (`incrementQuantity`/`decrementQuantity`) once the item's already in the cart
- `Header.js` reads `store.cart.items`, summed by quantity, for the cart badge
- `Cart.js` reads the same state to render rows, compute the bill (GST, delivery fee, platform fee, coupon discount), and drive checkout

### React Context (Provided, Not Currently Consumed)

`UserContext` is created and provided at the `App` level, but no live page currently reads from it — it's only consumed by the archived `AboutClass.js` demo in `_archive/`. It's infrastructure left in place from the original course material rather than an active pattern in the current app.

---

## Data Flow

### Restaurant Listing (Home Page)

```
Body mounts
  → fetch('/.netlify/functions/swiggy-list')      // Netlify Function proxies Swiggy
      (function itself: visits swiggy.com first for a session cookie,
       then calls the real listing API with it — required because that
       endpoint sends no CORS headers for direct browser access)
  → parse restaurants out of the response cards
  → setState(allRestaurants) + setState(filteredRestaurants)
  → render RestaurantCard × N, infinite-scroll pagination via swiggy-update
  → client-side search/filter chips operate on the already-fetched list
```

### Category Pages

```
CollectionPage mounts with :slug from URL
  → look up the matching entry in utils/categories.js (collection id + tags)
  → fetch('/.netlify/functions/swiggy-collection?collection=...&tags=...')
  → parse (different response shape than the home feed — each restaurant
     is its own top-level card here, not nested in one shared grid widget)
  → render the same RestaurantCard grid
```

### Restaurant Menu (Detail Page)

```
RestaurantMenu mounts with :resId from URL
  → useRestaurantMenu(resId)
      → fetch(MENU_API + resId) directly from the browser (this endpoint
         DOES send permissive CORS headers, so no proxy is needed here —
         the thing blocking it is bot detection, not CORS)
      → if Swiggy returns real data: use it
      → if blocked (reliably the case outside a real browser session —
         see everythingYouNeedToKnow.md): fall back to mocks/mockMenus.js,
         which is shaped identically to a real response
  → render RestaurantCategory (accordion) × N, each containing ItemList
  → search box + veg-only/bestseller chips filter across all categories
```

### Cart → Checkout

```
User clicks ADD (or +/−) on any ItemList item
  → dispatch to cartSlice
  → Header cart badge and Cart page both re-render from the same store
User opens /cart, applies a coupon, picks a payment method, places order
  → simulated ~1.4s "processing" delay
  → clearCart() + local order-confirmation state (order id, ETA, receipt)
```

---

## Custom Hooks

### `useOnlineStatus()`
Listens to browser `online`/`offline` events and returns a boolean. Used in `Body.js` to show a full-page "you're offline" state instead of a page full of failed requests.

### `useRestaurantMenu(resId)`
Fetches a restaurant's menu, transparently falling back to matching mock data if Swiggy's response is empty/blocked. Returns just the final `resInfo` — `RestaurantMenu.js` never needs to know or care whether what it got back was real or mock.

---

## API Endpoints (constants.js)

| Constant | Purpose | Notes |
|---|---|---|
| `MENU_API` | Swiggy menu for a restaurant (append `resId`) | Called directly from the browser — see Data Flow above for why. |
| `IMG_CDN_URL` | Swiggy image CDN base URL | Used throughout for restaurant/dish photos. |
| `LOGO_URL` | App logo (external URL) | |
| `ABOUT_IMG` | About page illustration (external URL) | |
| `API` | Legacy Swiggy list URL | Unused — the real listing/collection URLs live inside the Netlify Functions themselves, not this constant. Kept for reference. |

---

## Key Patterns Used

| Pattern | Where |
|---|---|
| Serverless CORS proxy | `netlify/functions/*` — server-to-server requests aren't subject to browser CORS |
| Design-token system | Every color resolves through `--bs-*` custom properties in `index.css`, not hardcoded values |
| Higher-Order Component (HOC) | `withDiscountOffer()` wraps `RestaurantCard` to add a discount banner |
| Custom Hooks | `useOnlineStatus`, `useRestaurantMenu` |
| Code Splitting / Lazy Loading | `Grocery` loaded via `React.lazy` + `Suspense` |
| Shimmer / Skeleton UI | `Shimmer.js` shown while restaurant/menu data loads |
| Controlled Accordion | `RestaurantCategory` toggled by `showIndex` state in the parent; bypassed (all expanded) when search/filters are active |
| Redux Toolkit | Cart state only, with Immer-backed immutable updates |
| Graceful degradation | Real data first, matching-shape mock fallback only where an upstream API is unreliable (menu endpoint specifically) |

---

## Testing Setup

- **Framework:** Jest (jsdom environment)
- **Library:** React Testing Library + jest-dom matchers
- **Current state:** three test files remain (`sum.test.js`, `Header.test.js`, `Contact.test.js`), all predating the `components/` folder reorganization — they reference old flat import paths and will need updating before `npm test` passes cleanly. Three other test files (`Cart.test.js`, `Search.test.js`, `RestaurantCard.test.js`) were removed outright, since they depended on mock JSON fixtures that no longer exist.

---

## Styling Architecture

- **Design tokens, not utilities.** Every color, radius, and spacing scale value used across the app is defined once in `index.css` as a CSS custom property (`--bs-bg`, `--bs-text-1`, `--bs-amber`, `--bs-radius-lg`, etc.) and referenced everywhere else — including RGB-triplet companions (`--bs-amber-rgb`) so one-off `rgba()` tints still trace back to the same source of truth. Re-theming the app (a dark mode, a different accent color) means editing that one block, not hunting through every component's CSS.
- **One CSS file per page/component**, living in `src/css/`, imported directly by the component that needs it.
- **Tailwind is present but minimal** — imported in `index.css` for base resets; it is *not* how pages are actually styled.
- **Current palette — "Signal Orange":** white/near-white surfaces (`--bs-bg: #FFFFFF`), near-black text (`--bs-text-1: #111111`), a single vivid orange accent (`--bs-amber: #FF5A1F`). Dark surfaces (`--bs-dark-1`, near-black) are used deliberately in a few spots — the footer and one "spotlight" card on the home page — as contrast accents, not the base theme.
- **Responsive:** each page's CSS file carries its own `@media` breakpoints (typically 900px/768px/600px/480px depending on the layout), audited page-by-page for real overflow issues rather than assumed correct.

---

## Scripts

```bash
npm run dev         # netlify dev — Parcel dev server + Netlify Functions together, on :8888
                     # (use this one; it's the only way local dev gets real restaurant data)
npm start            # parcel index.html alone, on :1234 — frontend only, no functions
npm run build        # Production build (clears .parcel-cache first)
npm test              # Run Jest test suite
npm run watch-test    # Jest in watch mode
```
