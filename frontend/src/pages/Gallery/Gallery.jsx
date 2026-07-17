import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import GalleryMasonry from "../../components/Gallery/GalleryMasonry";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "../../utils/constants";
import "./Gallery.css";

export default function Gallery() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === active);
  }, [active]);

  return (
    <div className="gallery-page">
      <section className="page-banner">
        <div className="container">
          <span className="section-eyebrow">Design Gallery</span>
          <h1>A Pinterest of Possibilities</h1>
          <p>Browse our finished work and find the design that speaks to you.</p>
        </div>
      </section>

      <section className="section gallery-page__body">
        <div className="container">
          <div className="gallery-page__filters">
            {["All", ...GALLERY_CATEGORIES].map((cat) => (
              <button
                key={cat}
                className={`gallery-page__filter ${active === cat ? "is-active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout>
            {filtered.length > 0 ? (
              <GalleryMasonry items={filtered} />
            ) : (
              <p className="gallery-page__empty">No designs found in this category yet.</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
