import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, Scissors, Check } from "lucide-react";
import { useApp } from "../context/AppContext";

const perks = ["4 curated stitching slots reserved daily for members", "Early access to seasonal collections", "Track orders & book fittings in one place"];

export default function Signup() {
  const { signup } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const submit = (e) => {
    e.preventDefault();
    signup(form.name || "Guest", form.email || "you@example.com");
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-72px)] grid lg:grid-cols-2">
      {/* Left: image + perks panel */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src="https://picsum.photos/seed/signupboutique/900/1200"
          alt="Lucky Couture boutique"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
        <div className="relative z-10 h-full flex flex-col justify-end p-12">
          <h2 className="font-display text-3xl font-semibold text-bg mb-6 max-w-sm">
            Join a boutique that measures twice, stitches once.
          </h2>
          <ul className="flex flex-col gap-3">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-bg/85 text-sm">
                <span className="w-5 h-5 rounded-full bg-highlight flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-primary" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex items-center justify-center px-6 py-16 bg-bg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="flex items-center gap-2 mb-8">
            <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Scissors size={16} className="text-highlight" />
            </span>
            <span className="font-display text-lg font-semibold text-primary">Create your account</span>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-ink/60 mb-1.5">Full name</label>
              <div className="flex items-center gap-2 border border-primary/15 rounded-xl px-3.5 py-2.5 focus-within:border-accent bg-white">
                <User size={15} className="text-ink/40" />
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="text-sm outline-none w-full" placeholder="Ananya Rao" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-ink/60 mb-1.5">Email</label>
              <div className="flex items-center gap-2 border border-primary/15 rounded-xl px-3.5 py-2.5 focus-within:border-accent bg-white">
                <Mail size={15} className="text-ink/40" />
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="text-sm outline-none w-full" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-ink/60 mb-1.5">Phone</label>
              <div className="flex items-center gap-2 border border-primary/15 rounded-xl px-3.5 py-2.5 focus-within:border-accent bg-white">
                <Phone size={15} className="text-ink/40" />
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="text-sm outline-none w-full" placeholder="+91 98765 43210" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-ink/60 mb-1.5">Password</label>
              <div className="flex items-center gap-2 border border-primary/15 rounded-xl px-3.5 py-2.5 focus-within:border-accent bg-white">
                <Lock size={15} className="text-ink/40" />
                <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="text-sm outline-none w-full" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" className="mt-2 w-full bg-primary text-bg font-semibold py-3 rounded-full hover:bg-primary/90 transition-colors">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-ink/60 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-medium hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
