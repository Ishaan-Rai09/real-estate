
import { useState } from 'react';
import { Heart, MapPin, Bath, BedDouble, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  category: 'Sale' | 'Rent';
}

const PropertyCard = ({
  id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
  category,
}: PropertyCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-soft hover-lift">
      {/* Image container */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            category === 'Sale' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
          }`}>
            For {category}
          </span>
        </div>
        
        <button 
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        
        <Link to={`/property/${id}`}>
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 ${
              isLoaded ? 'image-loaded' : 'image-loading'
            }`}
            onLoad={() => setIsLoaded(true)}
          />
        </Link>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium line-clamp-1 group-hover:text-primary transition-colors duration-200">
            <Link to={`/property/${id}`}>{title}</Link>
          </h3>
          <p className="text-lg font-semibold text-primary">{formatPrice(price)}</p>
        </div>
        
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{address}</span>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
          <div className="flex items-center text-gray-600">
            <BedDouble className="h-4 w-4 mr-1" />
            <span className="text-sm">{bedrooms} Beds</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{bathrooms} Baths</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Square className="h-4 w-4 mr-1" />
            <span className="text-sm">{area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
