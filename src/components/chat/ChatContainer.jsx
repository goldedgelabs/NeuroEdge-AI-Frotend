// src/components/chat/ChatContainer.jsx
import React, { useCallback, useState } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

/**
 * ChatContainer keeps messages state and wires the streaming callbacks from ChatInput.
 * Messages structure:
 *  { id, role: 'user'|'assistant', content: 'final text', streaming: boolean }
 */
export default function ChatContainer() {
  const [messages, setMessages] = useState([]);

  const addUserMessage = (text) => {
    const msg = { id: `user-${Date.now()}`, role: "user", content: text };
    setMessages((m) => [...m, msg]);
  };

  const handleStartAssistantStream = useCallback((messageId) => {
    // create streaming assistant message
    setMessages((m) => [...m, { id: messageId, role: "assistant", content: "", streaming: true }]);
  }, []);

  const handleAppendAssistantToken = useCallback((messageId, token) => {
    setMessages((m) =>
      m.map((msg) => (msg.id === messageId ? { ...msg, content: msg.content + token } : msg))
    );
  }, []);

  const handleFinishAssistantStream = useCallback((messageId) => {
    setMessages((m) => m.map((msg) => (msg.id === messageId ? { ...msg, streaming: false } : msg)));
  }, []);

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <ChatInput
        onSendText={(t) => {
          addUserMessage(t);
        }}
        onStartAssistantStream={(id) => handleStartAssistantStream(id)}
        onAppendAssistantToken={(id, token) => handleAppendAssistantToken(id, token)}
        onFinishAssistantStream={(id) => handleFinishAssistantStream(id)}
      />
    </div>
  );
                     }
