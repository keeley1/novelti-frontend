import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Books from './pages/books';
import FantasyBooks from './pages/fantasyBooks';

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="mx-4 my-6 md:mx-8 lg:mx-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/fantasy" element={<FantasyBooks />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

