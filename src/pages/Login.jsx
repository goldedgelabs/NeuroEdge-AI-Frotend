import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      navigate("/app");
    }, 1200);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/assets/neuroedge-logo.png" className="auth-logo" />

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue</p>

        <form onSubmit={loginUser}>
          <input type="email" placeholder="Email" className="auth-input" required />
          <input type="password" placeholder="Password" className="auth-input" required />

          <button type="submit" className="auth-btn">
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <a href="#">Create one</a>
        </p>
      </div>
    </div>
  );
}
