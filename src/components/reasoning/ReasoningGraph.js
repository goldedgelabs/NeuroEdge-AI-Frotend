import React, { useState } from "react";
import ReasoningNode from "./ReasoningNode";

export default function ReasoningGraph({ reasoning }) {
  const [expanded, setExpanded] = useState(false);

  if (!reasoning || reasoning.length === 0) {
    return null;
  }

  return (
    <div className="reasoning-graph-wrapper">
      <div className="reasoning-header" onClick={() => setExpanded(!expanded)}>
        <h3>🧠 Reasoning Process</h3>
        <span className="reasoning-toggle">
          {expanded ? "Hide ▲" : "Show ▼"}
        </span>
      </div>

      {expanded && (
        <div className="reasoning-graph">
          {reasoning.map((step, i) => (
            <div key={i} className="reasoning-grid-item">
              <ReasoningNode step={step} index={i} />

              {i < reasoning.length - 1 && (
                <div className="reasoning-connector">
                  <div className="connector-line" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
                         }
