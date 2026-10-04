import cartReducer, {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from '../utils/cartSlice'

// Items have the same shape as Swiggy's menu API: prices are in paise.
const menuItem = (id, name, price) => ({ card: { info: { id, name, price } } })
const margherita = menuItem('p1', 'Margherita', 29900)
const garlicBread = menuItem('g1', 'Garlic Bread', 14900)

const reduce = (...actions) => actions.reduce(cartReducer, undefined)
const quantities = (state) => state.items.map((i) => [i.card.info.id, i.quantity])

describe('cart reducer', () => {
  it('starts empty', () => {
    expect(reduce({ type: '@@init' }).items).toEqual([])
  })

  it('adds a new item with quantity 1', () => {
    expect(quantities(reduce(addItem(margherita)))).toEqual([['p1', 1]])
  })

  it('bumps the quantity instead of duplicating when the same item is added again', () => {
    const state = reduce(addItem(margherita), addItem(margherita), addItem(garlicBread))
    expect(quantities(state)).toEqual([['p1', 2], ['g1', 1]])
  })

  it('increments an item in the cart', () => {
    expect(quantities(reduce(addItem(margherita), incrementQuantity('p1')))).toEqual([['p1', 2]])
  })

  it('decrements an item that has more than one', () => {
    const state = reduce(addItem(margherita), addItem(margherita), decrementQuantity('p1'))
    expect(quantities(state)).toEqual([['p1', 1]])
  })

  it('removes the item when decrementing from 1', () => {
    const state = reduce(addItem(margherita), addItem(garlicBread), decrementQuantity('p1'))
    expect(quantities(state)).toEqual([['g1', 1]])
  })

  it('ignores increment and decrement for ids not in the cart', () => {
    const state = reduce(addItem(margherita), incrementQuantity('nope'), decrementQuantity('nope'))
    expect(quantities(state)).toEqual([['p1', 1]])
  })

  it('removes an item regardless of its quantity', () => {
    const state = reduce(addItem(margherita), addItem(margherita), addItem(garlicBread), removeItem('p1'))
    expect(quantities(state)).toEqual([['g1', 1]])
  })

  it('clears the cart', () => {
    expect(reduce(addItem(margherita), addItem(garlicBread), clearCart()).items).toEqual([])
  })
})
