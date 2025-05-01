
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

const DriverLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log('Driver login attempt', { phone, password });
      // In a real app, we would authenticate with a backend
      window.location.href = '/driver';
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Driver Login</h1>
            <p className="text-gray-600 mt-2">Log in to your KeKeRide driver account</p>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Driver Log In</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <Input 
                    id="phone"
                    type="tel" 
                    placeholder="Enter your phone number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="keke-input"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <Link to="/driver/forgot-password" className="text-sm text-keke-primary hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="keke-input"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit" 
                  className="w-full bg-keke-primary hover:bg-keke-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Log In'}
                </Button>
                
                <p className="text-center text-gray-600 mt-4">
                  Don't have a driver account?{' '}
                  <Link to="/driver/signup" className="text-keke-primary hover:underline">
                    Sign up
                  </Link>
                </p>

                <div className="mt-6 pt-6 border-t border-gray-200 w-full text-center">
                  <Link to="/login" className="text-keke-primary hover:underline">
                    Switch to Passenger Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
