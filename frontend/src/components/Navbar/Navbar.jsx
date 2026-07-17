import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, ShoppingBag, Heart } from "lucide-react";
import { NAV_LINKS, BRAND } from "../../utils/constants";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollPosition(30);
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-mark">L</span>
          <span className="navbar__logo-text">{BRAND.name}</span>
        </Link>

        <nav className="navbar__links navbar__links--desktop">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <Link to="/wishlist" className="navbar__icon-btn" aria-label="Wishlist">
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span className="navbar__badge">{wishlistItems.length}</span>
            )}
          </Link>
          <Link to="/cart" className="navbar__icon-btn" aria-label="Cart">
            <ShoppingBag size={20} />
            {itemCount > 0 && <span className="navbar__badge">{itemCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className="navbar__user">
              <button
                className="navbar__icon-btn"
                onClick={() => navigate("/profile")}
                aria-label="Profile"
              >
                <User size={20} />
              </button>
              <button className="btn btn-outline-dark btn-sm" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar__auth navbar__auth--desktop">
              <Link to="/login" className="btn btn-outline-dark btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}

          <button
            className="navbar__hamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="navbar__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="navbar__mobile-inner">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="navbar__mobile-link"
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="navbar__mobile-auth">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="btn btn-outline-dark btn-block" onClick={closeMenu}>
                      My Profile
                    </Link>
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline-dark btn-block" onClick={closeMenu}>
                      Login
                    </Link>
                    <Link to="/signup" className="btn btn-primary btn-block" onClick={closeMenu}>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
