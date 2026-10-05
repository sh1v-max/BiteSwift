// Keeps the cart in localStorage so it survives a page refresh.
// Bump the version in the key if the stored shape ever changes, so old
// data is ignored instead of breaking the app.
export const CART_STORAGE_KEY = 'biteswift-cart-v1'

const isValidItem = (item) =>
  item?.card?.info?.id !== undefined && Number.isInteger(item.quantity) && item.quantity > 0

// Returns undefined when there's nothing usable, so the reducer's own
// initial state is used. localStorage can throw (private mode, storage
// disabled) and can hold anything, so every failure falls back to an empty cart.
export const loadCart = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return undefined
    const items = JSON.parse(raw)
    if (!Array.isArray(items)) return undefined
    return { items: items.filter(isValidItem) }
  } catch {
    return undefined
  }
}

export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items))
  } catch {
    // Storage full or blocked: the cart still works, it just won't persist
  }
}
