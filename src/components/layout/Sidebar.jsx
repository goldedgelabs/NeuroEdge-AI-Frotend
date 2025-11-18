// src/components/layout/Sidebar.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UIContext } from "../../context/UIContext";
import "../../styles/sidebar.css";

export default function Sidebar() {
  const { sidebarOpen } = useContext(UIContext);

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <img src="/assets/neuroedge-logo.png" className="sidebar-logo" alt="" />
        <h1 className="sidebar-title">NeuroEdge</h1>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-title">Chat</p>
        <NavLink to="/app" className="sidebar-link">
          🧠 Main Chat
        </NavLink>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-title">Tools</p>
        <NavLink to="/history" className="sidebar-link">
          📜 History
        </NavLink>

        <NavLink to="/settings" className="sidebar-link">
          ⚙️ Settings
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <p>© GoldEdge AI</p>
      </div>
    </div>
  );
}
