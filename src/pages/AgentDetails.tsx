
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { Phone, Mail, MapPin, Award, Star } from 'lucide-react';

// Sample agent data
const sampleAgents = [
  {
    id: '1',
    name: 'Emma Wilson',
    title: 'Senior Real Estate Consultant',
    experience: 8,
    phone: '(123) 456-7890',
    email: 'emma.wilson@estateconnect.com',
    description: 'Specializing in luxury properties and international investments with over 8 years of industry experience. Emma has consistently ranked in the top 1% of agents nationwide and has helped hundreds of clients find their dream homes or make successful investment decisions. Her deep knowledge of market trends and negotiation skills ensure the best possible outcomes for her clients.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
    listings: 24,
    specialties: ['Luxury Homes', 'International', 'Investment Properties'],
    ratings: 4.9,
    reviews: 87,
    languages: ['English', 'Spanish', 'French'],
    areas: ['Miami', 'New York', 'Los Angeles'],
    achievements: ['Top 1% Nationwide', 'Diamond Club Member', 'International Property Specialist'],
    bio: 'With a background in international finance before entering real estate, Emma brings a unique perspective to property investments. She holds an MBA from Harvard Business School and is certified in luxury home marketing. When not helping clients, Emma enjoys sailing and contributing to community development projects.'
  },
  // Add more sample agents with their ids matching the ones in the AgentCard component
];

// Sample properties for the agent
const sampleAgentProperties = [
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
];

const AgentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundAgent = sampleAgents.find(a => a.id === id);
      setAgent(foundAgent || null);
      setLoading(false);
    }, 500);
  }, [id]);

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

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Agent Not Found</h2>
            <p className="text-muted-foreground mb-6">The agent you're looking for doesn't exist or has been removed.</p>
            <Link to="/agents" className="btn-primary">
              Browse Agents
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
          {/* Agent Header */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
              {/* Agent Image */}
              <div className="relative flex-shrink-0">
                <img 
                  src={agent.image}
                  alt={agent.name}
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full shadow-soft border-4 border-white"
                />
                <span className="absolute bottom-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                  {agent.experience}+ years
                </span>
              </div>
              
              {/* Agent Info */}
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{agent.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{agent.title}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-amber-500 mr-1" />
                    <span><strong>{agent.ratings}</strong> ({agent.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-1" />
                    <span><strong>{agent.listings}</strong> properties</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                  <a href={`tel:${agent.phone}`} className="btn-outline inline-flex items-center justify-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>Call Agent</span>
                  </a>
                  <a href={`mailto:${agent.email}`} className="btn-primary inline-flex items-center justify-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>Email Agent</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Agent Details and Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Agent Details */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg shadow-soft p-6 mb-8">
                <h3 className="text-lg font-semibold border-b pb-3 mb-4">About {agent.name}</h3>
                <p className="text-gray-700 mb-6">{agent.description}</p>
                
                {/* Contact Information */}
                <h4 className="font-medium mb-3">Contact Information</h4>
                <div className="space-y-3 mb-6">
                  <a href={`tel:${agent.phone}`} className="flex items-center text-gray-700 hover:text-primary">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>{agent.phone}</span>
                  </a>
                  
                  <a href={`mailto:${agent.email}`} className="flex items-center text-gray-700 hover:text-primary">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>{agent.email}</span>
                  </a>
                </div>
                
                {/* Areas Served */}
                <h4 className="font-medium mb-3">Areas Served</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.areas.map((area, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{area}</span>
                      {index < agent.areas.length - 1 && <span className="ml-2">•</span>}
                    </div>
                  ))}
                </div>
                
                {/* Specialties */}
                <h4 className="font-medium mb-3">Specialties</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.specialties.map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
                
                {/* Languages */}
                <h4 className="font-medium mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.languages.map((language, index) => (
                    <span key={index} className="text-gray-700">
                      {language}{index < agent.languages.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
                
                {/* Achievements */}
                <h4 className="font-medium mb-3">Achievements</h4>
                <div className="space-y-2">
                  {agent.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start">
                      <Award className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Agent Listings */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-semibold mb-6">Listed Properties</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleAgentProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
              
              {sampleAgentProperties.length >= 3 && (
                <div className="text-center mt-8">
                  <Link to="/properties" className="btn-outline">
                    View All {agent.name}'s Listings
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgentDetails;
