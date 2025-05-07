import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const Home = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-keke-dark z-0 overflow-hidden">
          {/* Background pattern/image would go here */}
          <div className="absolute inset-0 bg-gradient-to-b from-keke-dark/90 to-keke-dark/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Fast & reliable tricycle rides in Ughelli
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Get around town safely and comfortably with verified keke riders. Track your ride in real-time and enjoy convenient transportation.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/book">
                <Button className="text-lg font-semibold h-14 px-8 bg-keke-primary hover:bg-keke-primary/90 w-full sm:w-auto">
                  Book a Ride
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="text-lg font-semibold h-14 px-8 border-white hover:bg-white/10 w-full sm:w-auto text-keke-dark">
                  Become a Rider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-keke-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Request a Ride</h3>
              <p className="text-gray-600">
                Enter your destination, choose your keke option, and request a ride.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-keke-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛺</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Match with a Driver</h3>
              <p className="text-gray-600">
                We'll connect you with a nearby verified keke driver who'll pick you up.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-keke-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Enjoy Your Ride</h3>
              <p className="text-gray-600">
                Track your journey in real-time and rate your experience after arrival.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose KeKeRide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-3 flex items-center">
                <span className="bg-keke-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">🔍</span>
                </span>
                Real-time Tracking
              </h3>
              <p className="text-gray-600 ml-13">
                Monitor your ride's location in real-time and share your trip status with friends and family for added security.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-3 flex items-center">
                <span className="bg-keke-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">🔒</span>
                </span>
                Verified Drivers
              </h3>
              <p className="text-gray-600">
                All our keke drivers undergo thorough verification and training to ensure your safety and comfort.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-3 flex items-center">
                <span className="bg-keke-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">💰</span>
                </span>
                Transparent Pricing
              </h3>
              <p className="text-gray-600">
                Know exactly what you'll pay before confirming your ride—no hidden charges or surge pricing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-3 flex items-center">
                <span className="bg-keke-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">⭐</span>
                </span>
                Rated Experiences
              </h3>
              <p className="text-gray-600">
                Rate your rides and drivers to help maintain our high service standards and reward excellent service.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/book">
              <Button className="text-lg font-semibold h-14 px-8 bg-keke-primary hover:bg-keke-primary/90">
                Book Your First Ride
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Efe Johnson</h4>
                  <div className="flex">
                    {'★★★★★'.split('').map((star, i) => <span key={i} className="text-keke-accent text-sm">
                        {star}
                      </span>)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "KeKeRide has made getting around Ughelli so much easier! The tracking feature gives me peace of mind."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Blessing Okonkwo</h4>
                  <div className="flex">
                    {'★★★★★'.split('').map((star, i) => <span key={i} className="text-keke-accent text-sm">
                        {star}
                      </span>)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The drivers are always professional and the keke tricycles are well-maintained. Great service!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Tunde Adegoke</h4>
                  <div className="flex">
                    {'★★★★★'.split('').map((star, i) => <span key={i} className="text-keke-accent text-sm">
                        {star}
                      </span>)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I use KeKeRide daily for my commute to work. Reliable, affordable, and always on time."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default Home;