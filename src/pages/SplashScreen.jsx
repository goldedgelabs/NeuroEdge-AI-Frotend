import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/splash.css";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="splash-logo">
        <img src="/assets/neuroedge-logo.png" alt="NeuroEdge" />
      </div>

      <h2 className="splash-title">NeuroEdge</h2>
      <p className="splash-subtitle">Intelligence. Refined.</p>
    </div>
  );
}
