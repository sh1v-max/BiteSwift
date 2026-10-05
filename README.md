<div align="center">

  <h1>BiteSwift</h1>

  <p>A responsive food-ordering web app modelled on Swiggy. It shows live restaurant data, has a cart that persists across refreshes and a full bill breakdown, and falls back gracefully when Swiggy's API blocks requests.</p>

  <p>
    <a href="https://github.com/sh1v-max/BiteSwift/actions/workflows/ci.yml"><img src="https://github.com/sh1v-max/BiteSwift/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19">
    <img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux" alt="Redux Toolkit">
    <img src="https://img.shields.io/badge/React_Router-6-CA4245?logo=react-router" alt="React Router 6">
    <img src="https://img.shields.io/badge/Tested_with-Jest_+_RTL-C21325?logo=jest" alt="Jest and React Testing Library">
    <img src="https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?logo=netlify" alt="Netlify">
  </p>

  <p><strong><a href="https://yourbiteswift.netlify.app/">Live demo</a></strong></p>

</div>

---

## Overview

BiteSwift is a frontend project covering the core flow of a food delivery app: browse restaurants, open a menu, build a cart, and check out. The focus is on clean state management, handling an unreliable third-party API honestly, and a small self-built design system rather than a component library.

## Features

**Restaurant discovery**
- Live restaurant listings, category collections and search, loaded from Swiggy's public listing API through a Netlify Functions proxy (the endpoint sends no CORS headers, so the browser can't call it directly).
- Loading skeletons while data arrives, and a retry state when a request fails, instead of a blank screen or an endless spinner.

**Restaurant menus**
- Each menu first tries Swiggy's real menu API. When Swiggy's bot detection blocks the request, the page falls back to a realistic mock menu that has the same response shape, so no component needs to know which source it got.
- Dish search, veg/non-veg filtering and bestseller badges read the real Swiggy fields (`itemAttribute.vegClassifier`, `ribbon.text`), so they behave the same with live or mock data.

**Cart and checkout**
- One entry per dish with a quantity, not duplicate rows. Increment, decrement (removes the dish at zero) and remove by id.
- **Survives a page refresh.** The cart is saved to `localStorage`. Corrupted or outdated saved data is discarded safely, and the app keeps working if storage is blocked.
- Full bill: item total, 5% GST, delivery fee, platform fee, and two coupon codes (`BITESWIFT20`, ₹20 off orders of ₹200 or more; `FREEDEL`, free delivery). The coupon field says how much more to add when an order is below a coupon's minimum.
- Payment method selector and a simulated checkout that ends in an order receipt and clears the cart.

**UI**
- Fully responsive, checked page by page down to small phone widths.
- A small design-token system: every colour goes through `--bs-*` CSS custom properties, so the theme can be changed (for example, a future dark mode) in one place.
- Lazy-loaded routes (Grocery), and an honest "coming soon" Grocery page rather than a fake feature.

## Tech Stack

| Area | Choice | Why |
| --- | --- | --- |
| UI | React 19 | Function components and hooks throughout |
| State | Redux Toolkit | Only for the cart, the one piece of state shared by unrelated components |
| Routing | React Router 6 | Client-side routing with lazy-loaded routes |
| Styling | Hand-written CSS with custom properties | Token-based theming; Tailwind is used only for base resets |
| Icons | lucide-react, Iconify | Lucide for UI icons; Iconify for brand logos |
| Build | Parcel 2 | Zero-config bundling |
| API proxy | Netlify Functions | Server-side calls to Swiggy endpoints that block browser requests |
| Testing | Jest, React Testing Library | Unit and component tests, run in CI |
| CI / hosting | GitHub Actions, Netlify | Tests and a production build on every push; Netlify deploys `main` |

## Getting Started

**Prerequisites:** Node.js 18 or newer (CI runs on Node 22) and npm.

```bash
git clone https://github.com/sh1v-max/BiteSwift.git
cd BiteSwift
npm install
npm run dev
```

`npm run dev` runs `netlify dev`, which serves the app and the Netlify Functions together at `http://localhost:8888`. `npm start` serves only the frontend at `http://localhost:1234`; it runs, but live restaurant data needs the functions, so use `npm run dev` for the full app.

| Command | What it does |
| --- | --- |
| `npm run dev` | App and Netlify Functions together (recommended) |
| `npm start` | Frontend only, via Parcel |
| `npm run build` | Production build into `dist/` |
| `npm test` | Run the test suite |
| `npm run coverage` | Run the tests with a coverage report |

## Testing

31 tests across 5 suites, written with Jest and React Testing Library. They need no network: each test builds its own Redux store and renders components directly. GitHub Actions runs them, together with a production build, on every push and pull request.

| Area | What the tests check | Line coverage |
| --- | --- | --- |
| Cart reducer | Add, quantity bump instead of a duplicate entry, increment, decrement (removes at zero), remove by id, clear, unknown ids ignored | 100% |
| Cart persistence | Saved on every change, restored after a refresh, empty after clearing, corrupted or invalid saved data ignored, still works when storage throws | 100% |
| Cart page | Bill maths, quantity steppers, both coupons, minimum-order message, invalid coupon, checkout clears the cart | 91% |
| Header | Nav links, cart badge shows total quantity, Login/Logout toggle | 89% |
| Contact page | Form fields, developer links, submit, success message, reset | 100% |

Overall line coverage is **33%**. The cart and checkout flow is thoroughly covered. The listing and menu pages depend on Swiggy's API and are not tested yet; see the [Roadmap](#roadmap).

## Project Structure

```
BiteSwift/
├── netlify/functions/        # Serverless proxies for Swiggy's list and collection APIs
├── src/
│   ├── App.js                # Routes and app layout
│   ├── components/
│   │   ├── layout/           # Header, Footer
│   │   ├── pages/            # Body (home), RestaurantMenu, Cart, CollectionPage, About, Contact, Grocery, Error
│   │   ├── restaurant/       # RestaurantCard, RestaurantCategory, ItemList
│   │   └── shared/           # Shimmer loading skeleton
│   ├── css/                  # Page and component styles
│   ├── mocks/                # Mock menu data, same shape as Swiggy's responses
│   ├── utils/                # Redux store, cart slice, cart persistence, hooks, constants
│   └── __tests__/            # Jest and React Testing Library tests
├── .github/workflows/ci.yml  # Tests and production build on every push
└── netlify.toml              # Build, functions and SPA redirect configuration
```

## Design Decisions

**A proxy for listings but not for menus.** Swiggy's listing API sends no `Access-Control-Allow-Origin` header, so browsers block it, and it has to go through the Netlify Function. The menu API does send permissive CORS headers, so the browser calls it directly. Menus are unreliable for a different reason: Swiggy's AWS WAF bot detection treats server-side requests worse than browser requests, so proxying them would make things worse, not better.

**Mock fallback for menus only.** The listing API works reliably; the menu API doesn't. That was confirmed by testing with session cookies captured from a logged-in browser, which were still blocked, and it matches public reports from other developers. Showing an error for every menu would make the app unusable, so menus fall back to mock data with the same response shape. That keeps the full browse → cart → checkout flow working.

**Redux only for the cart.** The header badge, the menu page and the cart page all read or change the cart, so it is genuinely shared state. Search text, filters and form inputs belong to a single component each and stay in local `useState`.

**Persistence outside the reducer.** Saving to `localStorage` is a store subscription (`src/utils/appStore.js`) rather than code inside the reducer, so the reducer stays a pure function. Writes happen only when the cart actually changes, and the storage key is versioned (`biteswift-cart-v1`) so a future change in format can't load stale data.

## Known Limitations

- Restaurant menus may show mock data when Swiggy blocks the request (see above).
- The delivery location is fixed to Bangalore coordinates.
- Login/Logout is a visual placeholder; there is no authentication.
- Checkout is simulated; no payment is taken.

## Roadmap

- [x] Cart persisted across refreshes
- [x] Automated tests and production build in CI
- [ ] Tests for the listing and menu pages, with Swiggy's responses mocked
- [ ] Use the browser's location instead of fixed coordinates
- [ ] User authentication
- [ ] Real payment integration

## License

Distributed under the ISC License. See [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built by Shiv Shankar Singh</p>
  <p>
    <a href="https://singhshiv.netlify.app/">Portfolio</a> ·
    <a href="https://github.com/sh1v-max">GitHub</a> ·
    <a href="https://www.linkedin.com/in/shiv-shankar-singh-/">LinkedIn</a> ·
    <a href="https://x.com/1amWaziR">X</a>
  </p>
</div>
