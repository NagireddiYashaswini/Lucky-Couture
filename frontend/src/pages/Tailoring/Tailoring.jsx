import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Scissors } from "lucide-react";
import { DRESS_TYPES, DAILY_STITCH_CAPACITY } from "../../utils/constants";
import { estimateDeliveryDate } from "../../utils/helpers";
import "./Tailoring.css";

const STEPS = ["Customer Info", "Dress Type", "Material", "Measurements", "Review"];

export default function Tailoring() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      dressType: "",
      material: "shop",
      bust: "",
      waist: "",
      shoulder: "",
      hip: "",
      sleeve: "",
      height: "",
      length: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const values = watch();

  // Simulated "orders already placed today" to demonstrate capacity logic.
  const pendingOrdersToday = 7;
  const deliveryDate = estimateDeliveryDate(pendingOrdersToday, DAILY_STITCH_CAPACITY);

  const stepFields = [
    ["name", "phone", "email", "address"],
    ["dressType"],
    ["material"],
    ["bust", "waist", "shoulder", "hip", "sleeve", "height", "length"],
    [],
  ];

  const goNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = () => {
    // Backend integration point: orderService.createTailoringOrder(values)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="tailoring-page">
        <section className="page-banner">
          <span className="section-eyebrow">Tailoring</span>
          <h1>Booking Confirmed</h1>
        </section>
        <section className="section">
          <div className="container tailoring__success">
            <div className="tailoring__success-icon">
              <Check size={34} />
            </div>
            <h2>Thank you, {values.name.split(" ")[0] || "there"}!</h2>
            <p>
              Your {values.dressType.toLowerCase()} order has been received. Our team will
              call you at {values.phone} to confirm details.
            </p>
            <div className="tailoring__delivery-card">
              <Scissors size={22} />
              <div>
                <span>Expected Delivery Date</span>
                <strong>{deliveryDate}</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="tailoring-page">
      <section className="page-banner">
        <span className="section-eyebrow">Tailoring</span>
        <h1>Book Your Custom Tailoring</h1>
        <p>Five simple steps to your perfectly stitched outfit.</p>
      </section>

      <section className="section tailoring__body">
        <div className="container tailoring__container">
          <div className="tailoring__stepper">
            {STEPS.map((label, idx) => (
              <div key={label} className={`tailoring__step-node ${idx <= step ? "is-active" : ""}`}>
                <span>{idx < step ? <Check size={14} /> : idx + 1}</span>
                <p>{label}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="tailoring__form">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && (
                  <div className="tailoring__grid">
                    <div className="field">
                      <label>Full Name</label>
                      <input {...register("name", { required: "Name is required" })} placeholder="Enter your name" />
                      {errors.name && <span className="field__error">{errors.name.message}</span>}
                    </div>
                    <div className="field">
                      <label>Phone Number</label>
                      <input
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
                        })}
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && <span className="field__error">{errors.phone.message}</span>}
                    </div>
                    <div className="field">
                      <label>Email</label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                        })}
                        placeholder="you@example.com"
                      />
                      {errors.email && <span className="field__error">{errors.email.message}</span>}
                    </div>
                    <div className="field field--full">
                      <label>Address</label>
                      <textarea
                        {...register("address", { required: "Address is required" })}
                        placeholder="House no, street, area, city, pincode"
                        rows={3}
                      />
                      {errors.address && <span className="field__error">{errors.address.message}</span>}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="tailoring__options">
                    {DRESS_TYPES.map((type) => (
                      <label key={type} className={`tailoring__option ${values.dressType === type ? "is-selected" : ""}`}>
                        <input type="radio" value={type} {...register("dressType", { required: true })} />
                        <span>{type}</span>
                      </label>
                    ))}
                    {errors.dressType && <span className="field__error">Please select a dress type</span>}
                  </div>
                )}

                {step === 2 && (
                  <div className="tailoring__options tailoring__options--wide">
                    <label className={`tailoring__option ${values.material === "own" ? "is-selected" : ""}`}>
                      <input type="radio" value="own" {...register("material", { required: true })} />
                      <span>Customer provides cloth</span>
                    </label>
                    <label className={`tailoring__option ${values.material === "shop" ? "is-selected" : ""}`}>
                      <input type="radio" value="shop" {...register("material", { required: true })} />
                      <span>Need cloth from shop</span>
                    </label>
                  </div>
                )}

                {step === 3 && (
                  <div className="tailoring__grid">
                    {[
                      ["bust", "Bust (in)"],
                      ["waist", "Waist (in)"],
                      ["shoulder", "Shoulder (in)"],
                      ["hip", "Hip (in)"],
                      ["sleeve", "Sleeve (in)"],
                      ["height", "Height (in)"],
                      ["length", "Length (in)"],
                    ].map(([key, label]) => (
                      <div className="field" key={key}>
                        <label>{label}</label>
                        <input
                          type="number"
                          step="0.1"
                          {...register(key, { required: `${label} is required` })}
                          placeholder="0.0"
                        />
                        {errors[key] && <span className="field__error">{errors[key].message}</span>}
                      </div>
                    ))}
                    <div className="field field--full">
                      <label>Custom Notes</label>
                      <textarea {...register("notes")} placeholder="Any special requests..." rows={3} />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="tailoring__review">
                    <h3>Order Review</h3>
                    <div className="tailoring__review-grid">
                      <div><span>Name</span><p>{values.name}</p></div>
                      <div><span>Phone</span><p>{values.phone}</p></div>
                      <div><span>Email</span><p>{values.email}</p></div>
                      <div><span>Dress Type</span><p>{values.dressType}</p></div>
                      <div><span>Material</span><p>{values.material === "own" ? "Customer provides cloth" : "Needs cloth from shop"}</p></div>
                      <div><span>Address</span><p>{values.address}</p></div>
                    </div>

                    <div className="tailoring__delivery-card">
                      <Scissors size={22} />
                      <div>
                        <span>Expected Delivery Date</span>
                        <strong>{deliveryDate}</strong>
                        <p className="tailoring__delivery-note">
                          My mother can stitch only {DAILY_STITCH_CAPACITY} orders per day.
                          Based on availability your expected delivery date is shown.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="tailoring__nav">
              {step > 0 && (
                <button type="button" className="btn btn-outline-dark" onClick={goBack}>
                  <ChevronLeft size={18} /> Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button type="button" className="btn btn-primary" onClick={goNext}>
                  Next <ChevronRight size={18} />
                </button>
              ) : (
                <button type="submit" className="btn btn-secondary">
                  Confirm Booking
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
