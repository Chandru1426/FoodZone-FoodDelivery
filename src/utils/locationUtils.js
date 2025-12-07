// Haversine formula to calculate distance between two coordinates
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance; // Distance in kilometers
};

const toRad = (value) => {
  return (value * Math.PI) / 180;
};

// Check if location is within delivery radius
export const isWithinDeliveryRadius = (userCoords, restaurantCoords, radius) => {
  const distance = calculateDistance(
    userCoords.lat,
    userCoords.lng,
    restaurantCoords.lat,
    restaurantCoords.lng
  );
  return distance <= radius;
};

// Filter restaurants by distance
export const filterRestaurantsByDistance = (userCoords, restaurants, maxDistance) => {
  if (!userCoords) return restaurants;
  
  return restaurants
    .map(restaurant => ({
      ...restaurant,
      distance: calculateDistance(
        userCoords.lat,
        userCoords.lng,
        restaurant.coordinates.lat,
        restaurant.coordinates.lng
      )
    }))
    .filter(restaurant => restaurant.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
};

// Format distance for display
export const formatDistance = (distanceInKm) => {
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m`;
  }
  return `${distanceInKm.toFixed(1)} km`;
};

// LocalStorage helpers
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Generate unique ID
export const generateId = () => {
  return `addr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
