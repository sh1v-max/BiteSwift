<div align="center">

  <h1>BiteSwift 🍽️</h1>

  <p>A high-fidelity, responsive Swiggy clone built with React. BiteSwift delivers real restaurant data, a working cart with quantity tracking and checkout, and a clean, mobile-responsive UI — with graceful fallbacks for the parts of Swiggy's API that actively resist being scraped.</p>

  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React">
    <img src="https://img.shields.io/badge/Redux_Toolkit-2.6-764ABC?logo=redux" alt="Redux Toolkit">
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/React_Router-6-CA4245?logo=react-router" alt="React Router">
    <img src="https://img.shields.io/badge/Parcel-2-E7A93F?logo=parcel" alt="Parcel">
    <img src="https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?logo=netlify" alt="Netlify">
  </p>

</div>

**BiteSwift** is a front-end showcase project recreating the core experience of a food delivery app — restaurant discovery, dynamic menus, and a fully working cart — with an emphasis on clean state management, honest handling of unreliable third-party data, and a self-built design system.

## 🚀 Live Demo

**[biteswift.netlify.app](https://yourbiteswift.netlify.app/)**

## ✨ Key Features

- **Real restaurant data** — home page, category/collection pages, and search all pull live from Swiggy's public listing API through a Netlify Functions proxy (needed because that endpoint doesn't send CORS headers for browser access).
- **Resilient menu pages** — individual restaurant menus attempt the real Swiggy menu API first; when it's blocked by bot detection (which happens reliably outside a real browser session — more on that below), the page falls back to a realistic mock menu instead of showing an error. Dish search, veg/non-veg filtering, and bestseller badges all read the same real Swiggy response fields (`itemAttribute.vegClassifier`, `ribbon.text`), so they work identically regardless of data source.
- **A cart that actually works** — quantity tracking per item (not duplicate entries), remove-by-id (not "remove whatever's last in the array"), a real bill breakdown (GST, delivery fee, platform fee, coupon codes), a payment method selector, and a simulated checkout flow that ends in an order confirmation receipt.
- **Self-built design system** — every color in the app resolves through a small set of CSS custom properties (`--bs-*` tokens) rather than hardcoded hex values, so the whole theme can be re-skinned (including a future dark mode) by editing one place.
- **Fully responsive** — audited and fixed page by page, including a classic CSS Grid `min-width: auto` overflow bug that only showed up on narrow viewports.
- **Honest empty states** — the Grocery section is a genuine "coming soon" page rather than a stub pretending to be a feature; API failures show a clean retry state instead of a blank screen or an infinite spinner.

## 🛠️ Technology Stack

| Category | Technology | Notes |
| --- | --- | --- |
| **UI Library** | [React 19](https://react.dev/) | Functional components, hooks throughout. |
| **Build Tool** | [Parcel 2](https://parceljs.org/) | Zero-config bundler with fast HMR. |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) | Cart state (items, quantities) — the one piece of state genuinely shared across disconnected components. |
| **Routing** | [React Router 6](https://reactrouter.com/) | Client-side routing, lazy-loaded routes. |
| **Styling** | Hand-rolled CSS with custom properties | Tailwind is present for base resets, but page styling is a self-built token system (colors, radii, spacing) — not utility classes. |
| **Icons** | [lucide-react](https://lucide.dev/) + [Iconify](https://iconify.design/) | Lucide for UI icons; Iconify (`lucide:*` / `simple-icons:*`) specifically for brand/social logos, which generic icon sets deliberately don't include. |
| **Serverless Backend** | [Netlify Functions](https://www.netlify.com/platform/core/functions/) | Proxies Swiggy's list/collection APIs server-side to work around missing CORS headers. |
| **Deployment** | [Netlify](https://www.netlify.com/) | CI/CD from `main`, functions and static build deployed together. |

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.x or newer
- npm

### Local Development Setup

1.  **Clone the repository:**
    ```
    git clone https://github.com/sh1v-max/BiteSwift.git
    cd BiteSwift
    ```

2.  **Install dependencies:**
    ```
    npm install
    ```

3.  **Start the dev server:**
    ```
    npm run dev
    ```
    This runs `netlify dev`, which serves the Parcel dev server *and* the Netlify Functions together, at `http://localhost:8888`. Running plain `parcel index.html` (via `npm start`) will serve the frontend alone at `http://localhost:1234`, but the Netlify Functions (and therefore real restaurant data) won't be available that way — use `npm run dev` for the full experience.

4.  **Build for production:**
    ```
    npm run build
    ```
    Bundles the app into `/dist`.

## 🏗️ Architectural Notes

A few decisions worth explaining, since they weren't the obvious first choice:

**Why a serverless proxy for some endpoints but not others.** Swiggy's restaurant-listing API sends no `Access-Control-Allow-Origin` header, so a browser blocks it outright — that one *needs* the Netlify Function proxy. The menu API, by contrast, actually sends permissive CORS headers; fetching it directly from the browser was the right call. The real reason menus are unreliable is Swiggy's bot detection (their AWS WAF layer), which behaves worse from a server than from a real browser — routing it through a proxy would make things worse, not better.

**Why menus fall back to mock data but restaurant listings don't.** This was a deliberate, tested decision, not a shortcut. The listing API works reliably. The menu API doesn't — confirmed by testing with real captured session cookies from an authenticated browser session, which *still* got blocked, and cross-referenced against public reports of the same issue from other developers building the same style of project. Given that, showing a permanent error for every single restaurant's menu would make the app unusable; a realistic mock fallback (matching Swiggy's real response shape exactly, so no component needs to know the difference) keeps the core "browse → add to cart → checkout" flow demonstrable.

**Why cart state is Redux but everything else is local `useState`.** The cart needs to be read and modified by the header (badge count), the menu page (add/adjust), and the cart page itself — genuinely cross-cutting state. Search text, form inputs, and filter toggles are only ever needed by the component that owns them, so they stay local. Reaching for global state by default is a common overcorrection; this project only uses it where it earns its keep.

## 🛣️ Roadmap

- [ ] **Browser geolocation** — replace the hardcoded Bangalore coordinates with the user's real location.
- [ ] **Real backend + persisted cart** — a lightweight backend so cart contents survive a refresh.
- [ ] **User authentication** — the current Login/Logout button is a visual placeholder only.
- [ ] **Real payment integration** — checkout is currently a convincing simulation (loading state → order receipt), not a real payment flow.
- [ ] **Expand automated test coverage** — a handful of tests currently need updating after a component reorganization.

## 🤝 Contributing

Contributions are welcome. Fork the repo, make your changes, and open a pull request — for anything substantial, please open an issue first to discuss the approach.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a pull request

## 📄 License

Distributed under the ISC License. See `LICENSE` for details.

<div align="center">
  <p>Crafted with ❤️ by Shiv Shankar Singh</p>
  <p>
    <a href="https://singhshiv.netlify.app/">Portfolio</a> ·
    <a href="https://github.com/sh1v-max">GitHub</a> ·
    <a href="https://www.linkedin.com/in/shiv-shankar-singh-/">LinkedIn</a> ·
    <a href="https://x.com/1amWaziR">X</a>
  </p>
</div>
