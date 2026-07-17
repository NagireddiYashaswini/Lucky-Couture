import { Heart, Star, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatCurrency, discountPercent } from "../../utils/helpers";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const off = discountPercent(product.price, product.mrp);

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate("/cart");
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      <div className="product-card__image-wrap">
        <img src={product.img} alt={product.name} className="product-card__img product-card__img--1" loading="lazy" />
        <img src={product.img2} alt="" className="product-card__img product-card__img--2" loading="lazy" />

        {off > 0 && <span className="product-card__offer">{off}% OFF</span>}

        <button
          className={`product-card__wishlist ${isWishlisted(product.id) ? "is-active" : ""}`}
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
        >
          <Heart size={17} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__rating">
          <Star size={14} fill="var(--color-accent)" color="var(--color-accent)" />
          <span>{product.rating}</span>
        </div>

        <div className="product-card__price">
          <span className="product-card__price-now">{formatCurrency(product.price)}</span>
          {off > 0 && <span className="product-card__price-mrp">{formatCurrency(product.mrp)}</span>}
        </div>

        <div className="product-card__actions">
          <button className="btn btn-outline-dark btn-sm" onClick={() => addToCart(product, 1)}>
            <ShoppingBag size={15} /> Add to Cart
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
