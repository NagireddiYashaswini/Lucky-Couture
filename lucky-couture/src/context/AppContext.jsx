import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => load("lc_cart", []));
  const [wishlist, setWishlist] = useState(() => load("lc_wishlist", []));
  const [user, setUser] = useState(() => load("lc_user", null));
  const [toast, setToast] = useState(null);

  useEffect(() => localStorage.setItem("lc_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("lc_wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => {
    if (user) localStorage.setItem("lc_user", JSON.stringify(user));
    else localStorage.removeItem("lc_user");
  }, [user]);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...product, qty }];
    });
    notify(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        notify(`Removed from wishlist`);
        return prev.filter((i) => i.id !== product.id);
      }
      notify(`Added to wishlist`);
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some((i) => i.id === id);

  // Mock auth — replace with POST /api/auth/login & /api/auth/signup
  const login = (email) => {
    setUser({ name: email.split("@")[0], email });
    notify("Welcome back!");
  };
  const signup = (name, email) => {
    setUser({ name, email });
    notify("Account created — welcome to Lucky Couture");
  };
  const logout = () => {
    setUser(null);
    notify("Signed out");
  };

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.qty * i.price, 0), [cart]);

  const value = {
    cart, addToCart, removeFromCart, updateQty, cartCount, cartTotal,
    wishlist, toggleWishlist, isWishlisted,
    user, login, signup, logout,
    toast, notify,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
