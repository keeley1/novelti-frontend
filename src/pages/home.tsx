import React from 'react';
import '../App.css';
import Genres from '../components/genres';

function Home() {
  return (
    <>
    <div className="relative w-full h-96">
      <img
        src="https://images.squarespace-cdn.com/content/v1/6063581e3e356f4ceeed1b02/382bf485-a9e7-4614-bab0-c7f58d7ad3cb/Portico+Library+May+2023-56_small.jpg"
        alt="Grand library with books"
        className="w-full h-full object-cover opacity-30"
      />
      
      {/* Text over image */}
      <div className="home-text-over-image">
        <h1 className="font-bold text-2xl">Discover Your Next Favourite Book</h1>
        <p>Discover your next favourite book, share your thoughts, and connect with readers worldwide.</p>
      </div>
    </div>
    <h2 className="font-bold text-xl mt-8">Browse by genre</h2>
    <Genres />
    </>
  );
};

export default Home;