import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import DesignCard from "../components/DesignCard";
import { GridSkeleton } from "../components/Skeleton";
import { categories, designs } from "../data/mockData";
import { useEffect } from "react";

export default function DesignGallery() {
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category") || "All";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return designs;
    return designs.filter((d) => d.category === activeCategory);
  }, [activeCategory]);

  const setCategory = (cat) => {
    if (cat === "All") setParams({});
    else setParams({ category: cat });
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <SectionHeading
        eyebrow="Design Gallery"
        title="Stitched by Lucky Couture"
        subtitle="Browse past work across categories — tap any design to book something similar, tailored to you."
      />

      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === cat
                ? "bg-primary text-bg border-primary"
                : "border-primary/20 text-primary hover:border-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <GridSkeleton count={9} h="h-80" />
      ) : (
        <motion.div layout className="columns-2 md:columns-3 gap-5 md:gap-7">
          {filtered.map((d) => (
            <DesignCard key={d.id} design={d} />
          ))}
        </motion.div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-ink/50 py-16">No designs found in this category yet.</p>
      )}
    </div>
  );
}
