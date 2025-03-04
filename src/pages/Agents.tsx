
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AgentCard from '../components/AgentCard';
import { Search } from 'lucide-react';

// Sample agent data
const sampleAgents = [
  {
    id: '1',
    name: 'Emma Wilson',
    title: 'Senior Real Estate Consultant',
    experience: 8,
    phone: '(123) 456-7890',
    email: 'emma.wilson@estateconnect.com',
    description: 'Specializing in luxury properties and international investments with over 8 years of industry experience.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
    listings: 24,
    specialties: ['Luxury Homes', 'International', 'Investment Properties'],
    ratings: 4.9
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Property Sales Specialist',
    experience: 5,
    phone: '(234) 567-8901',
    email: 'michael.chen@estateconnect.com',
    description: 'Passionate about helping first-time homebuyers find their perfect property in urban neighborhoods.',
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
    listings: 18,
    specialties: ['First-Time Buyers', 'Urban Homes', 'Condominiums'],
    ratings: 4.7
  },
  {
    id: '3',
    name: 'Sophia Rodriguez',
    title: 'Luxury Estate Agent',
    experience: 12,
    phone: '(345) 678-9012',
    email: 'sophia.rodriguez@estateconnect.com',
    description: 'Award-winning agent with extensive experience in high-end residential and commercial properties.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80',
    listings: 32,
    specialties: ['Luxury Estates', 'Waterfront Properties', 'Commercial'],
    ratings: 5.0
  },
  {
    id: '4',
    name: 'James Anderson',
    title: 'Commercial Property Expert',
    experience: 15,
    phone: '(456) 789-0123',
    email: 'james.anderson@estateconnect.com',
    description: 'Specialized in commercial real estate with a focus on retail spaces and office buildings.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    listings: 41,
    specialties: ['Commercial', 'Retail Spaces', 'Office Buildings'],
    ratings: 4.8
  },
  {
    id: '5',
    name: 'Olivia Thompson',
    title: 'Residential Sales Advisor',
    experience: 7,
    phone: '(567) 890-1234',
    email: 'olivia.thompson@estateconnect.com',
    description: 'Dedicated to finding the perfect family homes with a personalized approach to client needs.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    listings: 27,
    specialties: ['Family Homes', 'Suburban Properties', 'New Developments'],
    ratings: 4.9
  },
  {
    id: '6',
    name: 'Daniel Mitchell',
    title: 'Investment Property Consultant',
    experience: 10,
    phone: '(678) 901-2345',
    email: 'daniel.mitchell@estateconnect.com',
    description: 'Expert in identifying high-yield investment opportunities in emerging markets.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    listings: 35,
    specialties: ['Investment Properties', 'Market Analysis', 'Portfolio Management'],
    ratings: 4.8
  }
];

const Agents = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAgents, setFilteredAgents] = useState(sampleAgents);

  useEffect(() => {
    if (searchTerm) {
      const filtered = sampleAgents.filter(agent => 
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredAgents(filtered);
    } else {
      setFilteredAgents(sampleAgents);
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <section className="section-container">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary/80 uppercase tracking-wider">Expert Guidance</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Meet Our Agents</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of experienced real estate professionals is dedicated to helping you find the perfect property or sell your home for the best price.
            </p>
          </div>
          
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search agents by name or specialty..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {filteredAgents.length === 0 ? (
            <div className="text-center p-10">
              <h3 className="text-xl font-medium mb-2">No agents found</h3>
              <p className="text-muted-foreground">Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAgents.map((agent) => (
                <Link key={agent.id} to={`/agent/${agent.id}`}>
                  <AgentCard {...agent} />
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Agents;
