import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <header className="hero-section">
      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-content">
          <div className="hero-badge">🍕 #1 Food Delivery</div>
          
          <h1 className="hero-title">
            Order Your
            <br />
            <span className="gradient-text">Favourite Food</span>
            <br />
            Here
          </h1>
          
          <p className="hero-description">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>

          {/* ANIMATED BUTTON */}
          <div className="hero-buttons">
            <a href="#explore-menu" className="btn-primary">
              <span className="btn-text">View Menu</span>
              <span className="btn-icon">🍽️</span>
            </a>
            <a href="#app-download" className="btn-secondary">
              <span className="btn-text">Download App</span>
              <span className="btn-icon">📱</span>
            </a>
          </div>

          {/* STATS */}
          <div className="hero-stats">
            <div className="stat-box">
              <h3>10K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-box">
              <h3>500+</h3>
              <p>Restaurants</p>
            </div>
            <div className="stat-box">
              <h3>30min</h3>
              <p>Fast Delivery</p>
            </div>
          </div>
        </div>

        {/* RIGHT - FOOD IMAGE */}
        <div className="hero-image">
          <div className="image-wrapper">
            <img src={assets.header_img} alt="Delicious Food" className="food-img" />
            
            {/* Floating Elements */}
            <div className="float-badge badge-1">
              <span className="badge-icon">⭐</span>
              <div className="badge-content">
                <strong>4.8</strong>
                <small>Rating</small>
              </div>
            </div>
            
            <div className="float-badge badge-2">
              <span className="badge-icon">🚀</span>
              <div className="badge-content">
                <strong>30min</strong>
                <small>Delivery</small>
              </div>
            </div>

            <div className="float-badge badge-3">
              <span className="badge-icon">💰</span>
              <div className="badge-content">
                <strong>50% OFF</strong>
                <small>First Order</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WAVE ANIMATION */}
      <div className="wave-container">
        <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="currentColor" 
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg className="wave wave-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="currentColor" 
            fillOpacity="0.2"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;
