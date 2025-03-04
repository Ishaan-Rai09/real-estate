
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchData = {
  query?: string;
  location?: string;
  type?: string;
  priceRange?: string;
};

type SearchContextType = {
  searchData: SearchData;
  setSearchData: (data: SearchData) => void;
  performSearch: (data: SearchData) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchData, setSearchData] = useState<SearchData>({});
  const navigate = useNavigate();

  const performSearch = (data: SearchData) => {
    setSearchData(data);
    
    // Build query string
    const params = new URLSearchParams();
    if (data.query) params.append('query', data.query);
    if (data.location) params.append('location', data.location);
    if (data.type) params.append('type', data.type);
    if (data.priceRange) params.append('price', data.priceRange);
    
    // Navigate to properties page with search parameters
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <SearchContext.Provider value={{ searchData, setSearchData, performSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
