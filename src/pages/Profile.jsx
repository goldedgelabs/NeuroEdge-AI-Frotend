import React, { useContext } from "react";
import { AgentContext } from "../context/AgentContext";
import "../styles/profile.css";

export default function Profile() {
  const { currentAgent } = useContext(AgentContext);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src="/assets/profile-default.png" className="profile-avatar" />

        <h2 className="profile-name">User</h2>
        <p className="profile-plan">Premium • GoldEdge Access</p>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Active Agent</h3>
        <div className="profile-box">
          <span className="agent-name">{currentAgent?.name}</span>
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Settings</h3>

        <div className="profile-box">Theme: Dark</div>
        <div className="profile-box">Notifications: Enabled</div>
        <div className="profile-box">Beta Features: Enabled</div>
      </div>
    </div>
  );
}
