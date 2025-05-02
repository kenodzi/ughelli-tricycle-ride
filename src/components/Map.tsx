
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';

type MapProps = {
  pickupLocation?: [number, number];
  dropoffLocation?: [number, number];
  showDrivers?: boolean;
  onLocationSelect?: (coords: [number, number]) => void;
  driverLocation?: [number, number];
  useRealTimeTracking?: boolean;
};

// Default map center coordinates for Warri
const DEFAULT_CENTER = { lat: 5.51, lng: 5.75 };

// Styling for the Google Map container
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

// Map options for styling and controls
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
};

const Map: React.FC<MapProps> = ({
  pickupLocation,
  dropoffLocation,
  showDrivers = false,
  onLocationSelect,
  driverLocation,
  useRealTimeTracking = false,
}) => {
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string>('');
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [nearbyDrivers, setNearbyDrivers] = useState<Array<[number, number]>>([]);

  // Load the Google Maps JS API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ['places']
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Handle map click events
  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (onLocationSelect && event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      onLocationSelect([lng, lat]);
    }
  }, [onLocationSelect]);

  // Simulate nearby drivers when showDrivers is true
  useEffect(() => {
    if (showDrivers) {
      // Generate 3 random nearby driver positions
      const randomDrivers = [
        [center.lng + 0.01, center.lat - 0.005],
        [center.lng - 0.008, center.lat + 0.003],
        [center.lng - 0.002, center.lat - 0.01],
      ];
      setNearbyDrivers(randomDrivers);
    } else {
      setNearbyDrivers([]);
    }
  }, [showDrivers, center]);

  // Update map center and boundaries when locations change
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    // If there's a pickup location but no dropoff, center on pickup
    if (pickupLocation && !dropoffLocation) {
      setCenter({ lat: pickupLocation[1], lng: pickupLocation[0] });
      mapRef.current.setZoom(15);
    }
    // If there's both pickup and dropoff, fit bounds to include both
    else if (pickupLocation && dropoffLocation) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend({ lat: pickupLocation[1], lng: pickupLocation[0] });
      bounds.extend({ lat: dropoffLocation[1], lng: dropoffLocation[0] });
      
      // Include driver location in bounds if available
      if (driverLocation) {
        bounds.extend({ lat: driverLocation[1], lng: driverLocation[0] });
      }
      
      mapRef.current.fitBounds(bounds, { padding: 100 });
    }
  }, [isLoaded, pickupLocation, dropoffLocation, driverLocation]);

  // Focus on driver for real-time tracking
  useEffect(() => {
    if (isLoaded && mapRef.current && driverLocation && useRealTimeTracking) {
      setCenter({ lat: driverLocation[1], lng: driverLocation[0] });
      mapRef.current.setZoom(15);
    }
  }, [isLoaded, driverLocation, useRealTimeTracking]);

  // Create route path for the driver
  const getRoutePath = () => {
    const path: google.maps.LatLngLiteral[] = [];
    
    if (driverLocation) {
      path.push({ lat: driverLocation[1], lng: driverLocation[0] });
    }
    
    if (pickupLocation && (!driverLocation || 
        driverLocation[0] !== pickupLocation[0] || 
        driverLocation[1] !== pickupLocation[1])) {
      path.push({ lat: pickupLocation[1], lng: pickupLocation[0] });
    }
    
    if (dropoffLocation) {
      path.push({ lat: dropoffLocation[1], lng: dropoffLocation[0] });
    }
    
    return path;
  };

  // If the API isn't loaded yet or there was an error loading it
  if (loadError) {
    return <div className="p-4">Error loading maps</div>;
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-keke-primary"></div>
      </div>
    );
  }

  // If API key is not provided, show input form
  if (!googleMapsApiKey) {
    return (
      <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h3 className="text-lg font-medium mb-2">API Key Required</h3>
          <p className="text-gray-600 mb-4">
            To use the map functionality, please input your Google Maps API key below:
          </p>
          <input
            type="password" 
            placeholder="Google Maps API Key"
            className="keke-input mb-4 w-full p-2 border rounded"
            onChange={(e) => setGoogleMapsApiKey(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Get your API key at <a href="https://console.cloud.google.com/" className="text-keke-primary">Google Cloud Console</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={mapOptions}
        onClick={handleMapClick}
        onLoad={onMapLoad}
      >
        {/* Pickup Marker */}
        {pickupLocation && (
          <Marker
            position={{ lat: pickupLocation[1], lng: pickupLocation[0] }}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="blue" stroke="white" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              `),
              scaledSize: new google.maps.Size(20, 20),
              anchor: new google.maps.Point(10, 10),
            }}
          />
        )}

        {/* Dropoff Marker */}
        {dropoffLocation && (
          <Marker
            position={{ lat: dropoffLocation[1], lng: dropoffLocation[0] }}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="red" stroke="white" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              `),
              scaledSize: new google.maps.Size(20, 20),
              anchor: new google.maps.Point(10, 10),
            }}
          />
        )}

        {/* Driver Marker */}
        {driverLocation && (
          <Marker
            position={{ lat: driverLocation[1], lng: driverLocation[0] }}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green" stroke="white" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 7l-1.5 5 3 0 -1.5 5" stroke="white" fill="none" />
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32),
              anchor: new google.maps.Point(16, 16),
            }}
          />
        )}

        {/* Route Line */}
        {(pickupLocation || dropoffLocation) && (
          <Polyline
            path={getRoutePath()}
            options={{
              strokeColor: '#3887be',
              strokeOpacity: 0.75,
              strokeWeight: 5,
            }}
          />
        )}

        {/* Nearby Drivers */}
        {showDrivers && nearbyDrivers.map((pos, index) => (
          <Marker
            key={`nearby-driver-${index}`}
            position={{ lat: pos[1], lng: pos[0] }}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="yellow" stroke="#888" stroke-width="1">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              `),
              scaledSize: new google.maps.Size(16, 16),
              anchor: new google.maps.Point(8, 8),
            }}
          />
        ))}

        {/* Current location button */}
        <div className="absolute top-2 right-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white shadow-md"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };
                  if (mapRef.current) {
                    mapRef.current.setCenter(currentLocation);
                    mapRef.current.setZoom(15);
                  }
                  if (onLocationSelect) {
                    onLocationSelect([currentLocation.lng, currentLocation.lat]);
                  }
                });
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Button>
        </div>
      </GoogleMap>
    </div>
  );
};

export default Map;
