import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { BRAND } from "../../utils/constants";
import "./Contact.css";

const HOURS = [
  { day: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
  { day: "Sunday", time: "11:00 AM – 5:00 PM" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="contact-page">
      <section className="page-banner">
        <span className="section-eyebrow">Contact</span>
        <h1>We'd Love to Hear From You</h1>
        <p>Reach out for tailoring queries, shop orders, or just to say hello.</p>
      </section>

      <section className="section">
        <div className="container contact-page__layout">
          <div className="contact-page__info">
            <a className="contact-page__item" href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>
              <Phone size={20} />
              <div>
                <span>Phone</span>
                <p>{BRAND.phone}</p>
              </div>
            </a>
            <a
              className="contact-page__item"
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={20} />
              <div>
                <span>WhatsApp</span>
                <p>Chat with us instantly</p>
              </div>
            </a>
            <a className="contact-page__item" href={`mailto:${BRAND.email}`}>
              <Mail size={20} />
              <div>
                <span>Email</span>
                <p>{BRAND.email}</p>
              </div>
            </a>
            <div className="contact-page__item">
              <MapPin size={20} />
              <div>
                <span>Address</span>
                <p>{BRAND.address}</p>
              </div>
            </div>

            <div className="contact-page__hours">
              <h4><Clock size={16} /> Business Hours</h4>
              {HOURS.map((h) => (
                <div key={h.day} className="contact-page__hours-row">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-page__right">
            <form className="contact-page__form" onSubmit={handleSubmit}>
              <h3>Send us a message</h3>
              <div className="field">
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
              </div>
              <div className="field">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="How can we help?" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                <Send size={16} /> Send Message
              </button>
              {sent && <p className="contact-page__sent">Thanks! We'll get back to you shortly.</p>}
            </form>

            <div className="contact-page__map">
              <MapPin size={30} />
              <p>Google Map placeholder — Muthyalareddy Nagar Main Road, Guntur</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
