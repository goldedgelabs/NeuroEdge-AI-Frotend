import React, { createContext, useState, useEffect } from 'react';
export const SubscriptionContext = createContext();
export function SubscriptionProvider({children}){
  const [plan, setPlan] = useState(localStorage.getItem('neuroedge_plan') || 'free');
  useEffect(()=> localStorage.setItem('neuroedge_plan', plan), [plan]);
  return <SubscriptionContext.Provider value={{plan,setPlan}}>{children}</SubscriptionContext.Provider>
}
