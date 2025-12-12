import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovie, fetchReviews, postReview, fetchSimilar, addToList } from '../api/client';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';
import AuthContext from '../context/AuthContext';

export default function Movie(){
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [movie,setMovie]=useState(null);
  const [reviews,setReviews]=useState([]);
  const [showForm,setShowForm]=useState(false);
  const [similar,setSimilar]=useState([]);

  useEffect(()=>{ fetchMovie(id).then(setMovie); fetchReviews(id).then(r=>setReviews(r||[])); fetchSimilar(id).then(setSimilar).catch(()=>{}); },[id]);

  async function saveReview(payload){
    await postReview(id,payload);
    const r = await fetchReviews(id);
    setReviews(r||[]);
    setShowForm(false);
  }
  async function addList(){ await addToList(id); alert('Added'); }

  if(!movie) return <div>Loading...</div>;
  const poster = movie.posterUrl || '';
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <div className="lg:col-span-1">
        <div className="poster-large poster-round" style={{backgroundImage:`url(${poster})`, height:520}} />
        <div className="mt-4">
          <h1 className="text-2xl title-display font-semibold">{movie.title}</h1>
          <div className="text-cv-muted mt-2">{(movie.genres||[]).join(', ')}</div>
          <div className="mt-3 flex items-center gap-3">
            <div className="px-3 py-2 rounded-full bg-yellow-400 text-slate-900 font-semibold">{(movie.vote_average||0).toFixed(1)}</div>
            <button className="glass px-3 py-2 rounded-full" onClick={addList}>+ Add to list</button>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="text-cv-muted">{movie.overview}</div>
        <div className="mt-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Reviews</h3>
          {user ? <button className="px-4 py-2 rounded-full bg-yellow-400 text-slate-900" onClick={()=>setShowForm(s=>!s)}>Write review</button> : <div className="text-cv-muted">Log in to write reviews</div>}
        </div>
        {showForm && <div className="mt-4 glass p-4 rounded-lg"><ReviewForm onSave={saveReview} /></div>}
        <div className="mt-4 space-y-4">{reviews.length===0? <div className="text-cv-muted">No reviews yet</div> : reviews.map(r=><ReviewCard key={r._id} r={r} />)}</div>
        <div className="mt-10">
          <h4 className="text-lg font-semibold">Similar</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">{similar.map(s=>(
            <div key={s.id} className="card rounded-lg overflow-hidden">
              <div className="poster h-36 bg-cover bg-center" style={{backgroundImage:`url(${s.posterUrl||''})`}} />
              <div className="p-2"><div className="font-semibold">{s.title}</div></div>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}

function ReviewForm({onSave}){
  const [title,setTitle]=React.useState(''); const [body,setBody]=React.useState(''); const [rating,setRating]=React.useState(0);
  async function submit(e){ e.preventDefault(); if(!rating){ alert('Rate it'); return;} await onSave({ title, body, rating }); setTitle(''); setBody(''); setRating(0); }
  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="input w-full" placeholder="Review title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="input w-full" placeholder="Write your review..." value={body} onChange={e=>setBody(e.target.value)} />
      <div><label className="block text-sm text-cv-muted mb-2">Rating</label><StarRating value={rating} onChange={setRating} /></div>
      <div className="flex gap-3"><button className="px-4 py-2 rounded-full bg-yellow-400 text-slate-900" type="submit">Save</button><button type="button" className="px-4 py-2 rounded-full glass" onClick={()=>{ setTitle(''); setBody(''); setRating(0); }}>Cancel</button></div>
    </form>
  );
}
