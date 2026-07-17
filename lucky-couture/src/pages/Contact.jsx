import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, Send } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { useApp } from "../context/AppContext";

export default function Contact() {
  const { notify } = useApp();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    notify("Message sent — we'll reply soon");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <SectionHeading eyebrow="Get in Touch" title="We'd love to hear from you" />
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <a href="tel:+919876543210" className="flex items-center gap-4 bg-white rounded-2xl shadow-card p-5 hover:shadow-soft transition-shadow">
            <span className="w-11 h-11 rounded-full bg-highlight/50 flex items-center justify-center"><Phone size={18} className="text-primary" /></span>
            <div>
              <p className="text-xs uppercase tracking-wide text-secondary">Call</p>
              <p className="font-medium text-primary">+91 98765 43210</p>
            </div>
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white rounded-2xl shadow-card p-5 hover:shadow-soft transition-shadow">
            <span className="w-11 h-11 rounded-full bg-highlight/50 flex items-center justify-center"><MessageCircle size={18} className="text-primary" /></span>
            <div>
              <p className="text-xs uppercase tracking-wide text-secondary">WhatsApp</p>
              <p className="font-medium text-primary">+91 98765 43210</p>
            </div>
          </a>
          <a href="mailto:hello@luckycouture.in" className="flex items-center gap-4 bg-white rounded-2xl shadow-card p-5 hover:shadow-soft transition-shadow">
            <span className="w-11 h-11 rounded-full bg-highlight/50 flex items-center justify-center"><Mail size={18} className="text-primary" /></span>
            <div>
              <p className="text-xs uppercase tracking-wide text-secondary">Email</p>
              <p className="font-medium text-primary">hello@luckycouture.in</p>
            </div>
          </a>
          <div className="flex items-center gap-4 bg-white rounded-2xl shadow-card p-5">
            <span className="w-11 h-11 rounded-full bg-highlight/50 flex items-center justify-center"><MapPin size={18} className="text-primary" /></span>
            <div>
              <p className="text-xs uppercase tracking-wide text-secondary">Visit</p>
              <p className="font-medium text-primary text-sm">Muthyalareddy Nagar Main Road, Amaravathi Road, Guntur 522007</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card h-56">
            <iframe
              title="Lucky Couture location"
              className="w-full h-full border-0"
              loading="lazy"
              src="https://www.google.com/maps?q=Amaravathi+Road,Guntur,522007&output=embed"
            />
          </div>
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl shadow-card p-6 md:p-8 h-fit">
          <h3 className="font-display text-lg font-semibold text-primary mb-5">Send a message</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-ink/60 mb-1.5">Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-primary/15 focus:border-accent outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs text-ink/60 mb-1.5">Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-primary/15 focus:border-accent outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs text-ink/60 mb-1.5">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-primary/15 focus:border-accent outline-none text-sm" />
            </div>
            <button type="submit" className="flex items-center justify-center gap-2 bg-highlight text-primary font-semibold py-3 rounded-full hover:bg-accent hover:text-white transition-colors">
              <Send size={15} /> Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
