import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../utils/constants";
import "./Testimonials.css";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const current = TESTIMONIALS[index];

  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="section-heading">Loved by our customers</h2>
        </div>

        <div className="testimonials__slider">
          <button className="testimonials__nav" onClick={prev} aria-label="Previous testimonial">
            <ChevronLeft size={20} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="testimonials__card"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Quote className="testimonials__quote-icon" size={36} />
              <div className="testimonials__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < current.rating ? "var(--color-accent)" : "none"}
                    color="var(--color-accent)"
                  />
                ))}
              </div>
              <p className="testimonials__review">"{current.review}"</p>
              <div className="testimonials__person">
                <img src={current.photo} alt={current.name} />
                <div>
                  <h4>{current.name}</h4>
                  <span>{current.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className="testimonials__nav" onClick={next} aria-label="Next testimonial">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="testimonials__dots">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              className={`testimonials__dot ${i === index ? "is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
