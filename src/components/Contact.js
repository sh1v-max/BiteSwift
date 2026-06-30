import '../css/Contact.css'

const Contact = () => (
  <div className="contact-container">
    <h1 className="contact-us">Contact Us</h1>
    <p className="description">
      We'd love to hear from you — questions, feedback, or just a hello. Reach out any time.
    </p>

    <div className="contact-info">
      <div className="contact-card">
        <h2>📍 Address</h2>
        <p>BiteSwift HQ, 12th Floor, Tower B, Embassy TechVillage, Bangalore – 560103</p>
      </div>
      <div className="contact-card">
        <h2>📞 Phone</h2>
        <p>+91 80-4600-0000<br />Mon – Sat, 9 AM – 9 PM</p>
      </div>
      <div className="contact-card">
        <h2>📧 Email</h2>
        <p>support@biteswift.in</p>
      </div>
    </div>

    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Send Us a Message</h2>
      <input type="text"  placeholder="Your Name"    required />
      <input type="email" placeholder="Your Email"   required />
      <textarea           placeholder="Your Message" rows="4" required />
      <button type="submit">Send Message</button>
    </form>
  </div>
)

export default Contact
