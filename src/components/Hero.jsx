import React from 'react';
import { Link } from 'react-router-dom';
export default function Hero({movie=null}){
  const poster = movie?.backdrop || movie?.posterUrl || '/assets/hero-default.jpg';
  return (
    <section className="relative w-full rounded-xl overflow-hidden poster-round" style={{ minHeight: 420, backgroundImage:`url(${poster})`, backgroundSize:'cover', backgroundPosition:'center' }}>
      <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(2,6,23,0.65), rgba(2,6,23,0.85))'}}></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-700 text-amber-100 text-sm mb-4">Featured</div>
            <h1 className="title-display text-5xl md:text-6xl font-bold tracking-tight uppercase">{movie?.title || 'Feature Title'}</h1>
            <p className="text-cv-muted mt-6 max-w-2xl">{movie?.overview || 'Movie synopsis goes here.'}</p>
            <div className="mt-8 flex items-center gap-3">
              <Link to={movie?`/movies/${movie.id}`:'#'} className="px-5 py-3 rounded-full bg-amber-400 text-slate-900 font-semibold flex items-center gap-3">▶ Watch Trailer</Link>
              <button className="px-4 py-3 rounded-full glass border border-white/5">+ Add to List</button>
            </div>
          </div>
          <div className="md:w-80 hidden md:block">
            <div className="glass p-4 rounded-xl">
              <div className="text-sm text-cv-muted">Featured Pick</div>
              <div className="font-semibold mt-2">Why this film</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
