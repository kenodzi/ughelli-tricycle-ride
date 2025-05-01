
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';

type MapProps = {
  pickupLocation?: [number, number];
  dropoffLocation?: [number, number];
  showDrivers?: boolean;
  onLocationSelect?: (coords: [number, number]) => void;
  driverLocation?: [number, number];
};

const Map: React.FC<MapProps> = ({ 
  pickupLocation, 
  dropoffLocation, 
  showDrivers = false,
  onLocationSelect,
  driverLocation
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapApiKey, setMapApiKey] = useState<string>('');
  const [markers, setMarkers] = useState<{ pickup?: mapboxgl.Marker, dropoff?: mapboxgl.Marker, driver?: mapboxgl.Marker }>({});
  
  // Initialize map when API key is available
  useEffect(() => {
    if (!mapApiKey || !mapContainerRef.current || map.current) return;
    
    try {
      mapboxgl.accessToken = mapApiKey;
      
      // Create new map instance
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [5.75, 5.51], // Warri, Nigeria coordinates
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Enable location finding
      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }));

      // Handle clicks on map if onLocationSelect is provided
      if (onLocationSelect) {
        map.current.on('click', (e) => {
          onLocationSelect([e.lngLat.lng, e.lngLat.lat]);
        });
      }

      // Clean up on unmount
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error("Error initializing Mapbox:", error);
    }
  }, [mapApiKey, onLocationSelect]);

  // Update markers when locations change
  useEffect(() => {
    if (!map.current) return;

    // Handle pickup location
    if (pickupLocation) {
      if (markers.pickup) {
        markers.pickup.setLngLat(pickupLocation);
      } else {
        const pickupEl = document.createElement('div');
        pickupEl.className = 'pickup-marker';
        pickupEl.innerHTML = '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>';
        
        const newMarker = new mapboxgl.Marker(pickupEl)
          .setLngLat(pickupLocation)
          .addTo(map.current);
        
        setMarkers(prev => ({ ...prev, pickup: newMarker }));
      }

      // Center map on pickup location if no dropoff
      if (!dropoffLocation) {
        map.current.flyTo({ center: pickupLocation, zoom: 14 });
      }
    }

    // Handle dropoff location
    if (dropoffLocation) {
      if (markers.dropoff) {
        markers.dropoff.setLngLat(dropoffLocation);
      } else {
        const dropoffEl = document.createElement('div');
        dropoffEl.className = 'dropoff-marker';
        dropoffEl.innerHTML = '<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>';
        
        const newMarker = new mapboxgl.Marker(dropoffEl)
          .setLngLat(dropoffLocation)
          .addTo(map.current);
        
        setMarkers(prev => ({ ...prev, dropoff: newMarker }));
      }
    }

    // If both pickup and dropoff exist, fit bounds to include both
    if (pickupLocation && dropoffLocation) {
      const bounds = new mapboxgl.LngLatBounds()
        .extend(pickupLocation)
        .extend(dropoffLocation);
      
      map.current.fitBounds(bounds, { padding: 100 });
    }
  }, [pickupLocation, dropoffLocation]);

  // Update driver marker
  useEffect(() => {
    if (!map.current || !driverLocation) return;

    if (markers.driver) {
      markers.driver.setLngLat(driverLocation);
    } else {
      const driverEl = document.createElement('div');
      driverEl.className = 'driver-marker';
      driverEl.innerHTML = '<div class="w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">' +
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div>';
      
      const newMarker = new mapboxgl.Marker(driverEl)
        .setLngLat(driverLocation)
        .addTo(map.current);
      
      setMarkers(prev => ({ ...prev, driver: newMarker }));
    }
  }, [driverLocation]);

  // Show nearby drivers
  useEffect(() => {
    if (!map.current || !showDrivers) return;

    // This would normally fetch nearby drivers from an API
    // For now, we'll simulate 3 drivers nearby the center of the map
    if (map.current && showDrivers) {
      const center = map.current.getCenter();
      
      // Generate 3 nearby points
      const nearbyDrivers = [
        [center.lng + 0.01, center.lat - 0.005],
        [center.lng - 0.008, center.lat + 0.003],
        [center.lng - 0.002, center.lat - 0.01]
      ];
      
      // Add markers for each nearby driver
      nearbyDrivers.forEach((driverPos) => {
        const el = document.createElement('div');
        el.className = 'nearby-driver-marker';
        el.innerHTML = '<div class="w-3 h-3 bg-yellow-500 rounded-full border border-white shadow-sm"></div>';
        
        new mapboxgl.Marker(el)
          .setLngLat(driverPos as [number, number])
          .addTo(map.current!);
      });
    }
  }, [showDrivers, map.current]);

  // Cleanup markers on unmount
  useEffect(() => {
    return () => {
      Object.values(markers).forEach(marker => marker?.remove());
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {!mapApiKey ? (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-2">API Key Required</h3>
            <p className="text-gray-600 mb-4">
              To use the map functionality, please input your Mapbox API key below:
            </p>
            <input
              type="password" 
              placeholder="Mapbox API Key"
              className="keke-input mb-4 w-full"
              onChange={(e) => setMapApiKey(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Get your API key at <a href="https://mapbox.com/" className="text-keke-primary">mapbox.com</a>
            </p>
          </div>
        </div>
      ) : (
        <div ref={mapContainerRef} className="absolute inset-0" />
      )}
    </div>
  );
};

export default Map;
