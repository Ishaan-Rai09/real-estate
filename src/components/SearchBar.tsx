
import { useState } from 'react';
import { Search, MapPin, DollarSign, Home } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';

interface SearchBarProps {
  onSearch?: (searchData: {
    location: string;
    type: string;
    priceRange: string;
  }) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps = {}) => {
  const [activeTab, setActiveTab] = useState('buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const { performSearch } = useSearch();
  
  const handleSearch = () => {
    const searchData = {
      location,
      type: propertyType,
      priceRange,
    };
    
    if (onSearch) {
      onSearch(searchData);
    } else {
      performSearch(searchData);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-soft overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
            activeTab === 'buy' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'
          }`}
          onClick={() => setActiveTab('buy')}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
            activeTab === 'rent' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'
          }`}
          onClick={() => setActiveTab('rent')}
        >
          Rent
        </button>
        <button
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
            activeTab === 'sell' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'
          }`}
          onClick={() => setActiveTab('sell')}
        >
          Sell
        </button>
      </div>
      
      {/* Search inputs */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          {/* Location */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Location"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          
          {/* Property Type */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Home className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="land">Land</option>
              </select>
            </div>
          </div>
          
          {/* Price Range */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="">Price Range</option>
                <option value="100k-250k">$100k - $250k</option>
                <option value="250k-500k">$250k - $500k</option>
                <option value="500k-750k">$500k - $750k</option>
                <option value="750k-1m">$750k - $1M</option>
                <option value="1m+">$1M+</option>
              </select>
            </div>
          </div>
          
          {/* Search Button */}
          <div className="flex-none">
            <button
              type="button"
              className="w-full md:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
