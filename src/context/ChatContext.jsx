import React, { createContext, useState, useMemo } from "react";
import { makeId } from "../utils/id";

export const ChatContext = createContext();

const starter = [
  {
    id: "welcome",
    title: "Welcome to NeuroEdge",
    messages: [
      { id: makeId("m"), role: "assistant", content: "Hello — welcome to NeuroEdge. Ask me anything." },
    ],
    active: true,
    premium: true,
  },
];

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState(starter);

  const startNewConversation = (title = "New conversation") => {
    const id = makeId("c");
    const conv = { id, title, messages: [], active: true, premium: false };
    setConversations((prev) => [conv, ...prev.map((c) => ({ ...c, active: false }))]);
    return id;
  };

  const setActiveConversation = (id) => {
    setConversations((prev) => prev.map((c) => ({ ...c, active: c.id === id })));
  };

  const addMessageTo = (convId, message) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, messages: [...c.messages, message] } : c))
    );
  };

  const activeConversation = useMemo(() => conversations.find((c) => c.active) || conversations[0], [conversations]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        startNewConversation,
        setActiveConversation,
        addMessageTo,
        activeConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
