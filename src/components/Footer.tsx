
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-keke-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Keke<span className="text-keke-secondary">Ride</span></h3>
            <p className="text-gray-300 mb-4">
              The most reliable tricycle service in Ughelli, Delta State.
              Get around town safely and comfortably with our verified keke riders.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-keke-secondary">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-keke-secondary">About Us</Link></li>
              <li><Link to="/rides" className="text-gray-300 hover:text-keke-secondary">My Rides</Link></li>
              <li><Link to="/signup" className="text-gray-300 hover:text-keke-secondary">Become a Rider</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300 mb-1">Ughelli, Delta State, Nigeria</p>
            <p className="text-gray-300 mb-1">info@kekeride.com</p>
            <p className="text-gray-300">+234 800 KEKE RIDE</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-keke-secondary">FB</a>
              <a href="#" className="text-gray-300 hover:text-keke-secondary">IG</a>
              <a href="#" className="text-gray-300 hover:text-keke-secondary">TW</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} KeKeRide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
