import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useApp } from "../context/AppContext";
import logo from "../assets/logo.jpg";

// Light, editorial-styled centered card — a deliberately different palette
// and mood from the Signup box (which uses the dark primary theme) while
// both sit centered in the page.
export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    login(email || "you@example.com");
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-5 py-16 bg-[radial-gradient(circle_at_top,_#F8F6F2,_#EFE6D8)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-soft border border-accent/15 overflow-hidden">
          <div className="bg-primary py-8 flex flex-col items-center">
            <span className="w-14 h-14 rounded-full ring-2 ring-highlight/60 overflow-hidden mb-3">
              <img src={logo} alt="Lucky Couture logo" className="w-full h-full object-cover" />
            </span>
            <h1 className="font-display text-2xl font-semibold text-bg">Welcome back</h1>
            <p className="text-sm text-bg/60 mt-1">Log in to Lucky Couture</p>
          </div>

          <form onSubmit={submit} className="p-8">
            <div className="mb-4">
              <label className="block text-xs font-medium text-secondary mb-1.5 tracking-wide uppercase">Email</label>
              <div className="flex items-center gap-2 bg-bg border border-primary/12 rounded-xl px-3.5 py-3 focus-within:border-accent transition-colors">
                <Mail size={16} className="text-secondary" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-transparent text-ink placeholder:text-ink/30 text-sm outline-none w-full"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-secondary mb-1.5 tracking-wide uppercase">Password</label>
              <div className="flex items-center gap-2 bg-bg border border-primary/12 rounded-xl px-3.5 py-3 focus-within:border-accent transition-colors">
                <Lock size={16} className="text-secondary" />
                <input
                  required
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent text-ink placeholder:text-ink/30 text-sm outline-none w-full"
                />
                <button type="button" onClick={() => setShow((s) => !s)} className="text-ink/35" aria-label="Toggle password visibility">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end mb-6">
              <button type="button" className="text-xs text-accent hover:underline">Forgot password?</button>
            </div>
            <button type="submit" className="w-full bg-primary text-bg font-semibold py-3.5 rounded-full hover:bg-primary/90 transition-colors shadow-card">
              Log In
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-ink/60 mt-6">
          New to Lucky Couture?{" "}
          <Link to="/signup" className="text-accent font-semibold hover:underline">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
