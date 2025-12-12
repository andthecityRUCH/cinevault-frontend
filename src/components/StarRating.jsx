import React from 'react';
export default function StarRating({value=0,onChange}){
  const stars=[1,2,3,4,5];
  return <div className="flex items-center gap-2">{stars.map(n=>(
    <button key={n} onClick={()=>onChange && onChange(n)} className={`w-8 h-8 rounded-md flex items-center justify-center ${n<=value?'bg-yellow-400 text-slate-900':'bg-transparent border border-white/5'}`}>{'★'}</button>
  ))}</div>;
}
