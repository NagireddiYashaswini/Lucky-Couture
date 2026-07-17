import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    signup(data);
    navigate("/profile", { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-page__panel">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=80"
          alt="Lucky Couture fabrics"
        />
        <div className="auth-page__panel-overlay">
          <h2>Join the Lucky Couture family</h2>
          <p>Create an account to book tailoring appointments and shop with ease.</p>
        </div>
      </div>

      <div className="auth-page__form-wrap">
        <div className="auth-page__form-card">
          <h1>Create Account</h1>
          <p className="auth-page__sub">A few details and you're all set.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label>Name</label>
              <div className="field__with-icon">
                <User size={17} />
                <input placeholder="Your full name" {...register("name", { required: "Name is required" })} />
              </div>
              {errors.name && <span className="field__error">{errors.name.message}</span>}
            </div>

            <div className="field">
              <label>Phone</label>
              <div className="field__with-icon">
                <Phone size={17} />
                <input
                  placeholder="10-digit mobile number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
                  })}
                />
              </div>
              {errors.phone && <span className="field__error">{errors.phone.message}</span>}
            </div>

            <div className="field">
              <label>Email</label>
              <div className="field__with-icon">
                <Mail size={17} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && <span className="field__error">{errors.email.message}</span>}
            </div>

            <div className="field">
              <label>Password</label>
              <div className="field__with-icon">
                <Lock size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                />
                <button type="button" className="field__toggle" onClick={() => setShowPassword((s) => !s)}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <span className="field__error">{errors.password.message}</span>}
            </div>

            <div className="field">
              <label>Confirm Password</label>
              <div className="field__with-icon">
                <Lock size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && <span className="field__error">{errors.confirmPassword.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-block">Create Account</button>

            <p className="auth-page__footer">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
