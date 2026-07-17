import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Ruler, Package, Heart, MapPin, LogOut, Camera } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import "./Profile.css";

const TABS = [
  { id: "measurements", label: "Saved Measurements", icon: Ruler },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
];

const SAVED_MEASUREMENTS = [
  { label: "Bust", value: "34 in" },
  { label: "Waist", value: "28 in" },
  { label: "Shoulder", value: "14 in" },
  { label: "Hip", value: "36 in" },
  { label: "Sleeve", value: "10 in" },
  { label: "Height", value: "62 in" },
];

const SAVED_ADDRESSES = [
  { label: "Home", value: "12-3-45, Amaravathi Road, Guntur, 522007" },
  { label: "Work", value: "Muthyalareddy Nagar Main Road, Guntur, 522007" },
];

export default function Profile() {
  const { user, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [tab, setTab] = useState("measurements");

  return (
    <div className="profile-page">
      <section className="page-banner">
        <span className="section-eyebrow">My Account</span>
        <h1>Welcome back, {user?.name || "Guest"}</h1>
      </section>

      <section className="section">
        <div className="container profile-page__layout">
          <aside className="profile-page__sidebar">
            <div className="profile-page__avatar">
              <div className="profile-page__avatar-circle">
                <User size={30} />
                <button className="profile-page__avatar-edit" aria-label="Change photo">
                  <Camera size={13} />
                </button>
              </div>
              <h4>{user?.name || "Guest"}</h4>
              <span>{user?.email}</span>
            </div>

            <nav className="profile-page__nav">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  className={`profile-page__nav-item ${tab === t.id ? "is-active" : ""}`}
                  onClick={() => setTab(t.id)}
                >
                  <t.icon size={17} /> {t.label}
                </button>
              ))}
              <button className="profile-page__nav-item profile-page__logout" onClick={logout}>
                <LogOut size={17} /> Logout
              </button>
            </nav>
          </aside>

          <div className="profile-page__content">
            {tab === "measurements" && (
              <div className="profile-page__card">
                <h3>Saved Measurements</h3>
                <div className="profile-page__measurements">
                  {SAVED_MEASUREMENTS.map((m) => (
                    <div key={m.label} className="profile-page__measurement">
                      <span>{m.label}</span>
                      <strong>{m.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "orders" && (
              <div className="profile-page__card">
                <h3>Recent Orders</h3>
                <p className="profile-page__hint">
                  View your full order history on the <Link to="/orders">Orders</Link> page.
                </p>
              </div>
            )}

            {tab === "wishlist" && (
              <div className="profile-page__card">
                <h3>Wishlist ({wishlistItems.length})</h3>
                <p className="profile-page__hint">
                  Manage saved items on the <Link to="/wishlist">Wishlist</Link> page.
                </p>
              </div>
            )}

            {tab === "addresses" && (
              <div className="profile-page__card">
                <h3>Saved Addresses</h3>
                <div className="profile-page__addresses">
                  {SAVED_ADDRESSES.map((a) => (
                    <div key={a.label} className="profile-page__address">
                      <span>{a.label}</span>
                      <p>{a.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
