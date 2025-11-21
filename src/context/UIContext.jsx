import { createContext, useContext, useState } from "react";

const UIContext = createContext();
export const useUI = () => useContext(UIContext);

export function UIProvider({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [draftPrompt, setDraftPrompt] = useState("");

  return (
    <UIContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        showSplash,
        setShowSplash,
        draftPrompt,
        setDraftPrompt,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
