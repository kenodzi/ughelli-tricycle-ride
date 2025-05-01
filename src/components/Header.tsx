
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isHome ? 'bg-transparent text-white' : 'bg-white text-keke-dark shadow-sm'}`}>
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl tracking-tight">Keke<span className="text-keke-secondary">Ride</span></span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/rides" className="font-medium hover:text-keke-primary transition-colors">My Rides</Link>
            <Link to="/about" className="font-medium hover:text-keke-primary transition-colors">About</Link>
            <Link to="/login">
              <Button variant="outline" className="font-medium">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="font-medium bg-keke-primary hover:bg-keke-primary/90">Sign Up</Button>
            </Link>
          </div>
          
          <button className="md:hidden text-2xl">≡</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
