import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { OFFER_CARDS } from "../../utils/constants";
import "./OurWork.css";

export default function OurWork() {
  return (
    <section className="section our-work">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Our Best Work</span>
          <h2 className="section-heading">Occasions we love to dress up for</h2>
        </div>

        <div className="our-work__grid">
          {OFFER_CARDS.map((item, idx) => (
            <motion.div
              key={item.title}
              className="our-work__card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="our-work__image">
                <img src={item.img} alt={item.title} loading="lazy" />
              </div>
              <div className="our-work__body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <Link to="/gallery" className="btn btn-outline-dark btn-sm">
                  View Collection
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
