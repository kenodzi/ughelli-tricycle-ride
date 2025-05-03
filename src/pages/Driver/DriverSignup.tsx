
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import DriverPhotoUpload from '@/components/Driver/DriverPhotoUpload';
import { useToast } from '@/components/ui/use-toast';

const DriverSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [keKeModel, setKeKeModel] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [driverPhoto, setDriverPhoto] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  const handlePhotoChange = (file: File) => {
    setDriverPhoto(file);
    setPhotoPreviewUrl(URL.createObjectURL(file));
    
    toast({
      title: "Photo uploaded",
      description: "Your photo has been uploaded successfully and will be verified.",
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!driverPhoto) {
      toast({
        title: "Photo required",
        description: "Please upload your photo for verification.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API request
    setTimeout(() => {
      console.log('Driver signup attempt', { 
        firstName, 
        lastName, 
        phone,
        email,
        plateNumber,
        keKeModel,
        password,
        driverPhoto: driverPhoto?.name
      });
      // In a real app, we would register with a backend
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
            <h1 className="text-3xl font-bold">Driver Registration</h1>
            <p className="text-gray-600 mt-2">Sign up as a Keke driver for KeKeRide</p>
          </div>
          
          <Card>
            <form onSubmit={handleNextStep}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {step === 1 ? 'Personal Information' : 
                   step === 2 ? 'Vehicle & Account Information' : 
                   'Identity Verification'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {step === 1 ? (
                  <>
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
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email (Optional)</label>
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="keke-input"
                      />
                    </div>
                  </>
                ) : step === 2 ? (
                  <>
                    <div>
                      <label htmlFor="plateNumber" className="block text-sm font-medium mb-1">Keke Plate Number</label>
                      <Input 
                        id="plateNumber"
                        placeholder="e.g. WR-123" 
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        required
                        className="keke-input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="keKeModel" className="block text-sm font-medium mb-1">Keke Model</label>
                      <Input 
                        id="keKeModel"
                        placeholder="e.g. TVS King" 
                        value={keKeModel}
                        onChange={(e) => setKeKeModel(e.target.value)}
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
                  </>
                ) : (
                  <DriverPhotoUpload 
                    onPhotoChange={handlePhotoChange}
                    photoUrl={photoPreviewUrl}
                  />
                )}
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit" 
                  className="w-full bg-keke-primary hover:bg-keke-primary/90"
                  disabled={isSubmitting}
                >
                  {step === 1 
                    ? 'Continue' 
                    : step === 2
                    ? 'Continue'
                    : isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
                
                {step > 1 && (
                  <Button 
                    type="button"
                    variant="ghost"
                    className="mt-2"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                
                <p className="text-center text-gray-600 mt-4">
                  Already have a driver account?{' '}
                  <Link to="/driver/login" className="text-keke-primary hover:underline">
                    Log in
                  </Link>
                </p>

                <div className="mt-6 pt-6 border-t border-gray-200 w-full text-center">
                  <Link to="/signup" className="text-keke-primary hover:underline">
                    Switch to Passenger Sign Up
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

export default DriverSignup;
