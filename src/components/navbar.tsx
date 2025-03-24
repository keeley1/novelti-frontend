import React from 'react';
import { NavLink } from 'react-router-dom';
import Searchbar from './searchbar';

function Navbar() {
  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden flex justify-between items-center p-4">
        <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </label>
            <ul tabIndex={0} className="nav-mobile-menu">
                <li><NavLink to="/">Browse</NavLink></li>
                <li><NavLink to="/mybooks">My Books</NavLink></li>
                <li><NavLink to="/challenges">Challenges</NavLink></li>
            </ul>
        </div>
        <div className="nav-mobile-menu-title">
            <NavLink to="/"><h1>novelti</h1></NavLink>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <div className="navbar border-b border-accent">
            <div className="navbar-start">
                <div className="nav-title">
                    <NavLink to="/"><h1>novelti</h1></NavLink>
                </div>
                <div className="nav-links">
                    <NavLink 
                        to="/" 
                        className="nav-button"
                    >
                        Browse
                    </NavLink>
                    <NavLink 
                        to="/mybooks" 
                        className="nav-button"
                    >
                        My Books
                    </NavLink>
                    <NavLink 
                        to="/challenges" 
                        className="nav-button"
                    >
                        Challenges
                    </NavLink>
                </div>
            </div>
            <div className="navbar-end">
                <Searchbar/>
            </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;