import React, { useContext } from "react";
import { AgentContext } from "../context/AgentContext";
import "./pages.css";

export default function Home() {
  const { agents, currentAgent, setAgent } = useContext(AgentContext);

  return (
    <div className="page home">
      <h1 className="page-title">Welcome to <span className="gold">NeuroEdge</span></h1>

      <p className="subtitle">Choose your AI Expert</p>

      <div className="agent-grid">
        {agents.map((a) => (
          <button
            key={a.id}
            className={`agent-card ${currentAgent.id === a.id ? "active" : ""}`}
            onClick={() => setAgent(a.id)}
          >
            <h3>{a.name}</h3>
            <p>{a.description}</p>
          </button>
        ))}
      </div>

      <p className="hint">
        Start chatting anytime from the left sidebar.
      </p>
    </div>
  );
}
