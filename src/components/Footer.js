import { Link } from 'react-router-dom'
import { footer_content } from '../utils/footerData'
import '../css/Footer.css'

const SOCIAL_LINKS = [
  { label: 'Instagram', icon: '📸', href: '#' },
  { label: 'Twitter / X', icon: '🐦', href: '#' },
  { label: 'LinkedIn', icon: '💼', href: '#' },
  { label: 'Facebook', icon: '👥', href: '#' },
]

// Which footer column labels should link to a real route
const ROUTE_MAP = {
  About: '/about',
  'Help & Support': '/contact',
}

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">

      {/* ── Brand column ───────────────────────────────── */}
      <div className="footer-brand">
        <Link to="/" className="footer-logo">
          🍽️ <span>BiteSwift</span>
        </Link>
        <p className="footer-tagline">
          Delivering happiness, one meal at a time. Fast, fresh, and always on time.
        </p>

        <div className="footer-social">
          {SOCIAL_LINKS.map(({ label, icon, href }) => (
            <a
              key={label}
              href={href}
              className="footer-social-icon"
              aria-label={label}
              title={label}
            >
              {icon}
            </a>
          ))}
        </div>

        <div className="footer-app-badges">
          <button className="app-badge">
            <span className="badge-icon">📱</span>
            <span>
              <small>Get it on</small>
              Google Play
            </span>
          </button>
          <button className="app-badge">
            <span className="badge-icon">🍎</span>
            <span>
              <small>Download on the</small>
              App Store
            </span>
          </button>
        </div>
      </div>

      {/* ── Link columns from data ──────────────────────── */}
      {footer_content.map((section) => (
        <div key={section.id} className="footer-col">
          <h4 className="footer-col-title">{section.title}</h4>
          <ul className="footer-col-list">
            {section.data.map((item) =>
              ROUTE_MAP[item] ? (
                <li key={item}>
                  <Link to={ROUTE_MAP[item]} className="footer-link">
                    {item}
                  </Link>
                </li>
              ) : (
                <li key={item}>
                  <span className="footer-link">{item}</span>
                </li>
              )
            )}
          </ul>
        </div>
      ))}

    </div>

    {/* ── Bottom bar ─────────────────────────────────────── */}
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} BiteSwift Technologies Pvt. Ltd. All rights reserved.</p>
      <p className="footer-bottom-right">
        Made with ❤️ in India
      </p>
    </div>
  </footer>
)

export default Footer
