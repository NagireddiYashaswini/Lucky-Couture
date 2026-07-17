import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("lc_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("lc_user");
      }
    }
    setLoading(false);
  }, []);

  const login = ({ email, password }) => {
    // Placeholder for backend integration: authService.login({ email, password })
    const fakeUser = {
      id: "demo-user",
      name: email.split("@")[0] || "Guest",
      email,
    };
    localStorage.setItem("lc_user", JSON.stringify(fakeUser));
    localStorage.setItem("lc_token", "demo-token");
    setUser(fakeUser);
    return fakeUser;
  };

  const signup = ({ name, email, phone }) => {
    const fakeUser = { id: "demo-user", name, email, phone };
    localStorage.setItem("lc_user", JSON.stringify(fakeUser));
    localStorage.setItem("lc_token", "demo-token");
    setUser(fakeUser);
    return fakeUser;
  };

  const logout = () => {
    localStorage.removeItem("lc_user");
    localStorage.removeItem("lc_token");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: !!user, login, signup, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
