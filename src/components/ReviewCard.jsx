import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
export default function ReviewCard({r, onEdit, onDelete}){
  const { user } = useContext(AuthContext);
  const owner = user && (user.id === (r.user?._id || r.user));
  return (
    <div className="review glass p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{r.userName || r.user?.name}</div>
          <div className="text-xs text-cv-muted">{new Date(r.createdAt).toLocaleString()}</div>
        </div>
        <div className="text-sm font-semibold bg-yellow-400 text-slate-900 px-3 py-1 rounded-full">{r.rating}/5</div>
      </div>
      <div className="mt-3">
        <div className="font-semibold">{r.title}</div>
        <div className="text-cv-muted mt-2">{r.body}</div>
      </div>
      {owner && <div className="mt-3 flex gap-2">
        <button className="btn glass px-3 py-1" onClick={()=>onEdit(r)}>Edit</button>
        <button className="btn glass px-3 py-1" onClick={()=>onDelete(r._id)}>Delete</button>
      </div>}
    </div>
  );
}
