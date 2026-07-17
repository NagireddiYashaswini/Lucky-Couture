import { Link } from "react-router-dom";
import { Scissors, MessageCircle, MapPin, Phone, Mail } from "lucide-react";

// Lucide dropped brand/logo glyphs, so simple inline marks are used here
// for Instagram and Facebook to keep the footer dependency-free.
const InstagramMark = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookMark = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M14 9h2V6h-2c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9z" />
  </svg>
);

const quickLinks = [
  { to: "/design-gallery", label: "Design Gallery" },
  { to: "/tailoring", label: "Book Tailoring" },
  { to: "/shop", label: "Shop Collection" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const categories = [
  { to: "/design-gallery?category=Wedding", label: "Wedding" },
  { to: "/design-gallery?category=Men", label: "Men" },
  { to: "/design-gallery?category=Women", label: "Women" },
  { to: "/design-gallery?category=School", label: "School" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-bg pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          <div className="lg:pr-8">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-highlight flex items-center justify-center">
                <Scissors size={16} className="text-primary" />
              </span>
              <span className="font-display text-xl font-semibold">
                Lucky <span className="text-accent">Couture</span>
              </span>
            </Link>
            <p className="text-sm text-bg/70 leading-relaxed">
              Bespoke tailoring and curated fashion, hand-finished by a single
              tailor's needle — every stitch made to fit you, not the other
              way around.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[InstagramMark, FacebookMark, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-bg/20 flex items-center justify-center hover:bg-highlight hover:text-primary hover:border-highlight transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-bg/70 hover:text-highlight transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {categories.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-bg/70 hover:text-highlight transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Visit / Reach Us</h4>
            <ul className="space-y-3 text-sm text-bg/70">
              <li className="flex gap-2">
                <MapPin size={16} className="shrink-0 mt-0.5 text-accent" />
                <span>Muthyalareddy Nagar Main Road, Amaravathi Road, Guntur 522007</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={16} className="shrink-0 text-accent" />
                <a href="tel:+919876543210" className="hover:text-highlight">+91 98765 43210</a>
              </li>
              <li className="flex gap-2 items-center">
                <Mail size={16} className="shrink-0 text-accent" />
                <a href="mailto:hello@luckycouture.in" className="hover:text-highlight">hello@luckycouture.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="stitch-divider text-accent/40" />

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-bg/50">
          <p>© {new Date().getFullYear()} Lucky Couture. All rights reserved.</p>
          <p>Crafted with care in Guntur, Andhra Pradesh.</p>
        </div>
      </div>
    </footer>
  );
}
