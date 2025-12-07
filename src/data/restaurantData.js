// Sample restaurant locations for demonstration
// In production, this would come from your backend/database

export const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    coordinates: { lat: 28.6139, lng: 77.2090 },
    address: "Connaught Place, New Delhi",
    deliveryRadius: 5,
    cuisine: "Italian",
    rating: 4.5
  },
  {
    id: 2,
    name: "Burger Barn",
    coordinates: { lat: 28.6289, lng: 77.2065 },
    address: "Karol Bagh, New Delhi",
    deliveryRadius: 3,
    cuisine: "American",
    rating: 4.2
  },
  {
    id: 3,
    name: "Sushi Station",
    coordinates: { lat: 28.5355, lng: 77.3910 },
    address: "Noida Sector 18",
    deliveryRadius: 4,
    cuisine: "Japanese",
    rating: 4.7
  },
  {
    id: 4,
    name: "Curry House",
    coordinates: { lat: 28.6692, lng: 77.4538 },
    address: "Ghaziabad",
    deliveryRadius: 6,
    cuisine: "Indian",
    rating: 4.3
  },
  {
    id: 5,
    name: "Taco Town",
    coordinates: { lat: 28.4595, lng: 77.0266 },
    address: "Gurugram Cyber City",
    deliveryRadius: 5,
    cuisine: "Mexican",
    rating: 4.4
  },
  {
    id: 6,
    name: "Noodle Nest",
    coordinates: { lat: 28.7041, lng: 77.1025 },
    address: "Rohini, Delhi",
    deliveryRadius: 4,
    cuisine: "Chinese",
    rating: 4.1
  },
  {
    id: 7,
    name: "Salad Stop",
    coordinates: { lat: 28.5494, lng: 77.2501 },
    address: "South Delhi, Saket",
    deliveryRadius: 3,
    cuisine: "Healthy",
    rating: 4.6
  },
  {
    id: 8,
    name: "Biryani Bliss",
    coordinates: { lat: 28.6448, lng: 77.2167 },
    address: "Chandni Chowk, Old Delhi",
    deliveryRadius: 5,
    cuisine: "Indian",
    rating: 4.8
  }
];

// Default center (Delhi, India) - Change this to your city
export const DEFAULT_CENTER = {
  lat: 28.6139,
  lng: 77.2090
};

// Map configuration
export const MAP_CONFIG = {
  zoom: 12,
  minZoom: 10,
  maxZoom: 18,
  styles: [
    // Optional: Add custom map styles here
  ]
};
