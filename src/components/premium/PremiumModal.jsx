import React from "react";

export default function PremiumModal({ open, onClose, feature }) {
  if (!open) return null;

  return (
    <div className="premium-modal-overlay" onClick={onClose}>
      <div className="premium-modal" onClick={(e) => e.stopPropagation()}>
        
        <h2 className="premium-title">Unlock Premium</h2>

        <p className="premium-sub">
          The feature <strong>{feature}</strong> is available in NeuroEdge Premium.
        </p>

        <div className="premium-tiers">
          <div className="tier-card">
            <h3>🔥 Monthly</h3>
            <p className="price">$9.99</p>
            <p>Unlock all advanced AI tools</p>
          </div>

          <div className="tier-card tier-best">
            <h3>💎 Yearly</h3>
            <p className="price">$79.99</p>
            <p className="save">Save 33%</p>
          </div>
        </div>

        <button className="premium-btn-upgrade">Upgrade Now</button>

        <button className="premium-btn-close" onClick={onClose}>
          Maybe Later
        </button>
      </div>
    </div>
  );
}
