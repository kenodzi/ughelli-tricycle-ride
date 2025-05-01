
import React, { useEffect, useRef, useState } from 'react';

type MapProps = {
  pickupLocation?: [number, number];
  dropoffLocation?: [number, number];
  showDrivers?: boolean;
  onLocationSelect?: (coords: [number, number]) => void;
};

const Map: React.FC<MapProps> = ({ 
  pickupLocation, 
  dropoffLocation, 
  showDrivers = false,
  onLocationSelect 
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapApiKey, setMapApiKey] = useState<string>('');
  
  useEffect(() => {
    // In a production app, this would be handled by using API keys properly,
    // either through environment variables or a secure backend
    setMapApiKey('YOUR_MAPBOX_API_KEY');
  }, []);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {!mapApiKey ? (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-2">API Key Required</h3>
            <p className="text-gray-600 mb-4">
              To use the map functionality, you need to connect your project to Supabase and add a Mapbox API key.
              For development purposes, you can input a temporary Mapbox API key below:
            </p>
            <input
              type="password" 
              placeholder="Mapbox API Key"
              className="keke-input mb-4"
              onChange={(e) => setMapApiKey(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Get your API key at <a href="https://mapbox.com/" className="text-keke-primary">mapbox.com</a>
            </p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center p-4">
            {/* In a real implementation, we would load the actual Mapbox map here */}
            <p className="text-lg font-medium">Interactive Map</p>
            <p className="text-gray-600 text-sm mb-4">Using Mapbox for location tracking</p>
            
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4 animate-pulse-slow">
              Map Loading...
            </div>
            
            {showDrivers && (
              <div className="text-left bg-white p-3 rounded-lg shadow-md mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">3 drivers nearby</span>
                </div>
              </div>
            )}
            
            {pickupLocation && (
              <div className="text-left bg-white p-3 rounded-lg shadow-md mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Pickup: {pickupLocation.join(', ')}</span>
                </div>
              </div>
            )}
            
            {dropoffLocation && (
              <div className="text-left bg-white p-3 rounded-lg shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-sm">Dropoff: {dropoffLocation.join(', ')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
