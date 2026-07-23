import { ABOUT_IMG } from '../../utils/constants'
import { Link } from 'react-router-dom'
import '../../css/About.css'

const FEATURES = [
  { icon: '🚀', title: 'Fast & Reliable', desc: 'Average delivery in 30 minutes, tracked live from kitchen to your door.' },
  { icon: '🍽️', title: 'Wide Selection', desc: '200+ restaurants across every cuisine, from biryani to bubble tea.' },
  { icon: '💰', title: 'Fair Pricing', desc: 'Transparent fees and regular offers — no hidden surprises at checkout.' },
  { icon: '🔒', title: 'Secure Payments', desc: 'UPI, cards, or cash on delivery — your choice, always protected.' },
]

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-detail">
          <p className="about-eyebrow">About BiteSwift</p>
          <h1>
            Food delivery,<br />
            <span>done right.</span>
          </h1>
          <p className="about-lede">
            We connect you with the best restaurants in your city — fast delivery,
            fresh food, and a seamless ordering experience from browse to bite.
          </p>

          <div className="about-stats">
            <div><strong>200+</strong><span>Restaurants</span></div>
            <div><strong>30 min</strong><span>Avg delivery</span></div>
            <div><strong>4.8★</strong><span>Avg rating</span></div>
          </div>

          <Link to="/contact" className="about-cta">Get in touch →</Link>
        </div>

        <div className="about-img">
          <img className="image" src={ABOUT_IMG} alt="Fresh food from BiteSwift" />
        </div>
      </section>

      <section className="about-features">
        <h2>Why choose BiteSwift?</h2>
        <div className="about-features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="about-feature-card">
              <span className="about-feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
