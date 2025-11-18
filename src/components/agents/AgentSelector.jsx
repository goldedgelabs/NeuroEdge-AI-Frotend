import React, { useContext } from "react";
import { AgentContext } from "../../context/AgentContext";
import "./agents.css";

export default function AgentSelector() {
  const { agents, currentAgent, setAgent } = useContext(AgentContext);

  return (
    <div className="agent-selector">
      {agents.map((a) => (
        <button
          key={a.id}
          className={`agent-pill ${currentAgent?.id === a.id ? "active" : ""}`}
          onClick={() => setAgent(a.id)}
          title={a.description}
        >
          <div className="pill-name">{a.name}</div>
          <div className="pill-desc">{a.description}</div>
        </button>
      ))}
    </div>
  );
}
