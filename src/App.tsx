import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import MyBooks from './pages/myBooks';
import Challenges from './pages/challenges';
import GenreBooks from './pages/booksByGenre';
import BookDetails from './pages/bookDetails';
import BookSearchResults from './pages/bookSearchResults';
import { SearchProvider } from './context/searchQueryContext';

function App() {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <main className="mx-4 my-6 md:mx-8 lg:mx-16">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mybooks" element={<MyBooks />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/genre/:genre" element={<GenreBooks />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="searchbooks/:searchQuery" element={<BookSearchResults />} />
        </Routes>
        </main>
      </div>
    </SearchProvider>
  );
};

export default App;

