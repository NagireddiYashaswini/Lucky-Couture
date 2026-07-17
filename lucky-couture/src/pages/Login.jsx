import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Scissors, Eye, EyeOff } from "lucide-react";
import { useApp } from "../context/AppContext";

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
    <div className="min-h-[calc(100vh-72px)] bg-primary flex items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <span className="w-12 h-12 rounded-full bg-highlight flex items-center justify-center mb-4">
            <Scissors size={20} className="text-primary" />
          </span>
          <h1 className="font-display text-2xl font-semibold text-bg">Welcome back</h1>
          <p className="text-sm text-bg/60 mt-1">Log in to continue to Lucky Couture</p>
        </div>

        <form onSubmit={submit} className="glass-dark rounded-2xl p-7 border border-bg/10">
          <div className="mb-4">
            <label className="block text-xs text-bg/60 mb-1.5">Email</label>
            <div className="flex items-center gap-2 bg-bg/5 border border-bg/15 rounded-xl px-3.5 py-2.5 focus-within:border-accent">
              <Mail size={15} className="text-bg/50" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-transparent text-bg placeholder:text-bg/30 text-sm outline-none w-full"
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-xs text-bg/60 mb-1.5">Password</label>
            <div className="flex items-center gap-2 bg-bg/5 border border-bg/15 rounded-xl px-3.5 py-2.5 focus-within:border-accent">
              <Lock size={15} className="text-bg/50" />
              <input
                required
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent text-bg placeholder:text-bg/30 text-sm outline-none w-full"
              />
              <button type="button" onClick={() => setShow((s) => !s)} className="text-bg/40" aria-label="Toggle password visibility">
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div className="flex justify-end mb-6">
            <button type="button" className="text-xs text-highlight hover:underline">Forgot password?</button>
          </div>
          <button type="submit" className="w-full bg-highlight text-primary font-semibold py-3 rounded-full hover:bg-accent hover:text-white transition-colors">
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-bg/60 mt-6">
          New to Lucky Couture?{" "}
          <Link to="/signup" className="text-highlight font-medium hover:underline">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
