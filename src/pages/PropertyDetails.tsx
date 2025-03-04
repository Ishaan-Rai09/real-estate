
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, DollarSign, BedDouble, Bath, Square, Heart, Share, Phone, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample property data - in a real app, you would fetch this from an API
const sampleProperties = [
  {
    id: '1',
    title: 'Modern Apartment with Ocean View',
    address: '123 Coastal Drive, Miami, FL',
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    description: `
      This stunning modern apartment offers breathtaking ocean views from every room. Recently renovated with high-end finishes throughout, including hardwood floors, quartz countertops, and stainless steel appliances. The open floor plan creates a spacious feeling, perfect for entertaining.

      The master bedroom features a walk-in closet and an en-suite bathroom with a rainfall shower. The second bedroom is ideal for guests or a home office. Additional amenities include in-unit laundry, central air conditioning, and a private balcony.

      Located in a premium building with 24-hour security, fitness center, swimming pool, and underground parking. Just steps away from the beach, restaurants, and shopping.
    `,
    features: [
      'Ocean View',
      'Modern Kitchen',
      'Walk-in Closet',
      'Private Balcony',
      'In-unit Laundry',
      'Central AC',
      '24-hour Security',
      'Fitness Center',
      'Swimming Pool',
      'Underground Parking'
    ],
    agent: {
      id: '1',
      name: 'Emma Wilson',
      phone: '(123) 456-7890',
      email: 'emma.wilson@estateconnect.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
    },
    images: [
      'https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1527030280862-64139fba04ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1506&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    ],
    category: 'Sale',
    yearBuilt: 2018,
    neighborhood: 'Downtown Miami',
  },
  // Add more sample properties with their ids matching the ones in the previous components
];

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundProperty = sampleProperties.find(p => p.id === id);
      setProperty(foundProperty || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4 mx-auto"></div>
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Property Not Found</h2>
            <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Link to="/properties" className="btn-primary">
              Browse Properties
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="section-container">
          {/* Property Images Gallery */}
          <div className="mb-8 relative">
            <div className="overflow-hidden rounded-lg h-[60vh]">
              <img 
                src={property.images[activeImageIndex]} 
                alt={property.title} 
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
            
            {/* Image Navigation */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200 shadow-soft"
              onClick={handlePrevImage}
            >
              <ArrowLeft className="h-5 w-5 text-gray-800" />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200 shadow-soft"
              onClick={handleNextImage}
            >
              <ArrowRight className="h-5 w-5 text-gray-800" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                    index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          </div>
          
          {/* Property Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Main Details */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    <span>{property.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-1">{formatPrice(property.price)}</div>
                  <div className="text-sm text-gray-600">{property.category === 'Rent' ? '/month' : ''}</div>
                </div>
              </div>
              
              {/* Property Features */}
              <div className="flex flex-wrap items-center justify-between bg-gray-50 p-4 rounded-lg mb-8">
                <div className="flex items-center px-4 py-2">
                  <BedDouble className="h-5 w-5 mr-2 text-gray-600" />
                  <span><strong>{property.bedrooms}</strong> {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                </div>
                <div className="flex items-center px-4 py-2">
                  <Bath className="h-5 w-5 mr-2 text-gray-600" />
                  <span><strong>{property.bathrooms}</strong> {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                </div>
                <div className="flex items-center px-4 py-2">
                  <Square className="h-5 w-5 mr-2 text-gray-600" />
                  <span><strong>{property.area}</strong> sq ft</span>
                </div>
                <div className="flex items-center px-4 py-2">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                  <span><strong>{Math.round(property.price / property.area)}</strong> per sq ft</span>
                </div>
              </div>
              
              {/* Tabs for Details */}
              <Tabs defaultValue="description">
                <TabsList className="mb-6">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="prose max-w-none">
                  <p>{property.description}</p>
                </TabsContent>
                
                <TabsContent value="features">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center py-2">
                        <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Property Type</h4>
                      <p className="mt-1">Apartment</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Year Built</h4>
                      <p className="mt-1">{property.yearBuilt}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Neighborhood</h4>
                      <p className="mt-1">{property.neighborhood}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Listing Status</h4>
                      <p className="mt-1">For {property.category}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column - Agent Info & Actions */}
            <div className="lg:col-span-1">
              {/* Buy/Rent Actions */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-soft p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Interested in this property?</h3>
                <div className="space-y-3">
                  {property.category === 'Sale' ? (
                    <>
                      <Button className="w-full btn-primary mb-3">
                        Schedule a Viewing
                      </Button>
                      <Button variant="outline" className="w-full">
                        Request More Info
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full btn-primary mb-3">
                        Apply to Rent
                      </Button>
                      <Button variant="outline" className="w-full">
                        Schedule a Viewing
                      </Button>
                    </>
                  )}
                </div>
                
                <div className="flex justify-between mt-6">
                  <button 
                    className="flex items-center text-gray-600 hover:text-primary"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-5 w-5 mr-1 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>Save</span>
                  </button>
                  
                  <button className="flex items-center text-gray-600 hover:text-primary">
                    <Share className="h-5 w-5 mr-1" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
              
              {/* Agent Information */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-soft p-6">
                <h3 className="text-lg font-semibold mb-4">Listed by</h3>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={property.agent.image} 
                    alt={property.agent.name}
                    className="h-16 w-16 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-medium">{property.agent.name}</h4>
                    <Link to={`/agent/${property.agent.id}`} className="text-sm text-primary hover:underline">
                      View Profile
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <a href={`tel:${property.agent.phone}`} className="flex items-center text-gray-700 hover:text-primary">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>{property.agent.phone}</span>
                  </a>
                  
                  <a href={`mailto:${property.agent.email}`} className="flex items-center text-gray-700 hover:text-primary">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>{property.agent.email}</span>
                  </a>
                </div>
                
                <Button variant="outline" className="w-full mt-6">
                  Contact Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
