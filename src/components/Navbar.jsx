import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
export default function Navbar(){
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  return (
    <header className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-yellow-400 text-slate-900 font-bold flex items-center justify-center">CV</div>
          <div>
            <div className="font-semibold text-lg">Cinevault</div>
            <div className="text-cv-muted text-xs">Movie reviews</div>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6 ml-6 text-sm text-gray-200">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/profile" className="hover:underline">My List</Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          {user ? <>
            <Link to="/profile" className="text-sm glass rounded px-3 py-2">{user.name}</Link>
            <button onClick={()=>{ logout(); nav('/'); }} className="text-sm px-3 py-2 rounded bg-transparent border border-white/5">Logout</button>
          </> : <>
            <Link to="/login" className="text-sm glass rounded px-3 py-2">Login</Link>
            <Link to="/register" className="text-sm px-3 py-2 rounded bg-yellow-400 text-slate-900 font-semibold">Sign up</Link>
          </>}
        </div>
      </div>
    </header>
  );
}
