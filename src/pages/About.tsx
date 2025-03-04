
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <section className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider">Our Story</span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">About EstateConnect</h1>
              <p className="text-muted-foreground">
                Connecting people with their dream properties since 2010.
              </p>
            </div>
            
            <div className="mb-16">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Our team" 
                className="w-full h-96 object-cover rounded-lg shadow-soft mb-8"
              />
              
              <div className="prose prose-lg max-w-none">
                <p>
                  EstateConnect was founded with a simple yet powerful vision: to transform the way people buy, sell, and rent properties. 
                  What began as a small team of passionate real estate professionals has grown into a nationwide network of agents, developers, 
                  and property specialists dedicated to providing exceptional service.
                </p>
                
                <p>
                  We believe that finding a home is more than just a transaction—it's about discovering a place where memories are made, 
                  dreams are realized, and lives unfold. Our mission is to make this journey as smooth and rewarding as possible for everyone involved.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="bg-white p-6 rounded-lg shadow-soft">
                    <h3 className="font-semibold text-lg mb-2">Integrity</h3>
                    <p>We uphold the highest standards of honesty and transparency in every interaction, ensuring our clients can make informed decisions with confidence.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-soft">
                    <h3 className="font-semibold text-lg mb-2">Excellence</h3>
                    <p>We are committed to delivering exceptional service and continuously improving our processes to exceed expectations.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-soft">
                    <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                    <p>We embrace technology and creative solutions to enhance the real estate experience for our clients and partners.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-soft">
                    <h3 className="font-semibold text-lg mb-2">Community</h3>
                    <p>We believe in the power of community and strive to make a positive impact in the neighborhoods where we operate.</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Our Approach</h2>
                
                <p>
                  At EstateConnect, we combine industry expertise with cutting-edge technology to provide a seamless real estate experience. 
                  Whether you're a first-time homebuyer, a seasoned investor, or looking for your next rental, our personalized approach ensures 
                  that your specific needs are met with care and precision.
                </p>
                
                <p>
                  Our platform is designed to simplify the complex process of property transactions, offering intuitive search tools, 
                  comprehensive property information, and direct connections to knowledgeable agents. We're constantly evolving our services 
                  to reflect market trends and client feedback, ensuring that EstateConnect remains at the forefront of the real estate industry.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
