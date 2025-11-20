import React, { createContext, useState } from 'react';
export const UIContext = createContext();
export function UIProvider({children}){
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [floatingOpen, setFloatingOpen] = useState(false);
  return <UIContext.Provider value={{sidebarOpen,setSidebarOpen,floatingOpen,setFloatingOpen}}>{children}</UIContext.Provider>
}
