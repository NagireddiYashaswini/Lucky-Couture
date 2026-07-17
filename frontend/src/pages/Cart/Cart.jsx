import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, Tag, CheckCircle2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/helpers";
import "./Cart.css";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, applyCoupon, coupon, subtotal, discount, total, clearCart } = useCart();
  const [code, setCode] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);
  const [placed, setPlaced] = useState(false);

  const handleCheckout = () => {
    // Backend integration point: orderService.createOrder({ items, total, coupon })
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="cart-page">
        <section className="page-banner">
          <span className="section-eyebrow">Cart</span>
          <h1>Your Cart</h1>
        </section>
        <section className="section cart-page__empty">
          <CheckCircle2 size={48} color="var(--color-success)" />
          <h3>Order placed successfully!</h3>
          <p>We'll send order updates to your registered contact details.</p>
          <Link to="/orders" className="btn btn-primary">View Orders</Link>
        </section>
      </div>
    );
  }

  const handleApply = (e) => {
    e.preventDefault();
    if (!code) return;
    const ok = applyCoupon(code);
    setCouponMsg(ok ? "Coupon applied successfully!" : "Invalid coupon code.");
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <section className="page-banner">
          <span className="section-eyebrow">Cart</span>
          <h1>Your Cart</h1>
        </section>
        <section className="section cart-page__empty">
          <ShoppingBag size={48} />
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn btn-primary">Browse Shop</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <section className="page-banner">
        <span className="section-eyebrow">Cart</span>
        <h1>Your Cart</h1>
      </section>

      <section className="section">
        <div className="container cart-page__layout">
          <div className="cart-page__items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="cart-item__info">
                  <h4>{item.name}</h4>
                  <span>{item.category}</span>
                  <p className="cart-item__price">{formatCurrency(item.price)}</p>
                </div>
                <div className="cart-item__qty">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                    <Plus size={14} />
                  </button>
                </div>
                <p className="cart-item__total">{formatCurrency(item.price * item.quantity)}</p>
                <button className="cart-item__remove" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>

          <aside className="cart-page__summary">
            <h3>Order Summary</h3>

            <form onSubmit={handleApply} className="cart-page__coupon">
              <Tag size={16} />
              <input
                type="text"
                placeholder="Coupon code (try LUCKY10)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-dark btn-sm">Apply</button>
            </form>
            {couponMsg && <p className={`cart-page__coupon-msg ${coupon ? "is-success" : "is-error"}`}>{couponMsg}</p>}

            <div className="cart-page__row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="cart-page__row cart-page__row--discount">
                <span>Discount ({coupon.code})</span>
                <span>- {formatCurrency(discount)}</span>
              </div>
            )}
            <div className="cart-page__row">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="cart-page__row cart-page__row--total">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <button className="btn btn-primary btn-block" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
}
