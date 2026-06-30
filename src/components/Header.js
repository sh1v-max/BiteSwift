import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import { useSelector } from 'react-redux'
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'

const Header = () => {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [loggedIn, setLoggedIn]     = useState(false)
  const onlineStatus                = useOnlineStatus()
  const cartItems                   = useSelector((store) => store.cart.items)
  const location                    = useLocation()

  const isHome = location.pathname === '/'

  // Transparent over the dark hero, solid white once user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link-active' : ''}`

  const transparent = isHome && !scrolled && !menuOpen

  return (
    <header className={`navbar ${transparent ? 'navbar-transparent' : 'navbar-solid'}`}>
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
          {/* Online status */}
          <span
            className={`status-dot ${onlineStatus ? 'status-online' : 'status-offline'}`}
            title={onlineStatus ? 'Online' : 'Offline'}
          />

          {/* Cart */}
          <Link to="/cart" className="cart-btn" aria-label="Cart">
            <FiShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
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
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
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
            Cart {cartItems.length > 0 && `(${cartItems.length})`}
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
