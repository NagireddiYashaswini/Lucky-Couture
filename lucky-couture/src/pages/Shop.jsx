import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import { GridSkeleton } from "../components/Skeleton";
import { categories, products } from "../data/mockData";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function Shop() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, sort, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <SectionHeading
        eyebrow="Shop"
        title="Ready to wear, made with care"
        subtitle="Curated pieces you can order today — add to cart, save for later, or buy now."
      />

      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="lg:hidden flex items-center gap-2 text-sm font-medium text-primary border border-primary/15 px-4 py-2 rounded-full"
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        <span className="text-sm text-ink/50 hidden lg:block">{filtered.length} products</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-sm border border-primary/15 rounded-full px-4 py-2 outline-none focus:border-accent bg-white"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-10">
        {/* Filters sidebar */}
        <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="bg-white rounded-2xl shadow-card p-5 lg:sticky lg:top-24">
            <h4 className="font-display text-base font-semibold text-primary mb-4">Category</h4>
            <div className="flex flex-col gap-1 mb-6">
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    category === cat ? "bg-highlight/50 text-primary font-medium" : "text-ink/60 hover:bg-bg"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <h4 className="font-display text-base font-semibold text-primary mb-4">Max price</h4>
            <input
              type="range"
              min={500}
              max={15000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-accent"
            />
            <p className="text-sm text-ink/60 mt-2">Up to ₹{maxPrice.toLocaleString("en-IN")}</p>
          </div>
        </aside>

        {/* Products */}
        {loading ? (
          <GridSkeleton count={9} h="h-80" />
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 content-start">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
