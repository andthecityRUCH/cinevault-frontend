import React from 'react';
import { Link } from 'react-router-dom';
export default function MovieCard({movie}){
  const poster = movie.posterUrl || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/assets/poster-placeholder.png');
  return (
    <div className="card bg-transparent rounded-lg overflow-hidden">
      <Link to={`/movies/${movie.id || movie._id}`}>
        <div className="h-56 bg-cover bg-center poster-round" style={{backgroundImage:`url(${poster})`}} />
      </Link>
      <div className="p-3">
        <div className="font-semibold">{movie.title}</div>
        <div className="text-xs text-cv-muted mt-1">{(movie.release_date||'').slice(0,4)} • {(movie.genres||[]).slice(0,2).join(', ')}</div>
      </div>
    </div>
  );
}
