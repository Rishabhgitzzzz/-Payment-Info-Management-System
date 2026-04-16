import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter valid email";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await authAPI.login(form);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.msg || "Login failed";
      setToast({ message: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-logo">Task<span>Planet</span></div>
      <div className="auth-subtitle">Manage your payment methods securely</div>

      <div className="auth-card">
        <div className="auth-card-title">Welcome back 👋</div>

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
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && <div className="field-error">⚠ {errors.password}</div>}

        <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ marginTop: 8 }}>
          {loading ? <span className="spinner" /> : "Login"}
        </button>

        <div className="auth-link-row">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Login;
