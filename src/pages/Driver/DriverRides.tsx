
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Map from '@/components/Map';
import Header from '@/components/Header';
import { Clock, Navigation, Phone, MessageSquare, DollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DriverRides = () => {
  const [status, setStatus] = useState('heading_to_pickup');
  const [driverLocation, setDriverLocation] = useState<[number, number]>([5.5057, 5.9631]);
  const [timer, setTimer] = useState(0);
  const { toast } = useToast();

  // Simulate ride progress
  useEffect(() => {
    if (status === 'heading_to_pickup') {
      const timeout = setTimeout(() => {
        setStatus('arrived_at_pickup');
        toast({
          title: "Arrived at Pickup",
          description: "You have arrived at the pickup location.",
        });
      }, 10000);
      return () => clearTimeout(timeout);
    }
    
    if (status === 'in_progress') {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status, toast]);

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation(prev => [
        prev[0] + (Math.random() * 0.001 - 0.0005),
        prev[1] + (Math.random() * 0.001 - 0.0005),
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Format timer as minutes:seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const handleStartRide = () => {
    setStatus('in_progress');
    toast({
      title: "Ride Started",
      description: "You have started the ride to the destination.",
    });
  };

  const handleCompleteRide = () => {
    setStatus('completed');
    toast({
      title: "Ride Completed",
      description: "The ride has been completed successfully.",
    });
  };

  const handleRatePassenger = (rating: number) => {
    toast({
      title: "Passenger Rated",
      description: `You rated the passenger ${rating} stars.`,
    });
    
    // In a real app, this would submit the rating to a backend
    setTimeout(() => {
      window.location.href = '/driver';
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Current Ride</h1>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {status === 'heading_to_pickup' && 'Heading to Pickup'}
              {status === 'arrived_at_pickup' && 'At Pickup Location'}
              {status === 'in_progress' && 'Ride in Progress'}
              {status === 'completed' && 'Ride Completed'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="overflow-hidden">
                <div className="h-[400px]">
                  <Map 
                    pickupLocation={[5.5057, 5.9631]} 
                    dropoffLocation={[5.5157, 5.9731]}
                    driverLocation={driverLocation}
                  />
                </div>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  {status !== 'completed' ? (
                    <>
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
                            <p className="font-medium">12 Market Road, Warri</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-10 text-center flex flex-col items-center">
                            <div className="h-10 w-px bg-gray-300"></div>
                            <div className="h-4 w-4 rounded-full bg-gray-400 mt-1"></div>
                          </div>
                          <div className="flex-grow ml-2 p-3 bg-gray-50 rounded-md">
                            <p className="font-medium">24 Orogun Road, Warri</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="bg-gray-50 p-3 rounded-md text-center">
                          <div className="flex flex-col items-center">
                            <Clock className="h-5 w-5 text-gray-500 mb-1" />
                            <span className="text-sm text-gray-500">Time</span>
                            <span className="font-medium">15 min</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md text-center">
                          <div className="flex flex-col items-center">
                            <Navigation className="h-5 w-5 text-gray-500 mb-1" />
                            <span className="text-sm text-gray-500">Distance</span>
                            <span className="font-medium">3.2 km</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md text-center">
                          <div className="flex flex-col items-center">
                            <DollarSign className="h-5 w-5 text-gray-500 mb-1" />
                            <span className="text-sm text-gray-500">Fare</span>
                            <span className="font-medium">₦650</span>
                          </div>
                        </div>
                      </div>
                      
                      {status === 'arrived_at_pickup' ? (
                        <Button 
                          onClick={handleStartRide}
                          className="w-full bg-keke-primary hover:bg-keke-primary/90"
                        >
                          Start Ride
                        </Button>
                      ) : status === 'in_progress' ? (
                        <Button 
                          onClick={handleCompleteRide}
                          className="w-full bg-keke-primary hover:bg-keke-primary/90"
                        >
                          Complete Ride
                        </Button>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-lg font-medium">Navigate to pickup location</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-4">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold">Ride Completed!</h2>
                        <p className="text-gray-600 mt-2">Please rate your passenger</p>
                        
                        <div className="flex justify-center mt-4 space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRatePassenger(star)}
                              className="text-2xl text-gray-300 hover:text-yellow-400 focus:outline-none"
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-gray-500 text-sm">Pickup:</div>
                          <div className="col-span-2 font-medium">12 Market Road, Warri</div>
                          
                          <div className="text-gray-500 text-sm">Dropoff:</div>
                          <div className="col-span-2 font-medium">24 Orogun Road, Warri</div>
                          
                          <div className="text-gray-500 text-sm">Duration:</div>
                          <div className="col-span-2 font-medium">{formatTime(timer)}</div>
                          
                          <div className="text-gray-500 text-sm">Total Fare:</div>
                          <div className="col-span-2 font-medium">₦650</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Passenger Information</h3>
                  
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-lg">John Doe</h4>
                      <div className="flex items-center">
                        {'★★★★★'.split('').map((star, i) => (
                          <span key={i} className="text-keke-accent text-sm">
                            {star}
                          </span>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">4.9</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between gap-2">
                    <Button className="flex-1 bg-keke-primary hover:bg-keke-primary/90 gap-2">
                      <Phone size={16} />
                      Call Passenger
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <MessageSquare size={16} />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Ride Details</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Method</span>
                      <span className="font-medium">Cash</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ride Type</span>
                      <span className="font-medium">Standard</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Fare</span>
                      <span className="font-medium">₦650</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Your Earnings</span>
                      <span className="font-medium text-green-600">₦585</span>
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

export default DriverRides;
