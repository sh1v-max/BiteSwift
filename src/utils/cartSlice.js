import { createSlice } from "@reduxjs/toolkit"

const findItem = (items, id) => items.find((item) => item.card.info.id === id)

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const id = action.payload?.card?.info?.id
      const existing = findItem(state.items, id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.card.info.id !== action.payload)
    },
    incrementQuantity: (state, action) => {
      const item = findItem(state.items, action.payload)
      if (item) item.quantity += 1
    },
    decrementQuantity: (state, action) => {
      const item = findItem(state.items, action.payload)
      if (!item) return
      if (item.quantity <= 1) {
        state.items = state.items.filter((i) => i.card.info.id !== action.payload)
      } else {
        item.quantity -= 1
      }
    },
    clearCart: (state) => {
      state.items.length = 0
    },
  },
})

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer
