import React from "react";
import "../styles/global.css";

export default function Settings() {
  return (
    <div className="settings page">
      <h1 className="page-title">Settings</h1>

      <div className="card">
        <h3>Theme</h3>
        <button className="btn-gold" style={{ marginTop: "10px" }}>
          Toggle Dark Mode
        </button>
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Account</h3>
        <p className="text-dim">Manage your profile and subscription.</p>
        <button className="btn-outline" style={{ marginTop: "12px" }}>
          Edit Profile
        </button>
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Language</h3>
        <select className="input">
          <option>English</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
      </div>
    </div>
  );
}
