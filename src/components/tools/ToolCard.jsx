import React from "react";

export default function ToolCard({ tool, onClick }) {
  return (
    <div className="tool-card" onClick={onClick}>
      <div className="tool-icon">{tool.icon}</div>

      <div className="tool-info">
        <h4 className="tool-name">{tool.name}</h4>
        <p className="tool-desc">{tool.description}</p>
      </div>

      <div className="tool-open">→</div>
    </div>
  );
}
