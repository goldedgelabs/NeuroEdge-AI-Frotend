import React, { createContext, useContext, useState } from "react";

const UIContext = createContext();
export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFloatingChat, setShowFloatingChat] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const toggleFloatingChat = () => setShowFloatingChat((v) => !v);

  const value = {
    sidebarOpen,
    toggleSidebar,
    isMobile,
    setIsMobile,
    showFloatingChat,
    toggleFloatingChat,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
