import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../api/axios";
import Toast from "../components/Toast";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.username.trim() || form.username.length < 3) errs.username = "Min 3 characters";
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter valid email";
    if (form.password.length < 6) errs.password = "Min 6 characters";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await authAPI.signup(form);
      setToast({ message: "Account created! Please login ✅", type: "success" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const msg = err?.response?.data?.msg || "Signup failed";
      setToast({ message: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-logo">Task<span>Planet</span></div>
      <div className="auth-subtitle">Join and manage your payments</div>

      <div className="auth-card">
        <div className="auth-card-title">Create account 🚀</div>

        <div className="form-field">
          <span className="form-field-icon">👤</span>
          <input
            type="text"
            name="username"
            placeholder="Username (3-15 chars)"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        {errors.username && <div className="field-error">⚠ {errors.username}</div>}

        <div className="form-field">
          <span className="form-field-icon">📧</span>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <div className="field-error">⚠ {errors.email}</div>}

        <div className="form-field">
          <span className="form-field-icon">🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Password (6-15 chars)"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && <div className="field-error">⚠ {errors.password}</div>}

        <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ marginTop: 8 }}>
          {loading ? <span className="spinner" /> : "Create Account"}
        </button>

        <div className="auth-link-row">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Register;
