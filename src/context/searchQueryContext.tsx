import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext<{ searchQuery: string; setSearchQuery: React.Dispatch<React.SetStateAction<string>> }>({ searchQuery: '', setSearchQuery: () => {} });

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};