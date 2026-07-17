import { motion } from "framer-motion";
import About from "../../components/About/About";
import { Link } from "react-router-dom";
import "./AboutPage.css";

const VALUES = [
  { title: "Precision Fit", desc: "Every measurement is double-checked before the first cut of fabric." },
  { title: "Honest Fabric Advice", desc: "We tell you what will drape well and last, not just what's trending." },
  { title: "On-Time Delivery", desc: "Realistic delivery dates based on our real daily stitching capacity." },
  { title: "Personal Touch", desc: "Every customer is remembered, and every order is treated as bespoke." },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="page-banner">
        <span className="section-eyebrow">About Us</span>
        <h1>The House Behind Lucky Couture</h1>
        <p>Two decades of stitching confidence into every outfit we make.</p>
      </section>

      <About />

      <section className="section about-page__values">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Our Values</span>
            <h2 className="section-heading">What guides every stitch</h2>
          </div>
          <div className="about-page__grid">
            {VALUES.map((v, idx) => (
              <motion.div
                key={v.title}
                className="about-page__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Let's create your next favourite outfit</h2>
          <p>Visit our studio or book a tailoring appointment online.</p>
          <Link to="/tailoring" className="btn btn-secondary">Book Tailoring</Link>
        </div>
      </section>
    </div>
  );
}
