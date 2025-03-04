
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';

// Sample data for properties
const sampleProperties = [
  {
    id: '1',
    title: 'Modern Apartment with Ocean View',
    address: '123 Coastal Drive, Miami, FL',
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: 'https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Sale' as const,
  },
  {
    id: '2',
    title: 'Luxury Villa with Private Pool',
    address: '456 Palm Avenue, Los Angeles, CA',
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80',
    category: 'Sale' as const,
  },
  {
    id: '3',
    title: 'Cozy Downtown Loft',
    address: '789 Urban Street, New York, NY',
    price: 5500,
    bedrooms: 1,
    bathrooms: 1,
    area: 850,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Rent' as const,
  },
  {
    id: '4',
    title: 'Family Home with Large Backyard',
    address: '101 Suburban Lane, Seattle, WA',
    price: 750000,
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Sale' as const,
  },
  {
    id: '5',
    title: 'Penthouse Suite with City Views',
    address: '202 Skyline Drive, Chicago, IL',
    price: 8000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2500,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Rent' as const,
  },
  {
    id: '6',
    title: 'Mountain Retreat with Fireplace',
    address: '303 Alpine Road, Denver, CO',
    price: 950000,
    bedrooms: 4,
    bathrooms: 2.5,
    area: 2800,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2065&q=80',
    category: 'Sale' as const,
  },
  {
    id: '7',
    title: 'Urban Studio Apartment',
    address: '404 Downtown Blvd, San Francisco, CA',
    price: 3800,
    bedrooms: 0,
    bathrooms: 1,
    area: 650,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80',
    category: 'Rent' as const,
  },
  {
    id: '8',
    title: 'Colonial Style Family Home',
    address: '505 Heritage Lane, Boston, MA',
    price: 1120000,
    bedrooms: 5,
    bathrooms: 3,
    area: 3600,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Sale' as const,
  },
  {
    id: '9',
    title: 'Beachfront Cottage',
    address: '606 Ocean Way, Malibu, CA',
    price: 12000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Rent' as const,
  },
];

const Properties = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearch = (searchData: { location: string; type: string; priceRange: string }) => {
    let filtered = [...sampleProperties];
    
    // Filter by location
    if (searchData.location) {
      filtered = filtered.filter(property => 
        property.address.toLowerCase().includes(searchData.location.toLowerCase())
      );
    }
    
    // Filter by property type (not implemented in sample data but could be added)
    
    // Filter by price range
    if (searchData.priceRange) {
      const [min, max] = parseRange(searchData.priceRange);
      if (min && max) {
        filtered = filtered.filter(property => property.price >= min && property.price <= max);
      } else if (min) {
        filtered = filtered.filter(property => property.price >= min);
      }
    }
    
    setFilteredProperties(filtered);
  };
  
  const parseRange = (range: string): [number, number?] => {
    switch (range) {
      case '100k-250k':
        return [100000, 250000];
      case '250k-500k':
        return [250000, 500000];
      case '500k-750k':
        return [500000, 750000];
      case '750k-1m':
        return [750000, 1000000];
      case '1m+':
        return [1000000];
      default:
        return [0];
    }
  };

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProperties(sampleProperties);
    } else if (activeFilter === 'sale') {
      setFilteredProperties(sampleProperties.filter(p => p.category === 'Sale'));
    } else if (activeFilter === 'rent') {
      setFilteredProperties(sampleProperties.filter(p => p.category === 'Rent'));
    }
  }, [activeFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="section-container">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Dream Property</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our extensive collection of properties available for sale and rent.
            </p>
          </div>
          
          <div className="mb-10">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-gray-100 p-1 rounded-lg">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeFilter === 'all' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                All Properties
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeFilter === 'sale' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setActiveFilter('sale')}
              >
                For Sale
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeFilter === 'rent' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setActiveFilter('rent')}
              >
                For Rent
              </button>
            </div>
          </div>
          
          {filteredProperties.length === 0 ? (
            <div className="text-center p-10">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
