
import React from 'react';
import { BadgeCheck, MapPin, Phone, Mail, Home } from 'lucide-react';

export interface AgentCardProps {
  id: string;
  name: string;
  title: string;
  bio?: string;
  experience: number;
  properties?: number;
  specialization?: string[];
  specialties?: string[];
  image: string;
  phone: string;
  email: string;
  description?: string;
  location?: string;
  ratings?: number;
  listings?: number;
}

const AgentCard: React.FC<AgentCardProps> = ({ 
  name, 
  title, 
  image, 
  specialties, 
  specialization,
  ratings, 
  experience, 
  properties,
  listings,
  description,
  bio
}) => {
  // Handle different data formats
  const displaySpecialties = specialties || specialization || [];
  const displayBio = bio || description || '';
  const displayProperties = properties || listings || 0;
  
  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1 duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover object-center"
        />
        {ratings && ratings >= 4.8 && (
          <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <BadgeCheck className="h-4 w-4 mr-1" />
            Top Agent
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-muted-foreground mb-3">{title}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg 
                key={i}
                className={`h-4 w-4 ${i < Math.floor(ratings || 0) ? 'fill-current' : 'stroke-current fill-none'}`}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm font-semibold text-muted-foreground">
            {ratings || 4.5}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {displayBio}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
          <div className="flex items-center">
            <Home className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm">{displayProperties} Properties</span>
          </div>
          <div className="flex items-center">
            <svg className="h-4 w-4 text-primary mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-sm">{experience} Years</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {(displaySpecialties || []).slice(0, 3).map((specialty, index) => (
              <span 
                key={index}
                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
