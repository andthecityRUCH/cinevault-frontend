import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-6 pb-20">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/movies/:id' element={<Movie/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </main>
    </div>
  );
}
