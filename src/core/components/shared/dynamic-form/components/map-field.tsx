import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { FieldWrapper } from './field-wrapper';
// MapView integration is project-specific; keep it disabled for now to avoid missing import.
// import { MapView } from '@/components/Map';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { MapPin, Navigation, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Props for the MapField component.
 */
interface MapFieldProps {
  /**
   * The configuration for the map field.
   */
  config: IFieldConfig;
}

/**
 * A robust map field component that allows users to select a location via Google Maps.
 * Features:
 * - Interactive map with marker
 * - Search places (Autocomplete)
 * - Geolocation (Current Location)
 * - Zoom controls (via map UI)
 * - Custom markers
 * 
 * @param {MapFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered map field.
 */
export const MapField: React.FC<MapFieldProps> = ({ config }) => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const { name, label, description, required, componentProps } = config;
  
  const value = watch(name);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Default center (San Francisco)
  const defaultCenter = { lat: 37.7749, lng: -122.4194 };
  const center = value ? { lat: value.lat, lng: value.lng } : defaultCenter;

  // Initialize marker when map is ready
  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;

    // Add click listener to update location
    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        updateLocation(lat, lng);
      }
    });

    // Initialize marker if value exists
    if (value) {
      updateMarker(value.lat, value.lng);
    }
  };

  // Update form value and marker position
  const updateLocation = (lat: number, lng: number) => {
    setValue(name, { lat, lng }, { shouldValidate: true, shouldDirty: true });
    updateMarker(lat, lng);
  };

  // Update marker on the map
  const updateMarker = (lat: number, lng: number) => {
    if (!mapRef.current) return;

    const position = { lat, lng };

    if (markerRef.current) {
      markerRef.current.position = position;
    } else {
      // Create new marker
      const pinElement = document.createElement('div');
      pinElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary fill-primary/20"><path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
      
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position: position,
        content: pinElement,
        title: 'Selected Location',
      });
    }

    mapRef.current.panTo(position);
  };

  // Handle "My Location" button
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateLocation(latitude, longitude);
        mapRef.current?.setZoom(15);
        setIsLocating(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to retrieve your location');
        setIsLocating(false);
      }
    );
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery || !mapRef.current) return;

    setIsSearching(true);
    const geocoder = new google.maps.Geocoder();
    
    try {
      const result = await geocoder.geocode({ address: searchQuery });
      if (result.results[0]) {
        const location = result.results[0].geometry.location;
        updateLocation(location.lat(), location.lng());
        mapRef.current.setZoom(15);
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Error searching for location');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <FieldWrapper
      label={label}
      id={name}
      error={errors[name]?.message as string}
      description={description}
      required={required}
      className={config.className}
    >
      <div className="space-y-2">
        {/* Search Bar & Tools */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
              className="pl-9"
            />
          </div>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleGeolocation}
            disabled={isLocating}
            title="Use my current location"
          >
            {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
          </Button>
        </div>

        {/* Map Container */}
        <div className="relative border rounded-md overflow-hidden h-[400px]">
          <MapView
            className="w-full h-full"
            initialCenter={center}
            initialZoom={12}
            onMapReady={handleMapReady}
          />
          
          {/* Coordinates Display (Optional Overlay) */}
          {value && (
            <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur px-2 py-1 rounded text-xs font-mono border shadow-sm">
              {value.lat.toFixed(6)}, {value.lng.toFixed(6)}
            </div>
          )}
        </div>
      </div>
    </FieldWrapper>
  );
};
