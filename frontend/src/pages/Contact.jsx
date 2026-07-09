import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <section className="contact">

      <div className="contact-header">

        <span>CONTACT US</span>

        <h1>Let's Build Something Great Together.</h1>

        <p>
          Have a question about our products or services?
          We'd love to hear from you.
        </p>

      </div>

      <div className="contact-container">

        <div className="contact-info">

          <div className="info-card">
            <FaPhoneAlt className="contact-icon" />
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="info-card">
            <FaEnvelope className="contact-icon" />
            <h3>Email</h3>
            <p>support@originstore.com</p>
          </div>

          <div className="info-card">
            <FaMapMarkerAlt className="contact-icon" />
            <h3>Location</h3>
            <p>Patna, Bihar, India</p>
          </div>

        </div>

        <form className="contact-form">

          <input
            type="text"
            placeholder="Your Name"
          />

          <input
            type="email"
            placeholder="Your Email"
          />

          <textarea
            rows="6"
            placeholder="Write your message..."
          ></textarea>

          <button>
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;