import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { loadCart, saveCart } from "./cartStorage";

export const createAppStore = () => {
  const savedCart = loadCart();

  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: savedCart ? { cart: savedCart } : undefined,
  });

  // Write only when the cart actually changes, not on every dispatch
  let lastCart = store.getState().cart;
  store.subscribe(() => {
    const { cart } = store.getState();
    if (cart !== lastCart) {
      lastCart = cart;
      saveCart(cart);
    }
  });

  return store;
};

const appStore = createAppStore();

export default appStore;
