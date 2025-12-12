import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
export default function Register(){
  const { register } = useContext(AuthContext);
  const nav = useNavigate();
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  async function submit(e){ e.preventDefault(); try{ await register({ name, email, password }); nav('/'); } catch(err){ alert(err.response?.data?.message || err.message); } }
  return (
    <div className="max-w-md mx-auto mt-12 glass p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="input w-full" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="flex gap-3"><button className="px-4 py-2 rounded-full bg-yellow-400 text-slate-900">Sign up</button></div>
      </form>
    </div>
  );
}
