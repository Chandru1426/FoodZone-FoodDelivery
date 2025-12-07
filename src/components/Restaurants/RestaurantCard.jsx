import React from 'react';
import './Restaurants.css';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
      <div className="res-img-container">
        <img src={restaurant.image} alt={restaurant.name} className="res-img" />
        <span className={`res-status ${restaurant.isOpen ? 'open' : 'closed'}`}>
          {restaurant.isOpen ? 'Open Now' : 'Closed'}
        </span>
      </div>
      
      <div className="res-info">
        <div className="res-name-rating">
          <h3>{restaurant.name}</h3>
          <div className="res-rating">
            <span>⭐</span> {restaurant.rating}
          </div>
        </div>
        
        <p className="res-cuisine">{restaurant.cuisine}</p>
        
        <div className="res-details">
          <span className="res-location">📍 {restaurant.location}</span>
          <span className="res-time">⏱ {restaurant.deliveryTime}</span>
        </div>
        
        <button className="view-menu-btn">View Menu</button>
      </div>
    </div>
  );
};

export default RestaurantCard;
