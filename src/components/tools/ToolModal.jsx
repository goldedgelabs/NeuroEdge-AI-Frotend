import React from "react";

export default function ToolModal({ tool, onClose }) {
  return (
    <div className="tool-modal-overlay" onClick={onClose}>
      <div className="tool-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tool-modal-close" onClick={onClose}>
          ✖
        </button>

        <h2 className="tool-modal-title">
          {tool.icon} {tool.name}
        </h2>

        <p className="tool-modal-desc">
          {tool.description}
        </p>

        {/* Placeholder UI since backend not connected */}
        <div className="tool-modal-content">
          <div className="tool-placeholder">
            <h3>Tool Coming Soon</h3>
            <p>
              This is a frontend placeholder. GoldEdge AI Engine will power it when
              backend is ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
