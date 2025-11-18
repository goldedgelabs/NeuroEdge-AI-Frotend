import React, { useState } from "react";

export default function CodePanel({ onRun, onClose }) {
  const [code, setCode] = useState("");

  return (
    <div className="tool-modal-overlay" onClick={onClose}>
      <div className="tool-modal-large" onClick={(e) => e.stopPropagation()}>
        <h3 className="tool-title">💻 Code Interpreter</h3>

        <textarea
          className="tool-code-input"
          placeholder="Write Python or JavaScript code..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          className="tool-btn"
          onClick={() => {
            onRun(code);
          }}
        >
          Run Code
        </button>

        <button className="tool-cancel" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
