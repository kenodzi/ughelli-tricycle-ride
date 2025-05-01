
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About KeKeRide</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-gray-700 mb-8">
              KeKeRide is revolutionizing tricycle transportation in Ughelli, Delta State, making it safer, more reliable, and more convenient for everyone.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to improve the way people move around Ughelli by providing a modern, technology-driven tricycle service that prioritizes safety, reliability, and customer satisfaction.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Why KeKeRide?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3">Safety First</h3>
                <p>
                  All our drivers undergo thorough background checks and training. Our tracking technology ensures every ride is monitored for your safety.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3">Reliable Service</h3>
                <p>
                  No more waiting on the roadside. Book a keke with our app and track its arrival in real-time.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3">Fair Pricing</h3>
                <p>
                  Our transparent pricing means no haggling and no surprises. Know exactly what you'll pay before you book.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3">Supporting Local Economy</h3>
                <p>
                  We're creating opportunities for keke drivers to earn more through our platform while providing better service.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
            <p>
              KeKeRide was founded in 2023 by a team of tech enthusiasts and transportation experts who saw the potential to transform the traditional tricycle transportation system in Ughelli. What started as a small pilot with just 10 keke drivers has now grown into the city's leading tricycle booking platform.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">How We Work</h2>
            <p>
              Our platform connects passengers with verified keke drivers through our mobile app. Passengers can book rides, track their journey, and pay securely. Drivers receive trip requests, navigate efficiently using our map integration, and earn a fair income.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Join Us</h2>
            <p className="mb-6">
              Whether you're looking for a reliable ride or want to become a driver on our platform, KeKeRide welcomes you to be part of our growing community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a href="/book" className="bg-keke-primary text-white px-6 py-3 rounded-md text-center font-medium hover:bg-keke-primary/90 transition">
                Book a Ride
              </a>
              <a href="/signup" className="border border-keke-dark text-keke-dark px-6 py-3 rounded-md text-center font-medium hover:bg-gray-50 transition">
                Become a Driver
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
