# BiteSwift — Production Roadmap

> **Goal:** Take BiteSwift from a learning project to a production-grade food delivery app.
> **Stack additions:** Node/Express proxy, Firebase Auth, TypeScript, Razorpay (test mode)

---

## How to Read This

- Each section is a phase of work — complete them in order.
- `[ ]` = not started · `[x]` = done
- Sub-tasks under each item are required steps, not suggestions.

---

## Phase 1 — Fix the Foundation (App Must Actually Work)

> Nothing else matters until the app reliably loads data and the cart functions correctly.

### 1.1 Replace the Swiggy API with a Proper Backend Proxy

**Problem:** Swiggy's API is unofficial, CORS-blocked in production, and requires session cookies. The live demo on Vercel currently shows nothing for most users.

- [ ] Create `/server` directory with a Node + Express app
- [ ] Add `cors`, `express`, `node-fetch` (or `axios`) as dependencies
- [ ] Build `GET /api/restaurants?lat=&lng=` → proxies to Swiggy restaurant list
- [ ] Build `GET /api/menu/:resId` → proxies to Swiggy menu endpoint
- [ ] Add proper CORS config to allow only your frontend origin
- [ ] Set up `.env` in `/server` for base URLs and any credentials
- [ ] Test locally — both endpoints return data
- [ ] Deploy server to **Railway** or **Render** (free tier is fine)
- [ ] Update `constants.js` on the frontend to point to your deployed proxy
- [ ] Verify live demo loads restaurants and menus end-to-end

**Alternative if you don't want to build a server:**
- [ ] Replace Swiggy API entirely with **TheMealDB** (free, public, no auth needed)
- [ ] Or use **Yelp Fusion API** (requires signup, has real restaurant data)

---

### 1.2 Add `.env` Configuration

**Problem:** API URLs, coordinates, and any keys are hardcoded in `constants.js` inside the repo.

- [ ] Create `.env.local` at project root (add to `.gitignore`)
- [ ] Move all API base URLs to env vars (`VITE_API_BASE`, etc.)
- [ ] Move default coordinates to env vars
- [ ] Move any API keys to env vars (never commit keys)
- [ ] Update `constants.js` to read from `import.meta.env` (Parcel uses this)
- [ ] Create `.env.example` with placeholder values — commit this one

---

### 1.3 Fix the Cart — Completely

**Problem:** `removeItem` deletes the wrong item (pops last). No quantity tracking. No persistence. Cart badge count is wrong when duplicates exist.

- [ ] **Fix `removeItem`** in `cartSlice.js`:
  ```js
  removeItem: (state, action) => {
    state.items = state.items.filter(item => item.card.info.id !== action.payload)
  }
  ```
- [ ] **Fix `addItem`** to handle duplicates — increment quantity instead of pushing duplicate:
  ```js
  addItem: (state, action) => {
    const existing = state.items.find(i => i.card.info.id === action.payload.card.info.id)
    if (existing) {
      existing.quantity += 1
    } else {
      state.items.push({ ...action.payload, quantity: 1 })
    }
  }
  ```
- [ ] Add `decrementItem` action — decrement quantity, remove if quantity hits 0
- [ ] Update cart badge in `Header.js` to show total quantity (sum of `item.quantity`), not array length
- [ ] Add "Remove" button per item in `Cart.js` and `ItemList.js`
- [ ] Add `+` / `−` quantity controls next to each item in the cart
- [ ] **Persist cart to `localStorage`** — use Redux middleware or `redux-persist`
  - Cart should survive page refresh
- [ ] Show correct subtotal: sum of `(item.price * item.quantity)` for all items

---

### 1.4 Add Error + Empty States to Every Async Operation

**Problem:** If any fetch fails, the app shows a blank screen or infinite shimmer.

- [ ] **Restaurant list (Body.js):**
  - [ ] Error state: "Unable to load restaurants. Try again." with a retry button
  - [ ] Empty state: "No restaurants found in your area."
  - [ ] Search empty state: "No results for '{query}'" with clear search button
- [ ] **Restaurant menu (RestaurantMenu.js):**
  - [ ] Error state if menu fetch fails
  - [ ] Show loading shimmer for the menu while fetching
  - [ ] Handle case where restaurant ID doesn't exist (404 → redirect to home)
- [ ] **Cart (Cart.js):**
  - [ ] Empty cart state: illustration + "Your cart is empty" + "Browse Restaurants" CTA button
- [ ] Wrap ALL fetch calls in `try/catch` + check `response.ok`
- [ ] Create a reusable `<ErrorBanner message="" onRetry={fn} />` component

---

## Phase 2 — Real Features (Make It a Proper App)

### 2.1 Geolocation — Show Restaurants Near the User

**Problem:** Every user sees Bangalore restaurants. The app ignores where you actually are.

- [ ] On app load, call `navigator.geolocation.getCurrentPosition()`
- [ ] Store `{ lat, lng }` in Redux or Context
- [ ] Pass coordinates to the restaurant list API call
- [ ] Show a loading state while waiting for geolocation permission
- [ ] **Fallback:** If user denies permission or browser doesn't support it:
  - [ ] Show a city selector modal with 8–10 major Indian cities
  - [ ] Default to a sensible city (Mumbai or Delhi) after timeout
- [ ] Store last-used location in `localStorage` — skip the permission prompt on repeat visits
- [ ] Display the current city name in the header (e.g., "Delivering in **Bengaluru**")

---

### 2.2 Real Authentication — Firebase Auth

**Problem:** The Login button just toggles its own label. No session, no user data, nothing is protected.

- [ ] Set up a Firebase project at console.firebase.google.com
- [ ] Enable **Google Sign-In** and **Email/Password** providers
- [ ] Install `firebase` package
- [ ] Create `src/utils/firebase.js` — initialize Firebase app and auth
- [ ] Create `src/utils/useAuth.js` — custom hook wrapping `onAuthStateChanged`
- [ ] Replace `UserContext` with real Firebase user object
- [ ] **Login Page (`/login`):**
  - [ ] "Sign in with Google" button
  - [ ] Email + Password form with validation
  - [ ] "Forgot Password" link
  - [ ] Redirect to home after login
- [ ] **Protected Routes:**
  - [ ] `/cart` requires auth — redirect to `/login` if not signed in
  - [ ] `/checkout` requires auth
- [ ] **Header:**
  - [ ] Show user's display name and profile picture when logged in
  - [ ] Logout button calls `auth.signOut()`
- [ ] Handle auth errors with readable messages (wrong password, email in use, etc.)

---

### 2.3 Checkout Flow

**Problem:** Users can add to cart but there's no way to actually place an order. The entire funnel is incomplete.

- [ ] **Step 1 — Delivery Address Page (`/checkout/address`):**
  - [ ] Form: flat/house no., street, area, city, pincode
  - [ ] Map picker (use Leaflet.js or Google Maps Embed) to pin location
  - [ ] Save up to 3 addresses (Home, Work, Other) per user (Firebase Firestore)
  - [ ] "Deliver here" selects address and moves to next step

- [ ] **Step 2 — Order Summary Page (`/checkout/summary`):**
  - [ ] List all cart items with quantity and price
  - [ ] Show: Item Total, Delivery Fee, Platform Fee, Taxes (GST), Grand Total
  - [ ] Coupon/promo code input field (even if just one mock code works)
  - [ ] "Proceed to Payment" CTA

- [ ] **Step 3 — Payment Page (`/checkout/payment`):**
  - [ ] Integrate **Razorpay** (test mode — no real money)
  - [ ] Show payment options: UPI, Card, Netbanking, Cash on Delivery
  - [ ] On success → redirect to order confirmation

- [ ] **Step 4 — Order Confirmation Page (`/order/confirmation`):**
  - [ ] "Order Placed Successfully!" with a checkmark animation (Lottie or CSS)
  - [ ] Order ID, estimated delivery time (mock: 30–45 min)
  - [ ] Summary of what was ordered
  - [ ] "Track Order" button (can be a mock tracker)
  - [ ] "Go Back to Home" button

- [ ] **Checkout Progress Indicator:**
  - [ ] Stepper component at top: Address → Summary → Payment → Confirmed

---

### 2.4 Improve the Home Page (Body.js)

- [ ] **Geolocation-aware restaurant fetching** (from 2.1)
- [ ] **Search improvements:**
  - [ ] Debounce the input (currently fires on every keystroke) — use `useDebounce` hook with 300ms delay
  - [ ] Search by cuisine type, not just restaurant name
  - [ ] Highlight the matching text in search results
- [ ] **Filter Bar:**
  - [ ] Replace the single "Top Rated" button with a proper filter bar
  - [ ] Filters: Rating 4.0+, Under 30 min, Under ₹300, Pure Veg, Offers
  - [ ] Filters are composable (multiple can be active at once)
  - [ ] Active filter chips show clearly (filled/colored style)
  - [ ] "Clear All" resets filters
- [ ] **Sort Dropdown:**
  - [ ] Sort by: Relevance (default), Rating, Delivery Time, Cost: Low to High, Cost: High to Low
- [ ] **Categories Section:**
  - [ ] Horizontal scrollable row of cuisine category cards at the top (Biryani, Pizza, Chinese, Burgers, etc.)
  - [ ] Clicking a category filters the restaurant list
- [ ] **Restaurant Card Improvements:**
  - [ ] Show veg/non-veg indicator dot
  - [ ] Show offer badge if restaurant has a discount
  - [ ] Smooth hover animation (already partially there — verify it works)
  - [ ] Skeleton shimmer during image load (`loading="lazy"` on img tags)
- [ ] **Pagination / Infinite Scroll:**
  - [ ] Load restaurants in batches of 12
  - [ ] "Load More" button or infinite scroll via `IntersectionObserver`

---

### 2.5 Restaurant Menu Page Improvements

- [ ] **Sticky restaurant header** — stays visible while scrolling the menu
- [ ] **Menu category sidebar/tabs:**
  - [ ] Sticky left sidebar listing all categories (Starters, Mains, Desserts, etc.)
  - [ ] Clicking a category scrolls to that section
  - [ ] Active category highlights as user scrolls
- [ ] **Veg/Non-Veg toggle:**
  - [ ] Filter toggle that shows only veg or only non-veg items
- [ ] **Item search within a restaurant:**
  - [ ] Search bar inside the menu page to find specific dishes
- [ ] **Item customization modal:**
  - [ ] When user clicks "ADD" on a customizable item, show a modal with options (size, spice level, add-ons)
  - [ ] "Add to Cart" in the modal dispatches the customized item
- [ ] **Recommended section:**
  - [ ] Show a "Must Try" or "Bestseller" section at the top of the menu
- [ ] **Cart drawer:**
  - [ ] Slide-in cart panel from the right when item is added (instead of navigating away to `/cart`)
  - [ ] Shows current cart items and a "Proceed to Checkout" button

---

## Phase 3 — Polish & UI Overhaul (Make It Look Amazing)

### 3.1 Design System — Build It Once, Use Everywhere

- [ ] Define a consistent color palette in `tailwind.config.js`:
  - Primary: `#FF5200` (Swiggy orange)
  - Surface: `#FFFFFF`
  - Background: `#F5F5F5`
  - Text primary: `#1C1C1C`
  - Text secondary: `#686B78`
  - Success: `#48C479`
  - Error: `#E84042`
- [ ] Define typography scale (font sizes, weights, line heights)
- [ ] Define spacing scale (4px base grid)
- [ ] Create reusable components:
  - [ ] `<Button variant="primary|secondary|ghost" size="sm|md|lg" />`
  - [ ] `<Badge label="" color="" />`
  - [ ] `<Input label="" error="" />`
  - [ ] `<Modal>` with backdrop and close button
  - [ ] `<Toast>` notification component
  - [ ] `<Spinner />` and `<Skeleton />` loading states
  - [ ] `<EmptyState icon="" title="" description="" action={} />`

---

### 3.2 Header — Full Redesign

- [ ] **Logo:** Replace external URL with local SVG asset
- [ ] **Location selector** in header (city name + dropdown, from 2.1)
- [ ] **Search bar in header** (on home page, the search moves to the hero section; on other pages, it lives in the header)
- [ ] **User avatar + dropdown** when logged in:
  - Display name and email
  - "My Orders" link
  - "Saved Addresses" link
  - "Logout" button
- [ ] **Cart icon:** Show total item count badge (animated bump on add)
- [ ] **Sticky header** with a subtle shadow on scroll
- [ ] **Mobile hamburger menu:**
  - [ ] Slide-in drawer from the left
  - [ ] All navigation links + login/user section
  - [ ] Smooth open/close animation

---

### 3.3 Home Page — Full Redesign

- [ ] **Hero Section:**
  - [ ] Full-width banner with tagline and the main search bar
  - [ ] Animated placeholder text cycling through cuisines ("Search for Biryani, Pizza, Rolls...")
- [ ] **Cuisine Category Carousel** (from 2.4)
- [ ] **"What's on your mind?" section** — icon grid of popular food types
- [ ] **Restaurant Grid:**
  - [ ] 4 columns on desktop, 2 on tablet, 1 on mobile
  - [ ] Cards with smooth hover lift effect
  - [ ] Lazy-loaded images
- [ ] **Promotional Banner:**
  - [ ] Auto-playing carousel banner (Swiper.js or manual CSS)
- [ ] **"Top Restaurants Near You" section**
- [ ] **Footer redesign:**
  - [ ] Logo + tagline
  - [ ] Links: Company, Explore, Legal
  - [ ] Social media icons (react-icons)
  - [ ] App store badges (placeholder images)
  - [ ] Copyright line

---

### 3.4 Toast Notifications

- [ ] Install `react-hot-toast` or `sonner`
- [ ] Toast on "ADD" item: `"Added to cart ✓"`
- [ ] Toast on remove item: `"Item removed"`
- [ ] Toast on clear cart: `"Cart cleared"`
- [ ] Toast on login success: `"Welcome back, {name}!"`
- [ ] Toast on order placed: `"Order placed successfully! 🎉"`
- [ ] Toast on network error: `"Something went wrong. Please try again."`

---

### 3.5 Animations & Micro-interactions

- [ ] Install `framer-motion`
- [ ] Page transitions — fade/slide between routes
- [ ] Restaurant card hover — subtle lift (scale + shadow)
- [ ] Cart item add — scale bounce on the cart icon badge
- [ ] Accordion open/close — smooth height animation (currently abrupt)
- [ ] Menu category expand — slide-down reveal
- [ ] Order confirmation — checkmark draw animation
- [ ] Loading states — staggered shimmer appearance
- [ ] Button clicks — slight press (scale down 0.97)

---

### 3.6 Responsive Design Audit

Go through every page at: 375px (mobile), 768px (tablet), 1280px (desktop), 1440px (wide).

- [ ] **Header:** hamburger works at 375px, full nav at 768px+
- [ ] **Home:** 1 column card grid at 375px, 4 columns at 1280px
- [ ] **Restaurant Menu:** stacked layout on mobile, sidebar on desktop
- [ ] **Cart:** full-width on mobile, centered content-max-width on desktop
- [ ] **Checkout:** step form is readable and usable on 375px
- [ ] **Contact + About:** no horizontal overflow on any screen size
- [ ] Touch targets: all buttons/links are at least 44×44px on mobile

---

### 3.7 Accessibility (a11y)

- [ ] All `<img>` tags have descriptive `alt` attributes
- [ ] Accordion buttons have `aria-expanded` and `aria-controls`
- [ ] Form inputs have associated `<label>` elements (not just placeholder text)
- [ ] Color contrast ratio ≥ 4.5:1 on all text (check with browser DevTools)
- [ ] Keyboard navigation works for: header nav, search, accordion, cart buttons, modal
- [ ] `<title>` tag and `meta description` set per page (use `react-helmet`)
- [ ] Focus ring visible on all interactive elements (don't remove outline without a replacement)
- [ ] Skip-to-content link at the top for screen readers

---

### 3.8 Page Titles and SEO Basics

- [ ] Install `react-helmet-async`
- [ ] Set unique `<title>` per route:
  - Home: `"BiteSwift — Food Delivery"`
  - Restaurant: `"{Restaurant Name} Menu — BiteSwift"`
  - Cart: `"Your Cart — BiteSwift"`
  - Checkout: `"Checkout — BiteSwift"`
- [ ] Add `<meta name="description">` per page
- [ ] Add Open Graph tags for social sharing (`og:title`, `og:image`, `og:description`)
- [ ] Add a `public/favicon.ico` — currently likely missing

---

## Phase 4 — Code Quality & Architecture

### 4.1 Clean Up the Source Tree

- [ ] Delete tutorial/demo files from `src/`:
  - `UserClass.js`, `UserClass2.js`, `AboutClass.js`, `User.js`, `help.js`, `sum.js`
- [ ] Move remaining Class components into a `src/examples/` folder if you want to keep them for reference
- [ ] Remove unused imports across all files (run ESLint to find them)
- [ ] Audit `constants.js` — remove anything no longer used

---

### 4.2 TypeScript Migration

- [ ] Add TypeScript: `npm install -D typescript @types/react @types/react-dom`
- [ ] Rename files from `.js` → `.tsx` / `.ts` one at a time
- [ ] Define types/interfaces for:
  - [ ] `Restaurant` — from API response
  - [ ] `MenuItem` — from menu API
  - [ ] `CartItem` — `MenuItem & { quantity: number }`
  - [ ] `User` — Firebase user shape
  - [ ] Redux state shape (`RootState`, `AppDispatch`)
- [ ] Type all component props
- [ ] Type all custom hook return values
- [ ] Set `"strict": true` in `tsconfig.json`

---

### 4.3 Resolve Styling Architecture

Pick **one** approach and use it everywhere:

**Option A (recommended): Tailwind-first**
- [ ] Audit all `.css` files — migrate styles to Tailwind classes
- [ ] For complex cases (animations, keyframes), keep a single `globals.css`
- [ ] Delete individual component CSS files once migrated
- [ ] Add `clsx` + `tailwind-merge` for conditional class composition

**Option B: CSS Modules**
- [ ] Rename all `.css` files to `.module.css`
- [ ] Import as `import styles from './Component.module.css'`
- [ ] Remove inline Tailwind classes — do everything in modules

---

### 4.4 Performance Optimizations

- [ ] **Lazy-load all route components**, not just Grocery:
  ```js
  const Body = lazy(() => import('./components/Body'))
  const RestaurantMenu = lazy(() => import('./components/RestaurantMenu'))
  const Cart = lazy(() => import('./components/Cart'))
  // etc.
  ```
- [ ] **Memoize restaurant cards** with `React.memo` — prevents re-renders on search input
- [ ] **`useMemo` for filtered restaurant list** — don't recompute the filtered array on every render
- [ ] **Image optimization:** Add `loading="lazy"` to all restaurant/food images
- [ ] **Debounce search input** (already listed in 2.4 — just make sure it's done)
- [ ] **Virtualize long lists** — if menu has 50+ items, use `react-window` or `react-virtual`

---

### 4.5 Fix and Expand Tests

- [ ] Fix `RestaurantCard.test.js` — HOC test is incomplete
- [ ] Add tests for `useOnlineStatus` hook
- [ ] Add tests for `useRestaurantMenu` hook (mock fetch)
- [ ] Add tests for `cartSlice.js` reducers (pure function — easy to unit test):
  - `addItem` on empty cart
  - `addItem` on existing item (quantity increment)
  - `removeItem` by ID
  - `clearCart`
- [ ] Add test for geolocation flow (mock `navigator.geolocation`)
- [ ] Add test for auth-protected routes (redirect to login when not authenticated)
- [ ] Set coverage threshold in `jest.config.js`: `branches: 70, lines: 80`
- [ ] Run coverage report and fill gaps

---

## Phase 5 — Production Deployment

### 5.1 Backend Deployment

- [ ] Push `/server` to GitHub
- [ ] Deploy to **Railway** (free tier, zero config for Node apps):
  - Set environment variables in Railway dashboard
  - Get the deployed URL (e.g., `https://biteswift-api.railway.app`)
- [ ] Update frontend `constants.js` to use deployed proxy URL in production
- [ ] Test all API routes on the deployed server

---

### 5.2 Frontend Deployment (Vercel)

- [ ] Set environment variables in Vercel dashboard (not in the repo)
- [ ] Verify build passes: `npm run build` — zero errors
- [ ] Test the live deployment end-to-end:
  - [ ] Restaurants load on home page
  - [ ] Search and filters work
  - [ ] Restaurant menu opens
  - [ ] Cart add/remove/clear works
  - [ ] Login with Google works
  - [ ] Checkout flow completes
- [ ] Set up a custom domain (optional but makes it look real)

---

### 5.3 Monitoring (Optional but Impressive)

- [ ] Add **Sentry** for error tracking (free tier)
  - Catches runtime errors in production with stack traces
- [ ] Add **Vercel Analytics** (free, built-in) for page views
- [ ] Add **web vitals** reporting (CLS, LCP, FID) — use `web-vitals` package

---

## Quick Wins (Do These First — Each Takes < 2 Hours)

These don't require major architecture changes but immediately improve the project:

- [ ] Fix `removeItem` in `cartSlice.js` to take an ID payload (30 min)
- [ ] Add empty cart state with CTA in `Cart.js` (30 min)
- [ ] Add `try/catch` to all `fetch` calls (1 hour)
- [ ] Move API URLs to `.env.local` (30 min)
- [ ] Delete `UserClass.js`, `UserClass2.js`, `AboutClass.js`, `User.js`, `help.js`, `sum.js` (5 min)
- [ ] Replace external logo URL with a local asset (20 min)
- [ ] Add `alt` attributes to all images (30 min)
- [ ] Add `document.title` update on each route (30 min)
- [ ] Install and configure `react-hot-toast` — add toast on cart add (1 hour)
- [ ] Debounce the search input in `Body.js` (30 min)

---

## Progress Tracker

| Phase | Status | Notes |
|---|---|---|
| 1.1 — Backend Proxy | `[ ] Not Started` | |
| 1.2 — Env Config | `[ ] Not Started` | |
| 1.3 — Fix Cart | `[ ] Not Started` | |
| 1.4 — Error States | `[ ] Not Started` | |
| 2.1 — Geolocation | `[ ] Not Started` | |
| 2.2 — Firebase Auth | `[ ] Not Started` | |
| 2.3 — Checkout Flow | `[ ] Not Started` | |
| 2.4 — Home Page | `[ ] Not Started` | |
| 2.5 — Menu Page | `[ ] Not Started` | |
| 3.1 — Design System | `[ ] Not Started` | |
| 3.2 — Header | `[ ] Not Started` | |
| 3.3 — Home Redesign | `[ ] Not Started` | |
| 3.4 — Toast Notifs | `[ ] Not Started` | |
| 3.5 — Animations | `[ ] Not Started` | |
| 3.6 — Responsive | `[ ] Not Started` | |
| 3.7 — Accessibility | `[ ] Not Started` | |
| 3.8 — SEO | `[ ] Not Started` | |
| 4.1 — Clean Source | `[ ] Not Started` | |
| 4.2 — TypeScript | `[ ] Not Started` | |
| 4.3 — Styling | `[ ] Not Started` | |
| 4.4 — Performance | `[ ] Not Started` | |
| 4.5 — Tests | `[ ] Not Started` | |
| 5.1 — Backend Deploy | `[ ] Not Started` | |
| 5.2 — Frontend Deploy | `[ ] Not Started` | |
| 5.3 — Monitoring | `[ ] Not Started` | |
