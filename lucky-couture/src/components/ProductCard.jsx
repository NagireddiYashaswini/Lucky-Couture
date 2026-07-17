import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const navigate = useNavigate();
  const liked = isWishlisted(product.id);
  const discount = Math.round(100 - (product.price / product.mrp) * 100);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-card"
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.tag && (
          <span className="absolute top-3 left-3 bg-highlight text-primary text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
            {product.tag}
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
            liked ? "bg-accent text-white" : "bg-white/80 text-primary hover:bg-accent hover:text-white"
          }`}
        >
          <Heart size={15} fill={liked ? "currentColor" : "none"} />
        </button>

        <div className="absolute bottom-0 inset-x-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-bg text-xs font-medium py-2.5 rounded-full hover:bg-primary/90"
          >
            <ShoppingBag size={13} /> Add to Cart
          </button>
          <button
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-highlight text-primary text-xs font-semibold py-2.5 rounded-full hover:bg-accent hover:text-white"
          >
            <Zap size={13} /> Buy Now
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[11px] uppercase tracking-wider text-secondary mb-1">{product.category}</p>
        <h3 className="font-display text-base font-medium text-primary leading-snug mb-1.5 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="text-accent fill-accent" />
          <span className="text-xs text-ink/60">{product.rating}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-primary">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="text-xs text-ink/40 line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
          <span className="text-xs text-green-700">{discount}% off</span>
        </div>
      </div>
    </motion.div>
  );
}
