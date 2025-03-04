import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BedDouble, Bath, Square, MapPin, Heart } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  isFavorite: boolean;
}

const FeaturedListings = () => {
  const navigate = useNavigate();
  const [properties] = useState<Property[]>([
    {
      id: '1',
      title: 'Modern Luxury Villa',
      price: 850000,
      location: 'Beverly Hills, CA',
      bedrooms: 5,
      bathrooms: 4,
      area: 3500,
      image: '/images/property-1.jpg',
      isFavorite: false
    },
    {
      id: '2',
      title: 'Cozy Downtown Apartment',
      price: 450000,
      location: 'Manhattan, NY',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: '/images/property-2.jpg',
      isFavorite: false
    },
    {
      id: '3',
      title: 'Beachfront Condo',
      price: 650000,
      location: 'Miami Beach, FL',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      image: '/images/property-3.jpg',
      isFavorite: false
    },
    {
      id: '4',
      title: 'Mountain View Estate',
      price: 1200000,
      location: 'Denver, CO',
      bedrooms: 6,
      bathrooms: 5,
      area: 4500,
      image: '/images/property-4.jpg',
      isFavorite: false
    }
  ]);

  const toggleFavorite = (id: string) => {
    // In a real app, this would update the backend
    console.log('Toggle favorite:', id);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties that offer the perfect blend of luxury, comfort, and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  aria-label={`${property.isFavorite ? 'Remove from' : 'Add to'} favorites`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      property.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {property.title}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  ${property.price.toLocaleString()}
                </p>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center">
                    <BedDouble className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.bathrooms} baths</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.area} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/properties')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
