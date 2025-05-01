
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

// Mock ride data
const rides = [
  {
    id: 'ride-1',
    date: 'May 1, 2025',
    time: '10:30 AM',
    pickup: '12 Market Road, Ughelli',
    dropoff: '24 Orogun Road, Ughelli',
    amount: 500,
    status: 'completed',
    driver: 'Koffi Adebayo',
  },
  {
    id: 'ride-2',
    date: 'April 28, 2025',
    time: '3:15 PM',
    pickup: 'Ughelli City Mall',
    dropoff: 'Ughelli General Hospital',
    amount: 800,
    status: 'completed',
    driver: 'Emmanuel Okoro',
  },
  {
    id: 'ride-3',
    date: 'April 25, 2025',
    time: '9:00 AM',
    pickup: 'Ughelli Bus Station',
    dropoff: 'Central Market',
    amount: 450,
    status: 'completed',
    driver: 'Blessing Okafor',
  },
];

const MyRides = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Rides</h1>
            <Link to="/book">
              <Button className="bg-keke-primary hover:bg-keke-primary/90">
                Book a New Ride
              </Button>
            </Link>
          </div>
          
          {rides.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <span className="text-4xl">🚫</span>
              </div>
              <h3 className="font-medium text-xl mb-2">No rides yet</h3>
              <p className="text-gray-500 mb-6">You haven't taken any rides with us yet</p>
              <Link to="/book">
                <Button className="bg-keke-primary hover:bg-keke-primary/90">
                  Book Your First Ride
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {rides.map((ride) => (
                <Card key={ride.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-500">{ride.date}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{ride.time}</span>
                        </div>
                        <div>
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {ride.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3 mb-2">
                        <div className="flex items-start">
                          <div className="mt-1 mr-2">
                            <div className="h-3 w-3 rounded-full bg-keke-primary"></div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Pickup</p>
                            <p className="font-medium">{ride.pickup}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mt-1 mr-2">
                            <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Dropoff</p>
                            <p className="font-medium">{ride.dropoff}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-bold">₦{ride.amount}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Driver</p>
                        <p className="font-medium">{ride.driver}</p>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyRides;
