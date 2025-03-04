import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Loader2, Home, Bath, BedDouble, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Property {
  _id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        // For now, we'll use a userId query parameter
        // In a real app, you'd get this from authentication
        const userId = localStorage.getItem('userId') || '123456789';
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/favorites?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        
        const data = await response.json();
        setFavorites(data.favorites || []);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load favorites. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (propertyId: string) => {
    try {
      const userId = localStorage.getItem('userId') || '123456789';
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favorites/${propertyId}?userId=${userId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }

      // Update state to remove the property
      setFavorites(favorites.filter(property => property._id !== propertyId));
    } catch (err) {
      console.error('Error removing favorite:', err);
      setError('Failed to remove from favorites. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : favorites.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-xl mb-4">You don't have any favorite properties yet.</p>
            <Button onClick={() => navigate('/properties')}>Browse Properties</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <Card key={property._id} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={property.images[0] || '/images/property-placeholder.jpg'}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeFavorite(property._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2 truncate">{property.title}</h3>
                  <p className="text-primary font-bold mb-2">${property.price.toLocaleString()}</p>
                  <p className="text-muted-foreground text-sm mb-4 truncate">{property.location}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <BedDouble className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Move className="h-4 w-4 mr-1" />
                      <span>{property.area} sqft</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/property/${property._id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites; 