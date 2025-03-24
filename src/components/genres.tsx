import React from 'react';
import { NavLink } from 'react-router-dom';
import genres from '../models/genre';

function Genres() {
    return (
        <>
        <div className="flex flex-col items-center justify-center mt-8">
            <div className="book row flex flex-wrap justify-center w-full">
                <div className="flex flex-wrap justify-center">
                    {genres.map((genre, index) => (
                        <NavLink 
                            key={index} 
                            to={`/genre/${genre.name.toLowerCase()}`} 
                            className="genre-button"
                        >
                            <div className="flex flex-row items-center sm:flex-col sm:items-start">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width={20} 
                                    height={20} 
                                    fill="currentColor" 
                                    className="mr-2 sm:mb-2 sm:mr-0 text-primary" 
                                    viewBox="0 0 16 16"
                                >
                                    <path d={genre.iconPath}/>
                                </svg>
                                <span>{genre.name}</span>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default Genres;