import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/searchQueryContext";

function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { setSearchQuery: setGlobalSearchQuery } = useSearch();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setGlobalSearchQuery(searchQuery);
            navigate(`/searchbooks/${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex justify-end items-center space-x-2">
            <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books..."
            className="input input-bordered"
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch(e);
                }
            }}
            />
            <button type="submit" className="{({ isActive }) => `
                    btn btn-ghost hover:bg-base-100/20 btn-xs sm:btn-sm md:btn-md lg:btn-lg
                    ${isActive ? 'bg-base-100/20' : ''}
                `}">Search</button>
        </form>
    );
};

export default Searchbar;