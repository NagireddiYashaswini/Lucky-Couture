import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { PRODUCTS, SHOP_CATEGORIES } from "../../utils/constants";
import "./Shop.css";

const SORTS = [
  { id: "latest", label: "Latest" },
  { id: "popular", label: "Popular" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
];

export default function Shop() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");
  const [maxPrice, setMaxPrice] = useState(9000);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.price <= maxPrice);
    if (category !== "All") list = list.filter((p) => p.category === category);

    if (sort === "popular") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [category, sort, maxPrice]);

  return (
    <div className="shop-page">
      <section className="page-banner">
        <span className="section-eyebrow">Shop</span>
        <h1>The Lucky Couture Boutique</h1>
        <p>Sarees, nighties, designer blouses, and readymade dresses, curated for you.</p>
      </section>

      <section className="section shop-page__body">
        <div className="container shop-page__layout">
          <aside className="shop-page__sidebar">
            <div className="shop-page__filter-group">
              <h4><SlidersHorizontal size={16} /> Category</h4>
              <button
                className={`shop-page__cat ${category === "All" ? "is-active" : ""}`}
                onClick={() => setCategory("All")}
              >
                All Products
              </button>
              {SHOP_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`shop-page__cat ${category === cat ? "is-active" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="shop-page__filter-group">
              <h4>Price</h4>
              <input
                type="range"
                min="500"
                max="9000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <p className="shop-page__price-label">Up to ₹{maxPrice.toLocaleString("en-IN")}</p>
            </div>
          </aside>

          <div className="shop-page__main">
            <div className="shop-page__toolbar">
              <span>{filtered.length} products</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            {filtered.length > 0 ? (
              <div className="shop-page__grid">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="shop-page__empty">No products match your filters right now.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
