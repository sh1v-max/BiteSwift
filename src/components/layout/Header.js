import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShoppingCart, Menu, X } from 'lucide-react'

const Header = () => {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [loggedIn, setLoggedIn]     = useState(false)
  const cartItems                   = useSelector((store) => store.cart.items)
  const cartCount                   = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const location                    = useLocation()

  // Adds a hairline shadow once the page scrolls past the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link-active' : ''}`

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">

        {/* ── Logo ── */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🍽️</span>
          <span className="logo-text">
            Bite<span className="logo-accent">Swift</span>
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="navbar-nav">
          <NavLink end to="/"        className={navLinkClass}>Home</NavLink>
          <NavLink to="/grocery"     className={navLinkClass}>Grocery</NavLink>
          <NavLink to="/about"       className={navLinkClass}>About</NavLink>
          <NavLink to="/contact"     className={navLinkClass}>Contact</NavLink>
        </nav>

        {/* ── Right side ── */}
        <div className="navbar-right">
          {/* Cart */}
          <Link to="/cart" className="cart-btn" aria-label="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* Login / Logout */}
          <button
            className={`auth-btn ${loggedIn ? 'auth-btn-outline' : ''}`}
            onClick={() => setLoggedIn((p) => !p)}
          >
            {loggedIn ? 'Logout' : 'Login'}
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`mobile-drawer ${menuOpen ? 'drawer-open' : ''}`}>
        <nav className="drawer-nav">
          <NavLink end to="/"    className={navLinkClass}>Home</NavLink>
          <NavLink to="/grocery" className={navLinkClass}>Grocery</NavLink>
          <NavLink to="/about"   className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/cart"    className={navLinkClass}>
            Cart {cartCount > 0 && `(${cartCount})`}
          </NavLink>
        </nav>
        <button
          className={`auth-btn drawer-auth-btn ${loggedIn ? 'auth-btn-outline' : ''}`}
          onClick={() => setLoggedIn((p) => !p)}
        >
          {loggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  )
}

export default Header
