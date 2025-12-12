import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchTerm }) => {
  const { food_list } = useContext(StoreContext);
  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Filter and Sort Logic
  let filteredFoods = food_list.filter((item) => {
    if (category !== "All" && category !== item.category) return false;
    
    // Search filter
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    if (filterBy === "vegetarian") return item.category === "Salad" || item.category === "Pure Veg";
    if (filterBy === "non-veg") return item.category !== "Salad" && item.category !== "Pure Veg";
    if (filterBy === "discount") return item.discount && item.discount > 0;
    
    return true;
  });

  // Sorting
  const sortedFoods = [...filteredFoods].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 4.5) - (a.rating || 4.5);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="food-display" id="food-display">
      {/* HEADER WITH FILTERS */}
      <div className="food-display-header">
        <div className="header-left">
          <h2 className="food-display-title">
            Top Dishes Near You
            <span className="food-count">({sortedFoods.length} items)</span>
          </h2>
        </div>

        <div className="header-right">
          {/* FILTER DROPDOWN */}
          <div className="filter-dropdown">
            <label>Filter:</label>
            <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
              <option value="all">All Items</option>
              <option value="vegetarian">🥗 Vegetarian</option>
              <option value="non-veg">🍗 Non-Veg</option>
              <option value="discount">🏷️ On Discount</option>
            </select>
          </div>

          {/* SORT DROPDOWN */}
          <div className="sort-dropdown">
            <label>Sort:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">⭐ Rating</option>
              <option value="name">A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* FOOD GRID */}
      <div className="food-display-list">
        {isLoading ? (
          // SKELETON LOADERS
          Array(8).fill(0).map((_, index) => (
            <div key={index} className="food-item-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-desc"></div>
                <div className="skeleton-price"></div>
              </div>
            </div>
          ))
        ) : sortedFoods.length > 0 ? (
          sortedFoods.map((item, index) => (
            <FoodItem
              key={item._id || item.id || index}
              id={item._id || item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.imageUrl || item.image}
              discount={item.discount || (Math.random() > 0.7 ? Math.floor(Math.random() * 30 + 10) : 0)}
              rating={item.rating}
            />
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🍽️</div>
            <h3>No dishes found</h3>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
