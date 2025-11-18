import React from "react";

export default function AgentCard({ agent, onSelect, active }) {
  return (
    <div className={`agent-card ${active ? "active" : ""}`}>
      <div className="agent-card-header">
        <div className="agent-name">{agent.name}</div>
        {active && <div className="agent-active">Active</div>}
      </div>
      <div className="agent-desc">{agent.description}</div>
      <div className="agent-actions">
        <button onClick={() => onSelect(agent.id)} className="agent-use-btn">
          Use
        </button>
      </div>
    </div>
  );
}
