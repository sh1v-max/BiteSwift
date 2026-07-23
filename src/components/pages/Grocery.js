import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../css/Grocery.css'

const PREVIEW_CATEGORIES = [
  { emoji: '🍎', label: 'Fruits' },
  { emoji: '🥦', label: 'Vegetables' },
  { emoji: '🥛', label: 'Dairy' },
  { emoji: '🍞', label: 'Bakery' },
  { emoji: '🍿', label: 'Snacks' },
  { emoji: '🧃', label: 'Beverages' },
]

const Grocery = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | notified

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('submitting')
    setTimeout(() => setStatus('notified'), 900)
  }

  return (
    <div className="grocery-page">
      <div className="grocery-hero">
        <span className="grocery-icon">🛒</span>
        <p className="grocery-eyebrow">Coming Soon</p>
        <h1>Groceries, delivered next.</h1>
        <p className="grocery-lede">
          We're bringing fresh produce, dairy, and daily essentials to BiteSwift —
          the same fast delivery you already know, now for your pantry too.
        </p>

        {status === 'notified' ? (
          <p className="grocery-notified">✅ You're on the list — we'll email you when we launch.</p>
        ) : (
          <form className="grocery-notify-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? <span className="grocery-spinner" /> : 'Notify me'}
            </button>
          </form>
        )}

        <Link to="/" className="grocery-back">← Back to restaurants</Link>
      </div>

      <div className="grocery-preview">
        <p className="grocery-preview-label">What's on the way</p>
        <div className="grocery-preview-grid">
          {PREVIEW_CATEGORIES.map((cat) => (
            <div key={cat.label} className="grocery-preview-chip">
              <span>{cat.emoji}</span>
              {cat.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Grocery
