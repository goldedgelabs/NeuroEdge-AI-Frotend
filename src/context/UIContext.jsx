import React, { createContext, useState } from "react";

export const UIContext = createContext();

export default function UIProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reasoningOpen, setReasoningOpen] = useState(false);
  const [activeTool, setActiveTool] = useState(null);

  const value = {
    sidebarOpen,
    setSidebarOpen,
    reasoningOpen,
    setReasoningOpen,
    activeTool,
    setActiveTool,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
