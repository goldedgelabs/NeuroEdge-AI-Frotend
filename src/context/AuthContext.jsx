import React, { createContext, useState, useEffect } from 'react';
import { getUser } from '../lib/api';
export const AuthContext = createContext();
export function AuthProvider({children}){
  const [user, setUser] = useState(null);
  useEffect(()=>{ getUser().then(u=> setUser(u)).catch(()=>{}); },[]);
  return <AuthContext.Provider value={{user,setUser}}>{children}</AuthContext.Provider>
}
