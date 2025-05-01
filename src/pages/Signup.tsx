
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';

const Signup = () => {
  const [activeTab, setActiveTab] = useState<string>('passenger');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API request
    setTimeout(() => {
      console.log('Signup attempt', { 
        firstName, 
        lastName, 
        email, 
        phone, 
        password,
        userType: activeTab 
      });
      // In a real app, we would register with a backend
      window.location.href = activeTab === 'passenger' ? '/book' : '/driver-onboarding';
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-gray-600 mt-2">Join KeKeRide for better tricycle rides in Ughelli</p>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Sign Up</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="passenger">As Passenger</TabsTrigger>
                    <TabsTrigger value="driver">As Driver</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="passenger">
                    <p className="text-sm text-gray-500 mb-4">
                      Create an account to book tricycles in Ughelli
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="driver">
                    <p className="text-sm text-gray-500 mb-4">
                      Sign up to become a verified keke driver and receive ride requests
                    </p>
                  </TabsContent>
                </Tabs>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                    <Input 
                      id="firstName"
                      placeholder="Enter your first name" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="keke-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                    <Input 
                      id="lastName"
                      placeholder="Enter your last name" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="keke-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="keke-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <Input 
                    id="phone"
                    placeholder="Enter your phone number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="keke-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="Create a password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="keke-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                  <Input 
                    id="confirmPassword"
                    type="password" 
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="keke-input"
                  />
                </div>
                
                {activeTab === 'driver' && (
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                    <p className="text-sm text-yellow-800">
                      Note: You'll need to complete additional verification steps after signing up as a driver, including vehicle registration and document verification.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit" 
                  className="w-full bg-keke-primary hover:bg-keke-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
                
                <p className="text-center text-gray-600 mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="text-keke-primary hover:underline">
                    Log in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
