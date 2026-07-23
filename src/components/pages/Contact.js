import { useState } from 'react'
import '../../css/Contact.css'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 1200)
  }

  return (
    <div className="contact-container">
      <h1 className="contact-us">Contact Us</h1>
      <p className="description">
        We'd love to hear from you — questions, feedback, or just a hello. Reach out any time.
      </p>

      <div className="contact-info">
        <div className="contact-card">
          <span className="contact-icon">📍</span>
          <h2>Address</h2>
          <p>BiteSwift HQ, 12th Floor, Tower B, Embassy TechVillage, Bangalore – 560103</p>
        </div>
        <div className="contact-card">
          <span className="contact-icon">📞</span>
          <h2>Phone</h2>
          <p>+91 80-4600-0000<br />Mon – Sat, 9 AM – 9 PM</p>
        </div>
        <div className="contact-card">
          <span className="contact-icon">📧</span>
          <h2>Email</h2>
          <p>support@biteswift.in</p>
        </div>
      </div>

      {status === 'sent' ? (
        <div className="contact-success">
          <span>✅</span>
          <h2>Message sent!</h2>
          <p>Thanks for reaching out — we'll get back to you within 24 hours.</p>
          <button onClick={() => setStatus('idle')}>Send another message</button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? <span className="contact-spinner" /> : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  )
}

export default Contact
