
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Map from '@/components/Map';
import RideOptionCard from '@/components/RideOptionCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const rideOptions = [
  {
    id: 'standard',
    name: 'Standard',
    imageUrl: '/keke-standard.png',
    description: 'Regular keke, affordable ride',
    price: 500,
    eta: 3,
  },
  {
    id: 'premium',
    name: 'Premium',
    imageUrl: '/keke-premium.png',
    description: 'Comfortable keke, enhanced ride',
    price: 800,
    eta: 5,
  },
  {
    id: 'express',
    name: 'Express',
    imageUrl: '/keke-express.png',
    description: 'Priority ride, minimal stops',
    price: 1200,
    eta: 2,
  },
];

const BookRide = () => {
  const [activeTab, setActiveTab] = useState('location');
  const [selectedRideOption, setSelectedRideOption] = useState('standard');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupCoords, setPickupCoords] = useState<[number, number] | undefined>();
  const [dropoffCoords, setDropoffCoords] = useState<[number, number] | undefined>();

  const handleNextStep = () => {
    if (activeTab === 'location' && pickupLocation && dropoffLocation) {
      // In a real app, we would geocode the locations here
      // These are example coordinates in Warri
      setPickupCoords([5.7485, 5.7931]); // Example coordinates for Warri
      setDropoffCoords([5.7685, 5.8031]);
      setActiveTab('select');
    } else if (activeTab === 'select') {
      setActiveTab('confirm');
    }
  };

  const handleRideSelect = (id: string) => {
    setSelectedRideOption(id);
  };

  const handleConfirmRide = () => {
    // In a real app, this would send the booking to the backend
    console.log('Ride confirmed!', {
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      option: selectedRideOption,
    });
    
    // Navigate to ride tracking page
    window.location.href = '/ride-status';
  };
  
  const handleLocationSelect = (coords: [number, number]) => {
    // If we don't have pickup location yet, set it
    if (!pickupCoords) {
      setPickupCoords(coords);
      setPickupLocation(`Selected Location (${coords[0].toFixed(4)}, ${coords[1].toFixed(4)})`);
    } 
    // If we have pickup but no dropoff, set dropoff
    else if (!dropoffCoords) {
      setDropoffCoords(coords);
      setDropoffLocation(`Selected Location (${coords[0].toFixed(4)}, ${coords[1].toFixed(4)})`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Book a Ride</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab} 
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="location">
                    1. Location
                  </TabsTrigger>
                  <TabsTrigger value="select" disabled={!pickupLocation || !dropoffLocation}>
                    2. Select Ride
                  </TabsTrigger>
                  <TabsTrigger value="confirm" disabled={activeTab !== 'confirm'}>
                    3. Confirm
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="location" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="pickup" className="block text-sm font-medium mb-1">Pickup Location</label>
                          <Input 
                            id="pickup"
                            placeholder="Enter pickup address in Warri" 
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            className="keke-input"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="dropoff" className="block text-sm font-medium mb-1">Destination</label>
                          <Input 
                            id="dropoff"
                            placeholder="Enter destination address in Warri" 
                            value={dropoffLocation}
                            onChange={(e) => setDropoffLocation(e.target.value)}
                            className="keke-input"
                          />
                        </div>
                        
                        <Button 
                          onClick={handleNextStep}
                          className="w-full bg-keke-primary hover:bg-keke-primary/90"
                          disabled={!pickupLocation || !dropoffLocation}
                        >
                          Next: Select Ride
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="select" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-4">Choose Your Ride</h3>
                      
                      <div className="space-y-3">
                        {rideOptions.map((option) => (
                          <RideOptionCard
                            key={option.id}
                            {...option}
                            selected={selectedRideOption === option.id}
                            onSelect={handleRideSelect}
                          />
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          onClick={handleNextStep}
                          className="w-full bg-keke-primary hover:bg-keke-primary/90"
                        >
                          Next: Confirm Booking
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="confirm" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-4">Confirm Your Ride</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-gray-500 text-sm">Pickup:</div>
                            <div className="col-span-2 font-medium">{pickupLocation}</div>
                            
                            <div className="text-gray-500 text-sm">Dropoff:</div>
                            <div className="col-span-2 font-medium">{dropoffLocation}</div>
                            
                            <div className="text-gray-500 text-sm">Ride Type:</div>
                            <div className="col-span-2 font-medium">
                              {rideOptions.find(o => o.id === selectedRideOption)?.name}
                            </div>
                            
                            <div className="text-gray-500 text-sm">ETA:</div>
                            <div className="col-span-2 font-medium">
                              {rideOptions.find(o => o.id === selectedRideOption)?.eta} mins
                            </div>
                            
                            <div className="text-gray-500 text-sm">Price:</div>
                            <div className="col-span-2 font-medium">
                              ₦{rideOptions.find(o => o.id === selectedRideOption)?.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Payment Method</h4>
                          <div className="flex items-center space-x-3 p-3 border rounded-md">
                            <input 
                              type="radio" 
                              id="cash" 
                              name="payment" 
                              value="cash" 
                              defaultChecked 
                            />
                            <label htmlFor="cash">Cash</label>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleConfirmRide}
                          className="w-full bg-keke-primary hover:bg-keke-primary/90"
                        >
                          Confirm Booking
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="h-80 md:h-auto">
              <Card className="h-full">
                <CardContent className="p-1 h-full">
                  <Map 
                    pickupLocation={pickupCoords} 
                    dropoffLocation={dropoffCoords} 
                    showDrivers={true}
                    onLocationSelect={handleLocationSelect}
                  />
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

export default BookRide;
