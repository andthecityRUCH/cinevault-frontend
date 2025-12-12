import React, { createContext, useEffect, useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/client';
const AuthContext = createContext();
export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mr_user')); } catch { return null; }
  });
  useEffect(()=>{ if (user) localStorage.setItem('mr_user', JSON.stringify(user)); else { localStorage.removeItem('mr_user'); localStorage.removeItem('mr_token'); } }, [user]);
  async function login(credentials){ const res = await apiLogin(credentials); localStorage.setItem('mr_token', res.token); setUser(res.user); return res; }
  async function register(credentials){ const res = await apiRegister(credentials); localStorage.setItem('mr_token', res.token); setUser(res.user); return res; }
  function logout(){ localStorage.removeItem('mr_token'); setUser(null); }
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}
export default AuthContext;
