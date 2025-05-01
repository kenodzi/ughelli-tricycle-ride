
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import Map from '@/components/Map';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, Navigation, DollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DriverHome = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [hasRideRequest, setHasRideRequest] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<[number, number]>([5.5157, 5.9731]);
  const [earnings, setEarnings] = useState({ today: 0, week: 3200, total: 15750 });
  const [requestDetails, setRequestDetails] = useState({
    pickupLocation: [5.5057, 5.9631] as [number, number],
    pickupAddress: '12 Market Road, Warri',
    dropoffLocation: [5.5257, 5.9831] as [number, number],
    dropoffAddress: '45 Effurun Road, Warri',
    estimatedFare: 650,
    distance: 3.2,
    estimatedTime: 15,
    passengerName: 'John D.',
    passengerRating: 4.7
  });
  const { toast } = useToast();

  // Simulate ride request after going online
  useEffect(() => {
    if (isOnline) {
      const timeout = setTimeout(() => {
        setHasRideRequest(true);
        toast({
          title: "New Ride Request",
          description: `Pickup at ${requestDetails.pickupAddress}`,
        });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isOnline, requestDetails.pickupAddress, toast]);

  const handleGoOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      toast({
        title: "You're Online!",
        description: "You are now receiving ride requests.",
      });
    } else {
      toast({
        title: "You're Offline",
        description: "You will not receive ride requests.",
        variant: "destructive"
      });
      setHasRideRequest(false);
    }
  };
  
  const handleAcceptRide = () => {
    toast({
      title: "Ride Accepted",
      description: "Navigate to pickup location",
    });
    window.location.href = '/driver/rides';
  };

  const handleDeclineRide = () => {
    setHasRideRequest(false);
    toast({
      title: "Ride Declined",
      description: "Waiting for new requests",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Driver Dashboard</h1>
            <div className="flex items-center gap-2">
              <span>{isOnline ? 'Online' : 'Offline'}</span>
              <Switch 
                checked={isOnline} 
                onCheckedChange={handleGoOnline} 
                className={isOnline ? 'bg-green-500' : ''}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="overflow-hidden">
                <div className="h-[400px]">
                  <Map 
                    pickupLocation={hasRideRequest ? requestDetails.pickupLocation : undefined}
                    dropoffLocation={hasRideRequest ? requestDetails.dropoffLocation : undefined}
                    driverLocation={currentLocation}
                  />
                </div>
              </Card>
              
              {hasRideRequest ? (
                <Card className="mt-6">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">New Ride Request</h2>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        ₦{requestDetails.estimatedFare}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <div className="flex items-center">
                        <div className="w-10 text-center">
                          <div className="h-4 w-4 rounded-full bg-keke-primary mx-auto"></div>
                        </div>
                        <div className="flex-grow ml-2 p-3 bg-gray-50 rounded-md">
                          <p className="font-medium">{requestDetails.pickupAddress}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 text-center flex flex-col items-center">
                          <div className="h-10 w-px bg-gray-300"></div>
                          <div className="h-4 w-4 rounded-full bg-gray-400 mt-1"></div>
                        </div>
                        <div className="flex-grow ml-2 p-3 bg-gray-50 rounded-md">
                          <p className="font-medium">{requestDetails.dropoffAddress}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="bg-gray-50 p-3 rounded-md text-center">
                        <div className="flex flex-col items-center">
                          <Clock className="h-5 w-5 text-gray-500 mb-1" />
                          <span className="text-sm text-gray-500">Time</span>
                          <span className="font-medium">{requestDetails.estimatedTime} min</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md text-center">
                        <div className="flex flex-col items-center">
                          <Navigation className="h-5 w-5 text-gray-500 mb-1" />
                          <span className="text-sm text-gray-500">Distance</span>
                          <span className="font-medium">{requestDetails.distance} km</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md text-center">
                        <div className="flex flex-col items-center">
                          <DollarSign className="h-5 w-5 text-gray-500 mb-1" />
                          <span className="text-sm text-gray-500">Fare</span>
                          <span className="font-medium">₦{requestDetails.estimatedFare}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between gap-2">
                      <Button 
                        onClick={handleDeclineRide}
                        variant="outline" 
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                      >
                        Decline
                      </Button>
                      <Button 
                        onClick={handleAcceptRide}
                        className="flex-1 bg-keke-primary hover:bg-keke-primary/90"
                      >
                        Accept
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : isOnline ? (
                <Card className="mt-6">
                  <CardContent className="pt-6 text-center py-12">
                    <div className="animate-pulse">
                      <h2 className="text-xl font-bold mb-2">Searching for ride requests...</h2>
                      <p className="text-gray-600">Stay online to receive ride requests</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mt-6">
                  <CardContent className="pt-6 text-center py-12">
                    <h2 className="text-xl font-bold mb-2">You're offline</h2>
                    <p className="text-gray-600 mb-4">Go online to start receiving ride requests</p>
                    <Button 
                      onClick={handleGoOnline}
                      className="bg-keke-primary hover:bg-keke-primary/90"
                    >
                      Go Online
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Your Earnings</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Today's Earnings</div>
                      <div className="text-2xl font-bold">₦{earnings.today.toLocaleString()}</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">This Week</div>
                      <div className="text-xl font-bold">₦{earnings.week.toLocaleString()}</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Total Earnings</div>
                      <div className="text-xl font-bold">₦{earnings.total.toLocaleString()}</div>
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      View Earnings History
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Vehicle Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Keke ID</span>
                      <span className="font-medium">WR-542</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Model</span>
                      <span className="font-medium">TVS King Deluxe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DriverHome;
