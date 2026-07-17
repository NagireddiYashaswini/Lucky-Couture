import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/helpers";
import "./Wishlist.css";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="wishlist-page">
        <section className="page-banner">
          <span className="section-eyebrow">Wishlist</span>
          <h1>Your Wishlist</h1>
        </section>
        <section className="section cart-page__empty">
          <Heart size={48} />
          <h3>Your wishlist is empty</h3>
          <p>Save your favourite designs and products here.</p>
          <Link to="/gallery" className="btn btn-primary">Explore Designs</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <section className="page-banner">
        <span className="section-eyebrow">Wishlist</span>
        <h1>Your Wishlist</h1>
      </section>

      <section className="section">
        <div className="container wishlist-page__grid">
          {items.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <button className="wishlist-card__remove" onClick={() => removeFromWishlist(item.id)} aria-label="Remove">
                <X size={16} />
              </button>
              <img src={item.img} alt={item.name} />
              <div className="wishlist-card__body">
                <span>{item.category}</span>
                <h4>{item.name}</h4>
                {item.price > 0 && <p>{formatCurrency(item.price)}</p>}
                {item.price > 0 && (
                  <button className="btn btn-primary btn-sm btn-block" onClick={() => addToCart(item, 1)}>
                    <ShoppingBag size={15} /> Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
