import { createAppStore } from '../utils/appStore'
import { addItem, clearCart } from '../utils/cartSlice'
import { CART_STORAGE_KEY } from '../utils/cartStorage'

// Jest runs these in jsdom, a fake browser, so localStorage exists here
// just like in a real browser.

const pizza = { card: { info: { id: 'p1', name: 'Margherita', price: 29900 } } }

const saved = () => JSON.parse(localStorage.getItem(CART_STORAGE_KEY))

// Every test starts with empty storage so one test can't affect another
beforeEach(() => localStorage.clear())

describe('cart persistence', () => {
  it('starts with an empty cart when nothing is saved', () => {
    expect(createAppStore().getState().cart.items).toEqual([])
  })

  it('saves the cart whenever it changes', () => {
    const store = createAppStore()
    store.dispatch(addItem(pizza))
    store.dispatch(addItem(pizza))
    expect(saved()).toEqual([{ ...pizza, quantity: 2 }])
  })

  // This is the "refresh": a brand-new store, like the page loading again
  it('restores the saved cart in a new store, as after a page refresh', () => {
    createAppStore().dispatch(addItem(pizza))

    const afterRefresh = createAppStore()
    expect(afterRefresh.getState().cart.items).toEqual([{ ...pizza, quantity: 1 }])
  })

  it('saves the empty cart after clearing, so cleared items do not come back', () => {
    const store = createAppStore()
    store.dispatch(addItem(pizza))
    store.dispatch(clearCart())
    expect(createAppStore().getState().cart.items).toEqual([])
  })

  // Things a real browser can throw at us: corrupted or old data, or no storage at all
  it('ignores data that is not valid JSON', () => {
    localStorage.setItem(CART_STORAGE_KEY, '{not json')
    expect(createAppStore().getState().cart.items).toEqual([])
  })

  it('drops saved items that are missing an id or a valid quantity', () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([
      { ...pizza, quantity: 1 },
      { card: { info: {} }, quantity: 1 },
      { ...pizza, quantity: 'lots' },
    ]))
    expect(createAppStore().getState().cart.items).toEqual([{ ...pizza, quantity: 1 }])
  })

  it('still works when localStorage throws, e.g. storage blocked', () => {
    // jest.spyOn temporarily replaces a method; mockRestore puts the real one back
    const get = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    const set = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })

    const store = createAppStore()
    store.dispatch(addItem(pizza))
    expect(store.getState().cart.items).toHaveLength(1)

    get.mockRestore()
    set.mockRestore()
  })
})
