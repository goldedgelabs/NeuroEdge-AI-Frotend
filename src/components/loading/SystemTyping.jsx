import React from "react";
import "./loading.css";

export default function SystemTyping() {
  return (
    <div className="system-typing">
      <div className="dot-pulse"></div>
      <span className="label">Thinking…</span>
    </div>
  );
}
