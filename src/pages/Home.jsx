import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import { fetchMovies } from '../api/client';

function Home(){
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(()=>{ fetchMovies({page:1}).then(res=>setMovies(res.items||[])).catch(()=>{}); },[]);
  function loadMore(){ fetchMovies({page:page+1}).then(res=>{ setMovies(m=>[...m,...(res.items||[])]); setPage(p=>p+1); }).catch(()=>{}); }
  return (
    <div>
      <Hero movie={movies[0]} />
      <section className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Trending Now</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map(m=><MovieCard key={m.id||m._id} movie={m} />)}
        </div>
        <div className="mt-8 flex justify-center">
          <button onClick={loadMore} className="px-6 py-3 rounded-full bg-yellow-400 text-slate-900 font-semibold">Load more</button>
        </div>
      </section>
    </div>
  );
}
export default Home;
