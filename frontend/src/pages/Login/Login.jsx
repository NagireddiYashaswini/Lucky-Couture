import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data);
    const redirectTo = location.state?.from?.pathname || "/profile";
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-page__panel">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80"
          alt="Lucky Couture atelier"
        />
        <div className="auth-page__panel-overlay">
          <h2>Welcome back to Lucky Couture</h2>
          <p>Sign in to track your orders, saved measurements, and wishlist.</p>
        </div>
      </div>

      <div className="auth-page__form-wrap">
        <div className="auth-page__form-card">
          <h1>Login</h1>
          <p className="auth-page__sub">Enter your details to continue.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                />
                <button type="button" className="field__toggle" onClick={() => setShowPassword((s) => !s)}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <span className="field__error">{errors.password.message}</span>}
            </div>

            <div className="auth-page__row">
              <label className="auth-page__remember">
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/login" className="auth-page__link">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Login</button>

            <div className="auth-page__divider"><span>or</span></div>

            <button type="button" className="btn btn-outline-dark btn-block">
              Continue with Google
            </button>

            <p className="auth-page__footer">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
