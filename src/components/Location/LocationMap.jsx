import React from 'react';
import { GoogleMap, Marker, Circle, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';

const LocationMap = ({ 
  center, 
  restaurants = [], 
  deliveryRadius = 5,
  onMapClick 
}) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [map, setMap] = useState(null);

  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '16px'
  };

  const options = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
  };

  // User marker icon (blue)
  const userIcon = {
    path: window.google?.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillColor: '#4285F4',
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 3,
  };

  // Restaurant marker icon (red)
  const restaurantIcon = {
    path: window.google?.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: '#FF6347',
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 2,
  };

  // Delivery radius circle options
  const circleOptions = {
    strokeColor: '#FF6347',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF6347',
    fillOpacity: 0.15,
  };

  const onLoad = React.useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={options}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        {/* User Location Marker */}
        {center && (
          <Marker
            position={center}
            icon={userIcon}
            title="Your Location"
            zIndex={1000}
          />
        )}

        {/* Delivery Radius Circle */}
        {center && deliveryRadius && (
          <Circle
            center={center}
            radius={deliveryRadius * 1000} // Convert km to meters
            options={circleOptions}
          />
        )}

        {/* Restaurant Markers */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={restaurant.coordinates}
            icon={restaurantIcon}
            title={restaurant.name}
            onClick={() => setSelectedRestaurant(restaurant)}
          />
        ))}

        {/* Info Window for selected restaurant */}
        {selectedRestaurant && (
          <InfoWindow
            position={selectedRestaurant.coordinates}
            onCloseClick={() => setSelectedRestaurant(null)}
          >
            <div style={{ padding: '8px', maxWidth: '200px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#333' }}>
                {selectedRestaurant.name}
              </h3>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#666' }}>
                📍 {selectedRestaurant.address}
              </p>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#666' }}>
                🍽️ {selectedRestaurant.cuisine}
              </p>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#666' }}>
                ⭐ {selectedRestaurant.rating}
              </p>
              {selectedRestaurant.distance && (
                <p style={{ margin: '4px 0', fontSize: '13px', color: '#FF6347', fontWeight: '600' }}>
                  📏 {selectedRestaurant.distance.toFixed(1)} km away
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default LocationMap;
