import { Package } from "lucide-react";
import "./Orders.css";

const DEMO_ORDERS = [
  { id: "LC10231", item: "Bridal Blouse — Zardozi Work", date: "12 Jul 2026", status: "In Progress", total: 1899 },
  { id: "LC10198", item: "Kids Festive Frock", date: "02 Jul 2026", status: "Delivered", total: 999 },
  { id: "LC10176", item: "Banarasi Silk Saree", date: "18 Jun 2026", status: "Delivered", total: 4599 },
];

const statusClass = {
  "In Progress": "is-progress",
  Delivered: "is-delivered",
  Cancelled: "is-cancelled",
};

export default function Orders() {
  return (
    <div className="orders-page">
      <section className="page-banner">
        <span className="section-eyebrow">Orders</span>
        <h1>Order History</h1>
      </section>

      <section className="section">
        <div className="container">
          {DEMO_ORDERS.length === 0 ? (
            <div className="cart-page__empty">
              <Package size={48} />
              <h3>No orders yet</h3>
              <p>Your tailoring and shop orders will appear here.</p>
            </div>
          ) : (
            <div className="orders-list">
              {DEMO_ORDERS.map((order) => (
                <div className="order-card" key={order.id}>
                  <div className="order-card__icon">
                    <Package size={22} />
                  </div>
                  <div className="order-card__info">
                    <h4>{order.item}</h4>
                    <span>Order #{order.id} · Placed {order.date}</span>
                  </div>
                  <span className={`order-card__status ${statusClass[order.status]}`}>{order.status}</span>
                  <span className="order-card__total">₹{order.total.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
