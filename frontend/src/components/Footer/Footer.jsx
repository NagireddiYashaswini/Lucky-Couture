import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { BRAND, NAV_LINKS } from "../../utils/constants";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-mark">L</span>
            <span>{BRAND.name}</span>
          </Link>
          <p className="footer__desc">
            A premium boutique and tailoring house crafting bridalwear, everyday
            essentials, and custom outfits with meticulous stitching and honest care.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" aria-label="Youtube"><Youtube size={18} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/tailoring">Custom Tailoring</Link></li>
            <li><Link to="/shop">Boutique Shopping</Link></li>
            <li><Link to="/gallery">Design Consultation</Link></li>
            <li><Link to="/tailoring">Alterations</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li><Phone size={16} /><span>{BRAND.phone}</span></li>
            <li><Mail size={16} /><span>{BRAND.email}</span></li>
            <li><MapPin size={16} /><span>{BRAND.address}</span></li>
          </ul>
        </div>

        <div className="footer__col footer__newsletter">
          <h4>Newsletter</h4>
          <p>Get style tips and offers straight to your inbox.</p>
          <form onSubmit={handleSubscribe} className="footer__form">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-secondary btn-sm">
              Subscribe
            </button>
          </form>
          {subscribed && <span className="footer__subscribed">Subscribed! Welcome to Lucky Couture.</span>}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>Designed with care in Guntur.</p>
        </div>
      </div>
    </footer>
  );
}
