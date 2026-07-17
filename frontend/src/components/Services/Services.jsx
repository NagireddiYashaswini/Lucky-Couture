import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scissors, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import "./Services.css";

const OFFERS = [
  {
    icon: Scissors,
    title: "Tailoring",
    desc: "Custom-fit garments stitched to your exact measurements, from bridal blouses to school uniforms.",
    to: "/tailoring",
    cta: "Book Tailoring",
  },
  {
    icon: ShoppingBag,
    title: "Shopping",
    desc: "A curated boutique of sarees, nighties, designer blouses, and readymade dresses.",
    to: "/shop",
    cta: "Visit Shop",
  },
  {
    icon: Sparkles,
    title: "Custom Designs",
    desc: "Bring your own inspiration or work with us to create a one-of-a-kind design.",
    to: "/gallery",
    cta: "See Designs",
  },
];

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">What We Offer</span>
          <h2 className="section-heading">Three ways to fall in love with your wardrobe</h2>
        </div>

        <div className="services__grid">
          {OFFERS.map((offer, idx) => (
            <motion.div
              key={offer.title}
              className="services__card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
            >
              <div className="services__icon">
                <offer.icon size={28} />
              </div>
              <h3>{offer.title}</h3>
              <p>{offer.desc}</p>
              <Link to={offer.to} className="services__link">
                {offer.cta} <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
