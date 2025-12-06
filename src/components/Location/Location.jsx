import React, { useState, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import './Location.css';
import LocationMap from './LocationMap';
import useGoogleMaps from '../../hooks/useGoogleMaps';
import { restaurants, DEFAULT_CENTER } from '../../data/restaurantData';
import {
  calculateDistance,
  filterRestaurantsByDistance,
  formatDistance,
  saveToLocalStorage,
  getFromLocalStorage,
  generateId
} from '../../utils/locationUtils';

const LIBRARIES = ['places'];

const Location = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [displayLocation, setDisplayLocation] = useState('Select Location');
  const [deliveryRadius, setDeliveryRadius] = useState(5);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Load Google Maps
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });

  const { getCurrentLocation, reverseGeocode, geocodeAddress } = useGoogleMaps(apiKey);

  // Load saved data on mount
  useEffect(() => {
    const savedLoc = getFromLocalStorage('currentLocation');
    const savedAddr = getFromLocalStorage('savedAddresses') || [];
    const savedRadius = getFromLocalStorage('deliveryRadius') || 5;

    if (savedLoc) {
      setUserLocation(savedLoc);
      setDisplayLocation(savedLoc.city || savedLoc.address || 'Current Location');
    }
    setSavedAddresses(savedAddr);
    setDeliveryRadius(savedRadius);
  }, []);

  // Handle detect current location
  const handleDetectLocation = async () => {
    setIsDetecting(true);
    try {
      const coords = await getCurrentLocation();
      const addressData = await reverseGeocode(coords.lat, coords.lng);
      
      const locationData = {
        coordinates: coords,
        address: addressData.formattedAddress,
        city: extractCity(addressData.addressComponents),
        pincode: extractPincode(addressData.addressComponents)
      };

      setUserLocation(locationData);
      setDisplayLocation(locationData.city || 'Current Location');
      saveToLocalStorage('currentLocation', locationData);
    } catch (error) {
      alert('Unable to detect location. Please enter manually or check permissions.');
      console.error(error);
    } finally {
      setIsDetecting(false);
    }
  };

  // Handle address search
  const handleAddressSearch = async () => {
    if (!searchInput.trim()) return;

    try {
      const result = await geocodeAddress(searchInput);
      const locationData = {
        coordinates: { lat: result.lat, lng: result.lng },
        address: result.formattedAddress,
        city: extractCityFromAddress(result.formattedAddress),
        pincode: ''
      };

      setUserLocation(locationData);
      setDisplayLocation(locationData.city || locationData.address);
      saveToLocalStorage('currentLocation', locationData);
      setSearchInput('');
    } catch (error) {
      alert('Address not found. Please try again.');
      console.error(error);
    }
  };

  // Save current location as address
  const handleSaveAddress = () => {
    if (!userLocation) {
      alert('Please select a location first');
      return;
    }

    if (savedAddresses.length >= 5) {
      alert('Maximum 5 addresses allowed');
      return;
    }

    const newAddress = {
      id: generateId(),
      label: `Address ${savedAddresses.length + 1}`,
      ...userLocation,
      isPrimary: savedAddresses.length === 0
    };

    const updated = [...savedAddresses, newAddress];
    setSavedAddresses(updated);
    saveToLocalStorage('savedAddresses', updated);
  };

  // Delete saved address
  const handleDeleteAddress = (id) => {
    const updated = savedAddresses.filter(addr => addr.id !== id);
    setSavedAddresses(updated);
    saveToLocalStorage('savedAddresses', updated);
  };

  // Select saved address
  const handleSelectAddress = (address) => {
    setUserLocation(address);
    setDisplayLocation(address.city || address.address);
    saveToLocalStorage('currentLocation', address);
  };

  // Update delivery radius
  const handleRadiusChange = (e) => {
    const newRadius = parseFloat(e.target.value);
    setDeliveryRadius(newRadius);
    saveToLocalStorage('deliveryRadius', newRadius);
  };

  // Get nearby restaurants
  const nearbyRestaurants = userLocation
    ? filterRestaurantsByDistance(userLocation.coordinates, restaurants, deliveryRadius)
    : [];

  // Helper functions
  const extractCity = (components) => {
    const city = components?.find(c => c.types.includes('locality'));
    return city?.long_name || '';
  };

  const extractPincode = (components) => {
    const pincode = components?.find(c => c.types.includes('postal_code'));
    return pincode?.long_name || '';
  };

  const extractCityFromAddress = (address) => {
    const parts = address.split(',');
    return parts[parts.length - 3]?.trim() || '';
  };

  if (loadError) {
    return <div>Error loading maps. Please check your API key.</div>;
  }

  return (
    <>
      {/* Navbar Display */}
      <div className="location-container" onClick={() => setIsModalOpen(true)}>
        <span className="location-icon">📍</span>
        <div className="location-text">
          <span className="location-label">Deliver to</span>
          <span className="location-value">{displayLocation}</span>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="location-modal" onClick={() => setIsModalOpen(false)}>
          <div className="location-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="location-modal-header">
              <h2>🗺️ Select Delivery Location</h2>
              <button className="location-close-btn" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>

            {/* Detect Location Button */}
            <button 
              className="location-detect-btn" 
              onClick={handleDetectLocation}
              disabled={isDetecting}
            >
              {isDetecting ? '⏳ Detecting...' : '📍 Detect Current Location'}
            </button>

            {/* Address Search */}
            <div className="location-search">
              <input
                type="text"
                placeholder="🔍 Search address..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
              />
              <button onClick={handleAddressSearch}>Search</button>
            </div>

            {/* Map */}
            {isLoaded && userLocation && (
              <div className="map-container">
                <LocationMap
                  center={userLocation.coordinates}
                  restaurants={nearbyRestaurants}
                  deliveryRadius={deliveryRadius}
                />
              </div>
            )}

            {!isLoaded && (
              <div className="map-skeleton">
                <p>Loading map...</p>
              </div>
            )}

            {/* Distance Slider */}
            {userLocation && (
              <div className="distance-slider-container">
                <div className="slider-header">
                  <label>Delivery Radius</label>
                  <span className="radius-value">{deliveryRadius} km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={deliveryRadius}
                  onChange={handleRadiusChange}
                  className="distance-slider"
                />
                <div className="slider-labels">
                  <span>1 km</span>
                  <span>10 km</span>
                </div>
                <p className="nearby-count">
                  📍 {nearbyRestaurants.length} restaurant{nearbyRestaurants.length !== 1 ? 's' : ''} nearby
                </p>
              </div>
            )}

            {/* Saved Addresses */}
            {savedAddresses.length > 0 && (
              <div className="saved-addresses">
                <h3>Saved Addresses</h3>
                <div className="addresses-list">
                  {savedAddresses.map((addr) => (
                    <div 
                      key={addr.id} 
                      className={`address-card ${userLocation?.id === addr.id ? 'active' : ''}`}
                      onClick={() => handleSelectAddress(addr)}
                    >
                      <div className="address-info">
                        <span className="address-icon">
                          {addr.isPrimary ? '🏠' : '📍'}
                        </span>
                        <div className="address-details">
                          <strong>{addr.label}</strong>
                          <p>{addr.address}</p>
                        </div>
                      </div>
                      <button
                        className="delete-address-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAddress(addr.id);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Address Button */}
            {userLocation && savedAddresses.length < 5 && (
              <button className="save-address-btn" onClick={handleSaveAddress}>
                💾 Save This Address
              </button>
            )}

            {/* Confirm Button */}
            <button 
              className="location-save-btn" 
              onClick={() => setIsModalOpen(false)}
              disabled={!userLocation}
            >
              ✓ Confirm Location
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Location;
