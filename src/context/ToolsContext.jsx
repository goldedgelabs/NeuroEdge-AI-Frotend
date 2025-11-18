import React, { createContext, useState } from "react";

export const ToolsContext = createContext();

export const ToolsProvider = ({ children }) => {
  const [lastResult, setLastResult] = useState(null);
  const [activeTool, setActiveTool] = useState(null);

  const openTool = (name) => setActiveTool(name);
  const closeTool = () => setActiveTool(null);

  return (
    <ToolsContext.Provider
      value={{
        lastResult,
        setLastResult,
        activeTool,
        openTool,
        closeTool,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
};
