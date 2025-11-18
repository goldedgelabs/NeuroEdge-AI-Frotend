import React from "react";

export default function ReasoningNode({ step, index }) {
  return (
    <div className="reasoning-node">
      <div className="reasoning-index">{index + 1}</div>
      <div className="reasoning-content">{step.text}</div>
      <div className="reasoning-type">{step.type}</div>
    </div>
  );
}
