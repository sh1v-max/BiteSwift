export const API = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9046136&lng=77.614948&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
export const IMG_CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"
export const ABOUT_IMG = "https://png.pngtree.com/png-clipart/20241114/original/pngtree-fast-food-meal-clipart-illustration-burgers-fries-and-soda-png-image_17060160.png"
export const LOGO_URL = "https://static.vecteezy.com/system/resources/previews/050/585/647/non_2x/a-hamburger-and-a-drink-are-shown-in-a-line-free-vector.jpg"

// Swiggy's menu API sends Access-Control-Allow-Origin: * (unlike the
// homepage/list feed), so it's fetched directly from the browser rather than
// through a Netlify proxy. A real browser's TLS fingerprint also stands a
// better chance of passing Swiggy's bot-detection than a serverless function.
export const MENU_API = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId="

// we won't be using default export
//! named export
