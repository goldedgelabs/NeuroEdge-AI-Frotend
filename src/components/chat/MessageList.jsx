// src/components/chat/MessageList.jsx
import React, { useEffect, useRef } from "react";

export default function MessageList({ messages = [] }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((m) => (
        <div key={m.id} className={`message-row ${m.role}`}>
          <div className={`bubble ${m.role === "assistant" ? "bubble-assistant" : "bubble-user"}`}>
            <div className="bubble-content" dangerouslySetInnerHTML={{ __html: m.content || "" }} />
            {m.streaming && <div className="typing-dots"><span></span><span></span><span></span></div>}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
