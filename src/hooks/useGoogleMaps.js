import { useState, useEffect, useCallback } from 'react';

const useGoogleMaps = (apiKey) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!apiKey) {
      setLoadError(new Error('Google Maps API key is required'));
      return;
    }

    // Check if already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      setLoadError(new Error('Failed to load Google Maps'));
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, [apiKey]);

  // Geocode address to coordinates
  const geocodeAddress = useCallback(async (address) => {
    if (!window.google) return null;

    const geocoder = new window.google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng(),
            formattedAddress: results[0].formatted_address
          });
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });
  }, []);

  // Reverse geocode coordinates to address
  const reverseGeocode = useCallback(async (lat, lng) => {
    if (!window.google) return null;

    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          resolve({
            formattedAddress: results[0].formatted_address,
            addressComponents: results[0].address_components
          });
        } else {
          reject(new Error(`Reverse geocoding failed: ${status}`));
        }
      });
    });
  }, []);

  // Get current location using browser geolocation
  const getCurrentLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }, []);

  return {
    isLoaded,
    loadError,
    geocodeAddress,
    reverseGeocode,
    getCurrentLocation
  };
};

export default useGoogleMaps;
