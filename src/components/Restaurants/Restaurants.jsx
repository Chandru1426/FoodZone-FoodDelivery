import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import './Restaurants.css';
import { restaurantData } from '../../assets/restaurantData';

const Restaurants = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="restaurants-container" id="restaurants">
      <h2>Top Restaurants Near You</h2>
      <div className="restaurants-grid">
        {loading 
          ? Array(6).fill(0).map((_, index) => (
              <div key={index} className="skeleton-card">
                <div className="skeleton-img"></div>
                <div className="skeleton-info">
                  <div className="skeleton-text skeleton-title"></div>
                  <div className="skeleton-text skeleton-subtitle"></div>
                  <div className="skeleton-text skeleton-details"></div>
                </div>
              </div>
            ))
          : restaurantData.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
        }
      </div>
    </div>
  );
};

export default Restaurants;
