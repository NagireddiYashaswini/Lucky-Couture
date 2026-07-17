import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Scissors, Ruler, CalendarClock, ShieldCheck } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { garmentTypes, materials } from "../data/mockData";
import { useApp } from "../context/AppContext";

const steps = ["Garment", "Material", "Measurements", "Review"];

const measurementFields = ["Chest/Bust", "Waist", "Hip", "Shoulder", "Sleeve Length", "Length"];

export default function Tailoring() {
  const { state } = useLocation();
  const { notify } = useApp();
  const prefill = state?.design;

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [eta, setEta] = useState(null);
  const [form, setForm] = useState({
    garment: prefill?.title ? "" : "",
    referenceDesign: prefill?.title || "",
    material: "",
    ownFabric: "no",
    measurements: Object.fromEntries(measurementFields.map((f) => [f, ""])),
    name: "",
    phone: "",
    notes: "",
  });

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const updateMeasurement = (field, value) =>
    setForm((f) => ({ ...f, measurements: { ...f.measurements, [field]: value } }));

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate the "4 orders/day" capacity logic your Express API would run —
    // POST /api/tailoring-orders would return the real computed ETA.
    const daysAhead = 3 + Math.floor(Math.random() * 4);
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    setEta(date.toDateString());
    setSubmitted(true);
    notify("Booking request received");
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 rounded-full bg-highlight flex items-center justify-center mx-auto mb-6"
        >
          <Check size={28} className="text-primary" />
        </motion.div>
        <h1 className="font-display text-3xl font-semibold text-primary mb-3">Booking confirmed</h1>
        <p className="text-ink/65 mb-6">
          Thanks {form.name || "there"} — we've logged your {form.garment || "garment"} order.
          Since we only take four stitching slots a day, your expected delivery date is:
        </p>
        <p className="font-display text-2xl text-accent font-semibold mb-8">{eta}</p>
        <p className="text-sm text-ink/50">We'll confirm over WhatsApp/call on the number you provided.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <SectionHeading
        eyebrow="Book Tailoring"
        title="Let's get your measurements"
        subtitle="We take on just 4 stitching orders a day so every piece gets full attention — fill this in and we'll confirm your delivery date."
      />

      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-12 max-w-lg mx-auto">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                  i < step
                    ? "bg-accent border-accent text-white"
                    : i === step
                    ? "border-accent text-accent"
                    : "border-primary/15 text-primary/30"
                }`}
              >
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <span className={`text-[11px] uppercase tracking-wide ${i <= step ? "text-primary" : "text-primary/30"}`}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-[2px] flex-1 mx-2 mb-5 ${i < step ? "bg-accent" : "bg-primary/10"}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-6 md:p-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Scissors size={18} className="text-accent" />
                <h3 className="font-display text-lg font-semibold">What should we stitch?</h3>
              </div>
              <label className="block text-sm text-ink/70 mb-2">Garment type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {garmentTypes.map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => update("garment", g)}
                    className={`px-4 py-3 rounded-xl text-sm border transition-colors ${
                      form.garment === g ? "bg-primary text-bg border-primary" : "border-primary/15 hover:border-primary"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              {form.referenceDesign && (
                <p className="text-sm text-secondary bg-highlight/30 px-4 py-2.5 rounded-xl">
                  Referencing design: <strong>{form.referenceDesign}</strong>
                </p>
              )}
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-2 mb-6 text-primary">
                <ShieldCheck size={18} className="text-accent" />
                <h3 className="font-display text-lg font-semibold">Fabric details</h3>
              </div>
              <label className="block text-sm text-ink/70 mb-2">Will you provide the material?</label>
              <div className="flex gap-3 mb-6">
                {["yes", "no"].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => update("ownFabric", opt)}
                    className={`px-5 py-2.5 rounded-full text-sm border capitalize transition-colors ${
                      form.ownFabric === opt ? "bg-primary text-bg border-primary" : "border-primary/15 hover:border-primary"
                    }`}
                  >
                    {opt === "yes" ? "I'll bring my own" : "Source it for me"}
                  </button>
                ))}
              </div>
              {form.ownFabric === "no" && (
                <>
                  <label className="block text-sm text-ink/70 mb-2">Preferred material</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {materials.map((m) => (
                      <button
                        type="button"
                        key={m}
                        onClick={() => update("material", m)}
                        className={`px-3 py-2.5 rounded-xl text-sm border transition-colors ${
                          form.material === m ? "bg-primary text-bg border-primary" : "border-primary/15 hover:border-primary"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Ruler size={18} className="text-accent" />
                <h3 className="font-display text-lg font-semibold">Your measurements (inches)</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {measurementFields.map((f) => (
                  <div key={f}>
                    <label className="block text-xs text-ink/60 mb-1.5">{f}</label>
                    <input
                      type="number"
                      step="0.1"
                      value={form.measurements[f]}
                      onChange={(e) => updateMeasurement(f, e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-primary/15 focus:border-accent outline-none text-sm"
                      placeholder="0.0"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-2 mb-6 text-primary">
                <CalendarClock size={18} className="text-accent" />
                <h3 className="font-display text-lg font-semibold">Contact & review</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-ink/60 mb-1.5">Full name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-primary/15 focus:border-accent outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-ink/60 mb-1.5">Phone / WhatsApp</label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-primary/15 focus:border-accent outline-none text-sm"
                  />
                </div>
              </div>
              <label className="block text-xs text-ink/60 mb-1.5">Notes (optional)</label>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-primary/15 focus:border-accent outline-none text-sm mb-6"
              />
              <div className="bg-bg rounded-xl p-4 text-sm text-ink/70 space-y-1">
                <p><strong className="text-primary">Garment:</strong> {form.garment || "—"}</p>
                <p><strong className="text-primary">Fabric:</strong> {form.ownFabric === "yes" ? "Customer provided" : form.material || "—"}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="px-6 py-2.5 rounded-full text-sm font-medium text-primary disabled:opacity-30"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="px-7 py-2.5 rounded-full text-sm font-semibold bg-primary text-bg hover:bg-primary/90"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="px-7 py-2.5 rounded-full text-sm font-semibold bg-highlight text-primary hover:bg-accent hover:text-white transition-colors"
            >
              Submit Booking
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
