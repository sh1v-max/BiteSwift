import { render, screen, fireEvent, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { addItem } from '../utils/cartSlice'
import Header from '../components/layout/Header'

const renderHeader = () => {
  const store = configureStore({ reducer: { cart: cartReducer } })
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Provider store={store}>
        <Header />
      </Provider>
    </MemoryRouter>
  )
  return store
}

const pizza = { card: { info: { id: 'p1', name: 'Margherita', price: 29900 } } }

describe('Header', () => {
  it('renders the nav links', () => {
    renderHeader()
    for (const name of ['Home', 'Grocery', 'About', 'Contact']) {
      expect(screen.getAllByRole('link', { name }).length).toBeGreaterThan(0)
    }
  })

  it('shows no cart count when the cart is empty', () => {
    renderHeader()
    expect(screen.getByLabelText('Cart')).toHaveTextContent(/^$/)
    expect(screen.queryByRole('link', { name: /Cart \(\d+\)/ })).not.toBeInTheDocument()
  })

  it('shows the total quantity, not the number of distinct items', () => {
    const store = renderHeader()
    act(() => {
      store.dispatch(addItem(pizza))
      store.dispatch(addItem(pizza))
    })
    expect(screen.getByLabelText('Cart')).toHaveTextContent('2')
    expect(screen.getByRole('link', { name: 'Cart (2)' })).toBeInTheDocument()
  })

  it('toggles Login to Logout and back', () => {
    renderHeader()
    fireEvent.click(screen.getAllByRole('button', { name: 'Login' })[0])
    expect(screen.getAllByRole('button', { name: 'Logout' }).length).toBeGreaterThan(0)
    fireEvent.click(screen.getAllByRole('button', { name: 'Logout' })[0])
    expect(screen.getAllByRole('button', { name: 'Login' }).length).toBeGreaterThan(0)
  })
})
