import { render, screen, fireEvent, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { addItem } from '../utils/cartSlice'
import Cart from '../components/pages/Cart'

const menuItem = (id, name, price) => ({ card: { info: { id, name, price } } })
const margherita = menuItem('p1', 'Margherita', 29900) // ₹299
const garlicBread = menuItem('g1', 'Garlic Bread', 14900) // ₹149

const renderCart = (items = []) => {
  const store = configureStore({ reducer: { cart: cartReducer } })
  items.forEach((item) => store.dispatch(addItem(item)))
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Provider store={store}>
        <Cart />
      </Provider>
    </MemoryRouter>
  )
  return store
}

// Each bill line is a row of <span>label</span><span>amount</span>
const billRow = (label) => screen.getByText(label).parentElement

const applyCoupon = (code) => {
  fireEvent.change(screen.getByPlaceholderText('Enter coupon code'), { target: { value: code } })
  fireEvent.click(screen.getByRole('button', { name: 'Apply' }))
}

describe('Cart page', () => {
  it('shows the empty state when there is nothing in the cart', () => {
    renderCart()
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  // 2 × ₹299 + ₹149 = ₹747; GST 5% = ₹37.35; + ₹40 delivery + ₹6 platform = ₹830.35
  it('calculates the bill', () => {
    renderCart([margherita, margherita, garlicBread])
    expect(billRow('Item total')).toHaveTextContent('₹747')
    expect(billRow('GST & restaurant charges')).toHaveTextContent('₹37')
    expect(billRow('Delivery fee')).toHaveTextContent('₹40')
    expect(billRow('To pay')).toHaveTextContent('₹830')
  })

  it('updates the bill when the quantity changes', () => {
    renderCart([margherita])
    fireEvent.click(screen.getByRole('button', { name: 'Increase quantity' }))
    expect(billRow('Item total')).toHaveTextContent('₹598')
    fireEvent.click(screen.getByRole('button', { name: 'Decrease quantity' }))
    expect(billRow('Item total')).toHaveTextContent('₹299')
  })

  it('applies BITESWIFT20 for ₹20 off orders of ₹200 or more', () => {
    renderCart([margherita, margherita, garlicBread])
    applyCoupon('biteswift20')
    expect(billRow('Coupon discount')).toHaveTextContent('₹20')
    expect(billRow('To pay')).toHaveTextContent('₹810')
  })

  it('makes delivery free with FREEDEL', () => {
    renderCart([margherita])
    applyCoupon('FREEDEL')
    expect(billRow('Delivery fee')).toHaveTextContent('FREE')
  })

  it('tells the user how much more to add when below the coupon minimum', () => {
    renderCart([garlicBread])
    applyCoupon('BITESWIFT20')
    expect(screen.getByText('Add ₹51 more to use this code')).toBeInTheDocument()
  })

  it('rejects an unknown coupon', () => {
    renderCart([margherita])
    applyCoupon('FREEFOOD')
    expect(screen.getByText('Invalid coupon code')).toBeInTheDocument()
  })

  it('places the order and empties the cart', () => {
    jest.useFakeTimers()
    const store = renderCart([margherita, garlicBread])
    fireEvent.click(screen.getByRole('button', { name: 'Place Order' }))
    act(() => jest.advanceTimersByTime(1400))
    expect(screen.getByText('Order placed!')).toBeInTheDocument()
    expect(store.getState().cart.items).toEqual([])
    jest.useRealTimers()
  })
})
