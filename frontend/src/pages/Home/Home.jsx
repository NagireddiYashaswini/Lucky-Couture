import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Services from "../../components/Services/Services";
import OurWork from "../../components/Gallery/OurWork";
import Testimonials from "../../components/Testimonials/Testimonials";
import FAQ from "../../components/FAQ/FAQ";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <OurWork />
      <Testimonials />
      <FAQ />

      <section className="cta">
        <div className="container cta__inner">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            Ready to Stitch Your Dream Outfit?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Book your tailoring today and let our master tailors bring your vision to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link to="/tailoring" className="btn btn-secondary">
              Book Now
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
