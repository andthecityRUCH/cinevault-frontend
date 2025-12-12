import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { getMyList } from '../api/client';
import MovieCard from '../components/MovieCard';
export default function Profile(){
  const { user } = useContext(AuthContext);
  const [list,setList]=useState([]);
  useEffect(()=>{ if(!user) return; getMyList().then(res=>setList(res.movies||[])).catch(()=>{}); },[user]);
  if(!user) return <div className="mt-8 text-center">Please log in</div>;
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Hi, {user.name}</h2>
      <h3 className="text-lg font-semibold mb-2">My List</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{list.map(m=> <MovieCard key={m} movie={{ id: m, title: 'Saved movie' }} />)}</div>
    </div>
  );
}
