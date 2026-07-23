import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem, incrementQuantity, decrementQuantity, clearCart } from '../../utils/cartSlice'
import { IMG_CDN_URL } from '../../utils/constants'
import '../../css/Cart.css'

const DELIVERY_FEE = 40
const PLATFORM_FEE = 6
const GST_RATE = 0.05

const COUPONS = {
  BITESWIFT20: { discount: (subtotal) => (subtotal >= 200 ? 20 : 0), minOrder: 200 },
  FREEDEL: { discount: () => 0, freeDelivery: true },
}

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: '📱' },
  { id: 'card', label: 'Card', icon: '💳' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
]

const generateOrderId = () => `#BS${Math.floor(100000 + Math.random() * 900000)}`
const randomEta = () => `${25 + Math.floor(Math.random() * 15)}-${40 + Math.floor(Math.random() * 10)} mins`

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items)
  const dispatch = useDispatch()

  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [order, setOrder] = useState(null)

  const subtotal = cartItems.reduce((sum, item) => {
    const price = (item.card.info.price ?? item.card.info.defaultPrice ?? 0) / 100
    return sum + price * item.quantity
  }, 0)

  const gst = subtotal * GST_RATE
  const coupon = appliedCoupon ? COUPONS[appliedCoupon] : null
  const discount = coupon ? coupon.discount(subtotal) : 0
  const deliveryFee = coupon?.freeDelivery ? 0 : DELIVERY_FEE
  const total = subtotal + gst + deliveryFee + PLATFORM_FEE - discount

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase()
    if (!code) return
    const found = COUPONS[code]
    if (!found) {
      setCouponError('Invalid coupon code')
      return
    }
    if (found.minOrder && subtotal < found.minOrder) {
      setCouponError(`Add ₹${(found.minOrder - subtotal).toFixed(0)} more to use this code`)
      return
    }
    setAppliedCoupon(code)
    setCouponError('')
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponInput('')
    setCouponError('')
  }

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true)
    setTimeout(() => {
      setOrder({
        id: generateOrderId(),
        items: cartItems,
        total,
        paymentMethod,
        eta: randomEta(),
      })
      dispatch(clearCart())
      setIsPlacingOrder(false)
    }, 1400)
  }

  if (order) {
    return (
      <div className="cart-status">
        <span className="cart-status-icon">🎉</span>
        <h2>Order placed!</h2>
        <p className="cart-order-id">Order {order.id}</p>
        <p>Arriving in <strong>{order.eta}</strong></p>

        <div className="order-receipt">
          <h3>Order summary</h3>
          {order.items.map((item) => (
            <div key={item.card.info.id} className="order-receipt-row">
              <span>{item.quantity} × {item.card.info.name}</span>
              <span>₹{(((item.card.info.price ?? item.card.info.defaultPrice ?? 0) / 100) * item.quantity).toFixed(0)}</span>
            </div>
          ))}
          <div className="order-receipt-row order-receipt-total">
            <span>Total paid</span>
            <span>₹{order.total.toFixed(0)}</span>
          </div>
          <p className="order-payment-method">
            Paid via {PAYMENT_METHODS.find((p) => p.id === order.paymentMethod)?.label}
          </p>
        </div>

        <Link to="/" className="cart-cta">Back to home</Link>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-status">
        <span className="cart-status-icon">🛒</span>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="cart-cta">Browse restaurants</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <button className="cart-clear-btn" onClick={() => dispatch(clearCart())}>
          Clear cart
        </button>
      </div>

      <div className="cart-body">
        <div className="cart-main">
          <div className="cart-items">
            {cartItems.map((item) => {
              const { id, name, price, defaultPrice, imageId, description } = item.card.info
              const unitPrice = (price ?? defaultPrice ?? 0) / 100

              return (
                <div key={id} className="cart-item">
                  {imageId && (
                    <img
                      className="cart-item-img"
                      src={imageId.startsWith('http') ? imageId : IMG_CDN_URL + imageId}
                      alt={name}
                    />
                  )}

                  <div className="cart-item-info">
                    <h3>{name}</h3>
                    {description && <p>{description.slice(0, 90)}</p>}
                    <span className="cart-item-price">₹{unitPrice}</span>
                  </div>

                  <div className="cart-item-actions">
                    <div className="qty-stepper">
                      <button onClick={() => dispatch(decrementQuantity(id))} aria-label="Decrease quantity">−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(incrementQuantity(id))} aria-label="Increase quantity">+</button>
                    </div>
                    <button className="cart-remove-btn" onClick={() => dispatch(removeItem(id))}>
                      Remove
                    </button>
                  </div>

                  <div className="cart-item-subtotal">₹{(unitPrice * item.quantity).toFixed(0)}</div>
                </div>
              )
            })}
          </div>

          <div className="cart-section">
            <h2>Delivery address</h2>
            <div className="cart-address">
              <span className="cart-address-icon">📍</span>
              <div>
                <strong>Home</strong>
                <p>221B, Koramangala 4th Block, Bangalore, Karnataka 560034</p>
              </div>
            </div>
          </div>

          <div className="cart-section">
            <h2>Payment method</h2>
            <div className="payment-methods">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  className={`payment-method ${paymentMethod === method.id ? 'active' : ''}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <span>{method.icon}</span>
                  {method.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="cart-summary">
          <h2>Bill summary</h2>

          <div className="cart-coupon">
            {appliedCoupon ? (
              <div className="cart-coupon-applied">
                <span>🏷️ {appliedCoupon} applied</span>
                <button onClick={handleRemoveCoupon}>Remove</button>
              </div>
            ) : (
              <>
                <div className="cart-coupon-input">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value); setCouponError('') }}
                  />
                  <button onClick={handleApplyCoupon}>Apply</button>
                </div>
                {couponError && <p className="cart-coupon-error">{couponError}</p>}
              </>
            )}
          </div>

          <div className="cart-summary-row">
            <span>Item total</span>
            <span>₹{subtotal.toFixed(0)}</span>
          </div>
          <div className="cart-summary-row">
            <span>GST &amp; restaurant charges</span>
            <span>₹{gst.toFixed(0)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Delivery fee</span>
            <span>
              {deliveryFee === 0 ? (
                <><s>₹{DELIVERY_FEE}</s> <em>FREE</em></>
              ) : (
                `₹${deliveryFee}`
              )}
            </span>
          </div>
          <div className="cart-summary-row">
            <span>Platform fee</span>
            <span>₹{PLATFORM_FEE}</span>
          </div>
          {discount > 0 && (
            <div className="cart-summary-row cart-summary-discount">
              <span>Coupon discount</span>
              <span>−₹{discount.toFixed(0)}</span>
            </div>
          )}
          <div className="cart-summary-row cart-summary-total">
            <span>To pay</span>
            <span>₹{total.toFixed(0)}</span>
          </div>

          <button className="cart-checkout-btn" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
            {isPlacingOrder ? <span className="cart-btn-spinner" /> : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
