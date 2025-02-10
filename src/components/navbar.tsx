import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <div className="navbar bg-primary text-white">
        <div className="nav-title">
            <NavLink to="/"><h1>novelti</h1></NavLink>
        </div>
        <div className="nav-links">
            <NavLink 
                to="/genres" 
                className={({ isActive }) => `
                    btn btn-ghost hover:bg-base-100/20 btn-xs sm:btn-sm md:btn-md lg:btn-lg
                    ${isActive ? 'bg-base-100/20' : ''}
                `}
            >
                Genres
            </NavLink>
        </div>
    </div>
    </>
  );
};

export default Navbar;