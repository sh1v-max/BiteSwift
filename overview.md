# BiteSwift — Project Overview

**BiteSwift** is a React-based food delivery web application, inspired by Swiggy. It fetches live restaurant and menu data from the Swiggy API and renders a fully functional ordering interface — browsing restaurants, viewing menus, and managing a shopping cart.

- **Live Demo:** https://biteswift.vercel.app/
- **GitHub:** https://github.com/sh1v-max/BiteSwift
- **Author:** Shiv Shankar Singh (sh1v-max)

---

## Tech Stack

| Layer | Tool |
|---|---|
| UI Framework | React 19 |
| Routing | React Router DOM v6 |
| Global State | Redux Toolkit + React-Redux |
| Bundler | Parcel v2 |
| Styling | Tailwind CSS v4 + Scoped CSS files |
| Testing | Jest + React Testing Library |
| Icons | react-icons |
| Deployment | Vercel |

---

## Project Structure

```
BiteSwift/
├── index.html                    # HTML entry point
├── index.css                     # Global styles + Tailwind imports
├── package.json
├── babel.config.js
├── jest.config.js
├── .parcelrc
├── .postcssrc
│
└── src/
    ├── App.js                    # Root component, router config, providers
    │
    ├── components/
    │   ├── Header.js             # Nav bar (logo, links, cart count, login)
    │   ├── Body.js               # Home page — restaurant grid + search
    │   ├── Footer.js             # Site footer
    │   ├── RestaurantCard.js     # Restaurant card + withDiscountOffer HOC
    │   ├── RestaurantMenu.js     # Restaurant detail/menu page
    │   ├── RestaurantCategory.js # Accordion category for menu sections
    │   ├── ItemList.js           # Food item list with Add button
    │   ├── Cart.js               # Shopping cart page
    │   ├── About.js              # About page (functional)
    │   ├── AboutClass.js         # About page (class-based demo)
    │   ├── Contact.js            # Contact form
    │   ├── Shimmer.js            # Skeleton loading UI
    │   ├── Grocery.js            # Placeholder (coming soon)
    │   ├── Error.js              # Router error boundary
    │   ├── User.js               # Functional component demo
    │   ├── UserClass.js          # Class component demo
    │   ├── UserClass2.js         # Class component with API call demo
    │   └── help.js               # Helper component
    │
    ├── utils/
    │   ├── appStore.js           # Redux store
    │   ├── cartSlice.js          # Cart reducer (addItem, removeItem, clearCart)
    │   ├── constants.js          # API URLs and CDN endpoints
    │   ├── UserContext.js        # React Context for logged-in user
    │   ├── useOnlineStatus.js    # Custom hook: online/offline detection
    │   └── useRestaurantMenu.js  # Custom hook: fetch restaurant menu
    │
    ├── css/
    │   ├── Body.css
    │   ├── RestaurantMenu.css
    │   ├── restaurantCard.css
    │   ├── Contact.css
    │   ├── About.css
    │   ├── Shimmer.css
    │   └── User.css
    │
    ├── __tests__/
    │   ├── sum.test.js
    │   ├── Header.test.js
    │   ├── Cart.test.js
    │   ├── Contact.test.js
    │   ├── Search.test.js
    │   └── RestaurantCard.test.js
    │
    └── mocks/
        ├── mockResListData.json
        ├── mockResMenu.json
        └── resCardMock.json
```

---

## Application Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Body` | Home — restaurant listing grid |
| `/about` | `About` | About page |
| `/contact` | `Contact` | Contact form |
| `/restaurant/:resId` | `RestaurantMenu` | Dynamic restaurant menu page |
| `/cart` | `Cart` | Shopping cart |
| `/grocery` | `Grocery` | Lazy-loaded grocery section (placeholder) |

All routes are wrapped in `AppLayout` which renders the persistent `Header` and `Footer`.

---

## State Management

### Redux (Shopping Cart)
The cart state lives in Redux — accessible from any component without prop drilling.

```
appStore → cartSlice
  state: { items: [] }
  actions:
    addItem(item)     → push to items array
    removeItem()      → pop last item
    clearCart()       → empty items array
```

- `ItemList.js` dispatches `addItem` on "ADD" button click
- `Header.js` reads `store.cart.items.length` for the cart badge
- `Cart.js` reads `store.cart.items` to render the list

### React Context (User Auth)
`UserContext` stores the logged-in user's name, provided at the `App` level and consumed in `Header` and `About` for displaying the current user.

---

## Data Flow

### Restaurant Listing (Home Page)
```
Body mounts
  → fetch(SWIGGY_API)
  → parse: data.cards[1].card.card.gridElements.infoWithStyle.restaurants
  → setState(listOfRestaurants)
  → render RestaurantCard × N
  → client-side search filters the array
```

### Restaurant Menu (Detail Page)
```
RestaurantMenu mounts with :resId from URL
  → useRestaurantMenu(resId) custom hook
  → fetch(MENU_API + resId)
  → parse menu categories
  → render RestaurantCategory (accordion) × N
    → each contains ItemList
```

### Cart
```
User clicks ADD on any ItemList item
  → dispatch(addItem(item)) to Redux
  → Header cart badge re-renders instantly
  → Cart page reads same Redux state
```

---

## Custom Hooks

### `useOnlineStatus()`
Listens to browser `online`/`offline` events and returns a boolean. Used in `Header` to show a green/red status dot.

### `useRestaurantMenu(resId)`
Fetches the full menu for a restaurant ID and returns the parsed response object. Keeps `RestaurantMenu.js` clean of fetch logic.

---

## API Endpoints (constants.js)

| Constant | Purpose |
|---|---|
| `API` | Swiggy restaurant list (lat/lng: Bangalore) |
| `MENU_API` | Swiggy menu for a restaurant (append `resId`) |
| `IMG_CDN_URL` | Swiggy image CDN base URL |
| `LOGO_URL` | App logo (external URL) |
| `ABOUT_IMG` | About page illustration (external URL) |

---

## Key Patterns Used

| Pattern | Where |
|---|---|
| Higher-Order Component (HOC) | `withDiscountOffer()` wraps `RestaurantCard` to add a discount banner |
| Custom Hooks | `useOnlineStatus`, `useRestaurantMenu` |
| Code Splitting / Lazy Loading | `Grocery` component loaded with `React.lazy` + `Suspense` |
| Shimmer / Skeleton UI | `Shimmer.js` shown while restaurant data loads |
| Controlled Accordion | `RestaurantCategory` toggled by `showIndex` state in parent |
| Context API | `UserContext` for cross-component user data |
| Redux Toolkit | Cart state with Immer-backed immutable updates |

---

## Testing Setup

- **Framework:** Jest (jsdom environment)
- **Library:** React Testing Library + jest-dom matchers
- **Mock data:** JSON files in `/src/mocks/` used to simulate API responses
- **Coverage:** Enabled via `jest.config.js`

### Test Coverage Areas
| File | What's Tested |
|---|---|
| `sum.test.js` | Basic utility unit test |
| `Header.test.js` | Login button presence, cart count display |
| `Contact.test.js` | Form rendering, button, input fields |
| `Search.test.js` | Search filter, Top Rated filter |
| `Cart.test.js` | Accordion open, add to cart, clear cart (integration) |
| `RestaurantCard.test.js` | Card rendering, restaurant name, HOC label |

---

## Styling Architecture

- **Tailwind CSS v4** for layout, spacing, typography utilities directly in JSX
- **Scoped CSS files** in `/src/css/` for complex component-specific styles (animations, hover effects, media queries)
- **Global CSS** in `index.css` for header, footer, and base typography
- **Color palette:** Orange (`#ff6600`) primary, cream background (`#FFF8F1`), dark text (`#303030`)
- **Responsive:** Mobile breakpoints via media queries and Tailwind's `md:` / `lg:` prefixes

---

## Scripts

```bash
npm start          # Parcel dev server
npm run build      # Production build (clears cache first)
npm test           # Run Jest test suite
npm run watch-test # Jest in watch mode
```
