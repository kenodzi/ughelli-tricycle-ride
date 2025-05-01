
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { getSafeAreaInsets, isMobileDevice } from '@/utils/platform';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [safeAreaTop, setSafeAreaTop] = useState('0px');
  const isMobile = isMobileDevice();

  useEffect(() => {
    const insets = getSafeAreaInsets();
    setSafeAreaTop(insets.top);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 ${isHome ? 'bg-transparent text-white' : 'bg-white text-keke-dark shadow-sm'}`}
      style={{ paddingTop: safeAreaTop }}
    >
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
          
          <Collapsible 
            open={isMenuOpen} 
            onOpenChange={setIsMenuOpen}
            className="md:hidden"
          >
            <CollapsibleTrigger asChild>
              <button className="text-2xl p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4 animate-accordion-down">
              <Link 
                to="/rides" 
                className="font-medium hover:text-keke-primary transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Rides
              </Link>
              <Link 
                to="/about" 
                className="font-medium hover:text-keke-primary transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="outline" className="font-medium w-full">Login</Button>
              </Link>
              <Link 
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="font-medium bg-keke-primary hover:bg-keke-primary/90 w-full">Sign Up</Button>
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </header>
  );
};

export default Header;
