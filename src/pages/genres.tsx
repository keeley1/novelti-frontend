import React from 'react';
import { NavLink } from 'react-router-dom';

function Genres() {
    return (
        <>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">Genres</h1>
        <div className="flex flex-col items-center justify-center mt-8">
            <div className="book row flex flex-wrap justify-center w-full">
                <NavLink to="/genre/fiction" className="genre-button">Fiction</NavLink>
                <NavLink to="/genre/fantasy" className="genre-button">Fantasy</NavLink>
                <NavLink to="/genre/mystery" className="genre-button">Mystery</NavLink>
                <NavLink to="/genre/romance" className="genre-button">Romance</NavLink>
                <NavLink to="/genre/science fiction" className="genre-button">Sci-Fi</NavLink>
            </div>
            <div className="book row flex flex-wrap justify-center w-full">
                <NavLink to="/genre/horror" className="genre-button">Horror</NavLink>
                <NavLink to="/genre/non fiction" className="genre-button">Non-Fiction</NavLink>
                <NavLink to="/genre/thriller" className="genre-button">Thriller</NavLink>
                <NavLink to="/genre/young adult" className="genre-button">Young Adult</NavLink>
                <NavLink to="/genre/historical" className="genre-button">Historical</NavLink>
            </div>
        </div>
        </>
    );
};

export default Genres;