import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, DollarSign, BedDouble } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/hero-bg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Find Your Dream Home
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Discover the perfect property from our extensive collection of premium real estate listings
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter location, property type, or keywords..."
                className="w-full border-none focus:outline-none text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Home className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">1000+</p>
            <p className="text-white/80">Properties</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <MapPin className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="text-white/80">Locations</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <DollarSign className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">$1M+</p>
            <p className="text-white/80">Value</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <BedDouble className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">500+</p>
            <p className="text-white/80">Happy Clients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
