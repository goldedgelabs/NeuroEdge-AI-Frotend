import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import Composer from "./Composer";
import "./Chat.css";

export default function ChatWindow({ messages, onSend, isTyping }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={endRef} />
      </div>

      <Composer onSend={onSend} />
    </div>
  );
}
