import React from "react";
import "./pages.css";

export default function PremiumUpsell() {
  return (
    <div className="page premium">
      <h1 className="gold">NeuroEdge Premium</h1>
      <p className="subtitle">Unlock advanced reasoning, unlimited tools, and priority performance.</p>

      <div className="premium-box">
        <ul>
          <li>🧠 Advanced Agent Chains</li>
          <li>⚡ Faster responses</li>
          <li>📂 File tools & analysis</li>
          <li>🔍 Multi-agent reasoning visualizer</li>
          <li>🌐 Enhanced Web Search</li>
        </ul>

        <button className="upgrade-btn">Upgrade Now</button>
      </div>
    </div>
  );
}
