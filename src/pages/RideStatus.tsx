
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Map from '@/components/Map';
import Header from '@/components/Header';

const RideStatus = () => {
  const [status, setStatus] = useState('matching');
  const [driverLocation, setDriverLocation] = useState<[number, number]>([5.5057, 5.9631]);
  const [timer, setTimer] = useState(0);

  // Simulate ride progress
  useEffect(() => {
    if (status === 'matching') {
      const timeout = setTimeout(() => {
        setStatus('driver_assigned');
      }, 5000);
      return () => clearTimeout(timeout);
    }
    
    if (status === 'driver_assigned') {
      const timeout = setTimeout(() => {
        setStatus('arriving');
      }, 5000);
      return () => clearTimeout(timeout);
    }

    if (status === 'arriving') {
      const timeout = setTimeout(() => {
        setStatus('pickup');
      }, 7000);
      return () => clearTimeout(timeout);
    }

    if (status === 'pickup') {
      const timeout = setTimeout(() => {
        setStatus('in_progress');
      }, 5000);
      return () => clearTimeout(timeout);
    }

    if (status === 'in_progress') {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Simulate driver movement
  useEffect(() => {
    if (status === 'in_progress' || status === 'arriving') {
      const interval = setInterval(() => {
        setDriverLocation(prev => [
          prev[0] + (Math.random() * 0.001 - 0.0005),
          prev[1] + (Math.random() * 0.001 - 0.0005),
        ]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Format timer as minutes:seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Helper function to get status details
  const getStatusDetails = () => {
    switch (status) {
      case 'matching':
        return {
          title: 'Finding your driver',
          description: 'We are matching you with the nearest available keke driver.',
          icon: '🔍',
        };
      case 'driver_assigned':
        return {
          title: 'Driver Assigned',
          description: 'Koffi is your driver and is heading your way.',
          icon: '🛺',
        };
      case 'arriving':
        return {
          title: 'Driver is arriving',
          description: 'Your driver is almost at your pickup location.',
          icon: '🛺',
        };
      case 'pickup':
        return {
          title: 'Driver has arrived',
          description: 'Your driver is waiting at the pickup location.',
          icon: '📍',
        };
      case 'in_progress':
        return {
          title: 'Ride in Progress',
          description: 'Enjoy your ride to the destination.',
          icon: '🚦',
        };
      default:
        return {
          title: 'Finding your driver',
          description: 'Please wait while we connect you with a driver.',
          icon: '🔍',
        };
    }
  };

  const statusDetails = getStatusDetails();

  const handleCancelRide = () => {
    if (window.confirm('Are you sure you want to cancel this ride?')) {
      // In a real app, this would call the backend to cancel the ride
      window.location.href = '/book';
    }
  };

  const handleCompleteRide = () => {
    // In a real app, this would call the backend to complete the ride
    window.location.href = '/ride-completed';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Ride</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="overflow-hidden">
                <div className="h-[400px]">
                  <Map 
                    pickupLocation={[5.5057, 5.9631]} 
                    dropoffLocation={[5.5157, 5.9731]}
                    showDrivers={true}
                  />
                </div>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-keke-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <span className="text-2xl">{statusDetails.icon}</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-xl">{statusDetails.title}</h2>
                      <p className="text-gray-600">{statusDetails.description}</p>
                    </div>
                  </div>
                  
                  {status === 'in_progress' && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Ride time</span>
                        <span className="font-medium">{formatTime(timer)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-keke-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-10 text-center">
                        <div className="h-4 w-4 rounded-full bg-keke-primary mx-auto"></div>
                      </div>
                      <div className="flex-grow ml-2 p-3 bg-gray-50 rounded-md">
                        <p className="font-medium">12 Market Road, Ughelli</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 text-center flex flex-col items-center">
                        <div className="h-10 w-px bg-gray-300"></div>
                        <div className="h-4 w-4 rounded-full bg-gray-400 mt-1"></div>
                      </div>
                      <div className="flex-grow ml-2 p-3 bg-gray-50 rounded-md">
                        <p className="font-medium">24 Orogun Road, Ughelli</p>
                      </div>
                    </div>
                  </div>
                  
                  {status !== 'in_progress' ? (
                    <Button 
                      onClick={handleCancelRide}
                      variant="outline" 
                      className="w-full border-red-500 text-red-500 hover:bg-red-50"
                    >
                      Cancel Ride
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleCompleteRide}
                      className="w-full bg-keke-primary hover:bg-keke-primary/90"
                    >
                      Complete Ride
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Driver Information</h3>
                  
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-lg">Koffi Adebayo</h4>
                      <div className="flex items-center">
                        {'★★★★☆'.split('').map((star, i) => (
                          <span key={i} className="text-keke-accent text-sm">
                            {star}
                          </span>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">4.8</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-b py-4 my-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">Keke ID</span>
                      <span className="font-medium">UGH-234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Model</span>
                      <span className="font-medium">TVS King Deluxe</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between gap-2">
                    <Button className="flex-1 bg-keke-primary hover:bg-keke-primary/90">
                      Call Driver
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Ride Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ride type</span>
                      <span className="font-medium">Standard</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment</span>
                      <span className="font-medium">Cash</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total fare</span>
                      <span className="font-medium">₦500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideStatus;
