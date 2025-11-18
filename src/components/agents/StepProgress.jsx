import React from "react";

export default function StepProgress({ steps = [], progress = { step: 0, total: 0 } }) {
  // steps: [{label, text, index}]
  return (
    <div className="step-progress">
      <div className="progress-line">
        {steps.map((s, i) => {
          const active = i < progress.step;
          return (
            <div key={i} className={`progress-step ${active ? "done" : ""}`}>
              <div className="dot" />
              <div className="label">{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
