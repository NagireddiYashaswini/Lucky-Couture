import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Menu, X, Scissors, User } from "lucide-react";
import { useApp } from "../context/AppContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/design-gallery", label: "Design Gallery" },
  { to: "/tailoring", label: "Tailoring" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist, user, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm tracking-wide font-medium transition-colors ${
      isActive ? "text-accent" : "text-primary/80 hover:text-primary"
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <Scissors size={16} className="text-highlight" />
            </span>
            <span className="font-display text-xl font-semibold text-primary tracking-tight">
              Lucky <span className="text-accent">Couture</span>
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
                {({ isActive }) => (
                  <span className="relative">
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link to="/wishlist" className="relative hidden sm:flex p-2 text-primary hover:text-accent transition-colors" aria-label="Wishlist">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 text-primary hover:text-accent transition-colors" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <button
                onClick={() => navigate("/profile")}
                className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-primary/15 hover:border-accent transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-highlight flex items-center justify-center text-xs font-semibold">
                  {user.name?.[0]?.toUpperCase()}
                </span>
                <span className="text-sm text-primary">{user.name}</span>
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm font-medium text-primary border border-primary/20 hover:border-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-full text-sm font-semibold text-primary bg-highlight hover:bg-accent hover:text-white transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}

            <button
              className="lg:hidden p-2 text-primary"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass overflow-hidden border-t border-primary/10"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-2.5 text-sm font-medium border-b border-primary/5 last:border-none ${
                      isActive ? "text-accent" : "text-primary"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="flex items-center gap-3 pt-3">
                {user ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/profile");
                    }}
                    className="flex items-center gap-2 text-sm text-primary"
                  >
                    <User size={16} /> {user.name}
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="flex-1 text-center px-4 py-2 rounded-full text-sm font-medium text-primary border border-primary/20"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setOpen(false)}
                      className="flex-1 text-center px-4 py-2 rounded-full text-sm font-semibold text-primary bg-highlight"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
