import italian_pizza from './italian_pizza.png';
import sushi_platter from './sushi_platter.png';
import cheeseburger_meal from './cheeseburger_meal.png';
import tacos_plate from './tacos_plate.png';
import indian_curry from './indian_curry.png';
import asian_noodles from './asian_noodles.png';

export const restaurantData = [
  {
    id: 1,
    name: "La Piazza Reviews",
    image: italian_pizza, 
    rating: 4.5,
    cuisine: "Italian, Pizza, Pasta",
    location: "Downtown, Main St",
    deliveryTime: "30-40 min",
    isOpen: true
  },
  {
    id: 2,
    name: "Sushi World",
    image: sushi_platter,
    rating: 4.8,
    cuisine: "Japanese, Sushi",
    location: "West End, Oak Ave",
    deliveryTime: "25-35 min",
    isOpen: true
  },
  {
    id: 3,
    name: "Burger King",
    image: cheeseburger_meal,
    rating: 4.2,
    cuisine: "American, Fast Food",
    location: "North Mall",
    deliveryTime: "20-30 min",
    isOpen: true
  },
  {
    id: 4,
    name: "Taco Bell",
    image: tacos_plate,
    rating: 4.0,
    cuisine: "Mexican, Tacos",
    location: "South St",
    deliveryTime: "35-45 min",
    isOpen: false
  },
  {
    id: 5,
    name: "Curry House",
    image: indian_curry, 
    rating: 4.7,
    cuisine: "Indian, Curry",
    location: "East Side",
    deliveryTime: "40-50 min",
    isOpen: true
  },
  {
    id: 6,
    name: "Dragon Wok",
    image: asian_noodles,
    rating: 4.3,
    cuisine: "Chinese, Asian",
    location: "Chinatown",
    deliveryTime: "30-45 min",
    isOpen: true
  }
];
