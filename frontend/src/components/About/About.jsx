import { motion } from "framer-motion";
import { useCounter } from "../../hooks/useCounter";
import { useInView } from "../../hooks/useInView";
import "./About.css";

const STATS = [
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 1000, suffix: "+", label: "Happy Customers" },
  { value: 500, suffix: "+", label: "Designs" },
];

function Stat({ value, suffix, label, inView }) {
  const count = useCounter(value, inView);
  return (
    <div className="about__stat">
      <h3>
        {count}
        {suffix}
      </h3>
      <p>{label}</p>
    </div>
  );
}

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section className="section about" id="about" ref={ref}>
      <div className="container about__grid">
        <motion.div
          className="about__image-wrap"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://images.unsplash.com/photo-1592878849122-facb97520f9e?w=700&q=80"
            alt="Master tailor at work in the Lucky Couture studio"
          />
          <div className="about__badge">
            <span>20+</span>
            Years of Craft
          </div>
        </motion.div>

        <motion.div
          className="about__text"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">About Lucky Couture</span>
          <h2 className="section-heading">
            Stitching stories since day one, with needle and unwavering care.
          </h2>
          <p className="section-sub">
            Lucky Couture began as a small family tailoring table and has grown
            into a trusted boutique house known for its precision fits, honest
            fabric advice, and a genuine love for the craft. Every garment that
            leaves our studio is measured, cut, and finished by hand.
          </p>

          <div className="about__stats">
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
