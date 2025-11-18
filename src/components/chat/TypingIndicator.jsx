import React from "react";

export default function TypingIndicator() {
  return (
    <div className="typing-row">
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="typing-label">Thinking…</p>
    </div>
  );
}
