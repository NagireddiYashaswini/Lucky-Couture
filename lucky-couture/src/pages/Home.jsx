import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scissors, ShoppingBag, Sparkles, Quote, ArrowRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import Counter from "../components/Counter";
import FAQAccordion from "../components/FAQAccordion";
import { bestWork, testimonials, faqs } from "../data/mockData";

const offerings = [
  {
    icon: Scissors,
    title: "Custom Tailoring",
    desc: "Bring your own fabric or choose ours — every garment cut and stitched to your exact measurements.",
    to: "/tailoring",
  },
  {
    icon: ShoppingBag,
    title: "Curated Shopping",
    desc: "Ready-to-wear pieces from wedding lehengas to school uniforms, finished with the same hand-detailing.",
    to: "/shop",
  },
  {
    icon: Sparkles,
    title: "Stitch & Shop, Together",
    desc: "Order a ready piece and have it tailored to fit — the boutique experience, without the boutique wait.",
    to: "/design-gallery",
  },
];

export default function Home() {
  return (
    <div>
      {/* 1. Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://picsum.photos/seed/herofabric/1800/1200')" }}
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-highlight text-xs tracking-[0.4em] uppercase mb-5"
          >
            Est. Guntur — Bespoke since day one
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-bg max-w-3xl leading-[1.08]"
          >
            Clothing cut to <span className="text-gradient italic">your</span> story, not the rack.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-bg/80 text-base md:text-lg leading-relaxed"
          >
            From wedding couture to everyday school uniforms — hand-measured,
            hand-stitched, and delivered on a date we actually commit to.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/tailoring"
              className="group inline-flex items-center gap-2 bg-highlight text-primary font-semibold px-7 py-3.5 rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              Book Stitching
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/design-gallery"
              className="inline-flex items-center gap-2 border border-bg/40 text-bg px-7 py-3.5 rounded-full hover:bg-bg/10 transition-colors"
            >
              Explore Designs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. About */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img
                src="https://picsum.photos/seed/tailorportrait/900/1100"
                alt="Lucky Couture's tailoring workshop"
                loading="lazy"
                className="rounded-2xl w-full h-[460px] object-cover shadow-soft"
              />
              <div className="absolute -bottom-8 -right-6 bg-primary text-bg rounded-2xl p-6 shadow-soft hidden sm:block">
                <p className="font-display text-3xl font-bold text-highlight">15+</p>
                <p className="text-xs tracking-wide uppercase text-bg/70">Years of Craft</p>
              </div>
            </motion.div>

            <div>
              <SectionHeading
                align="left"
                eyebrow="About Us"
                title="A tailor's needle, a boutique's eye."
                subtitle="Lucky Couture began as a single sewing machine on Amaravathi Road. Today it's a small studio where every garment — stitched fresh or picked off the shelf — passes through the same hands that started it all, so fit and finish never get compromised for speed."
              />
              <div className="grid grid-cols-3 gap-4 mt-8 max-w-md">
                <Counter to={15} suffix="+" label="Years" />
                <Counter to={4200} suffix="+" label="Garments" />
                <Counter to={4} label="Daily Slots" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Offer */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading eyebrow="What We Offer" title="Two ways to dress well" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {offerings.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.04 }}
                className="bg-white rounded-2xl p-8 shadow-card cursor-pointer transition-shadow hover:shadow-soft"
              >
                <Link to={o.to} className="flex flex-col h-full">
                  <span className="w-12 h-12 rounded-full bg-highlight/60 flex items-center justify-center mb-6">
                    <o.icon size={20} className="text-primary" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-primary mb-2">{o.title}</h3>
                  <p className="text-sm text-ink/65 leading-relaxed flex-1">{o.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Best Work */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading light eyebrow="Our Best Work" title="Recently off the table" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {bestWork.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-[4/5] transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-5">
                  <p className="text-highlight text-[11px] uppercase tracking-widest">{w.subtitle}</p>
                  <p className="font-display text-lg md:text-xl text-bg font-semibold">{w.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading eyebrow="Kind Words" title="What our customers say" />
        </div>
        <div className="flex gap-6 w-max animate-marquee px-5">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[320px] shrink-0 bg-bg rounded-2xl p-6 shadow-card">
              <Quote size={20} className="text-accent mb-3" />
              <p className="text-sm text-ink/75 leading-relaxed mb-5">{t.quote}</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} loading="lazy" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium text-primary">{t.name}</p>
                  <p className="text-xs text-ink/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="relative rounded-3xl bg-primary overflow-hidden px-8 py-14 md:py-20 text-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_80%,white,transparent_35%)]" />
            <h2 className="relative font-display text-3xl md:text-4xl font-semibold text-bg mb-4">
              Ready for a fit that's actually yours?
            </h2>
            <p className="relative text-bg/70 max-w-md mx-auto mb-8">
              Slots fill up fast — we only take four stitching orders a day to keep every piece precise.
            </p>
            <Link
              to="/tailoring"
              className="relative inline-flex items-center gap-2 bg-highlight text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              Book Your Slot <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
