import React, { useState } from "react";

export default function Composer({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="composer">
      <textarea
        className="composer-input"
        placeholder="Send a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
      />

      <button className="composer-send" onClick={handleSubmit}>
        ➤
      </button>
    </div>
  );
}
